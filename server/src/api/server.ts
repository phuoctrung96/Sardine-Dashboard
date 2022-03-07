import config from "config";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";
import path from "path";
import pinoHttp from "pino-http";
import * as Sentry from "@sentry/node";
import helmet from "helmet";
import router from "./router";
import { loadSecrets } from "../commons/secrets";
import { logger } from "../commons/logger";
import { db } from "../commons/db";
import { mw } from "../commons/middleware";
import { authService } from "../commons/AuthService";
import { ruleService } from "../commons/RuleService";
import { UnleashService } from "../commons/UnleashService";
import { captureException } from "../utils/error-utils";

const env = process.env.SARDINE_ENV;
Sentry.init({
  environment: env,
  serverName: `dashboard-${env}`,
  dsn: "https://5d8305f9430443c9844cc92d08b2e3f8@o438986.ingest.sentry.io/5709351",
});

process.on("unhandledRejection", async (reason, promise) => {
  logger.error({ promise, reason }, "unhandled rejection");
  captureException(reason);
  await db.logs.logUnhandledRejectionError(reason, promise);
});

process.on("uncaughtException", async (err) => {
  logger.error(err, "uncaught exception");
  captureException(err);
  await db.logs.logUncaughtExceptionError(err.message, err.stack);
});

logger.info(`NODE_ENV is set to ${process.env.NODE_ENV}`);
logger.info(`SARDINE_ENV is set to ${process.env.SARDINE_ENV}`);

const startHttpServer = async () => {
  await loadSecrets();
  const app = express();
  app.use(pinoHttp());
  app.use(Sentry.Handlers.requestHandler());
  app.use(mw.assignId);
  app.enable("trust proxy");
  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'", "img-src * 'self' data: https:", "https://*.sardine.ai"],
        // react does inline styling, couldn't figure out how to disable
        styleSrc: [
          "'unsafe-inline'",
          "'self'",
          "img-src * 'self' data: https:",
          "https://*.sardine.ai",
          "https://tagmanager.google.com",
          "https://fonts.googleapis.com",
          "https://unpkg.com",
        ],
        fontSrc: ["'self'", "img-src * 'self' data: https:", "https://fonts.gstatic.com"],
        // unsafe-inline is needed for google tag manager https://developers.google.com/tag-manager/web/csp
        // library we use elgorditosalsero/react-gtm-hook doesn't give flexiblity
        scriptSrc: [
          "'unsafe-inline'",
          "'self'",
          "img-src * 'self' data: https:",
          "https://*.sardine.ai",
          "https://www.googletagmanager.com",
          "https://apis.google.com",
        ],
        connectSrc: ["'self'", "https://*.sardine.ai", "https://o438986.ingest.sentry.io", "https://*.googleapis.com"],
        imgSrc: [
          "'self'",
          "img-src * 'self' data: https:",
          "https://*.sardine.ai",
          "https://www.googletagmanager.com",
          "https://*.openstreetmap.org",
          "https://unpkg.com",
          "https://storage.googleapis.com",
        ],
        frameSrc: [
          "'self'",
          "img-src * 'self' data: https:",
          "https://dev.metabase.sardine.biz",
          "https://metabase.sardine.biz",
          "https://indigo-computer-272415.firebaseapp.com",
          "https://prod-sardine-ai.firebaseapp.com",
        ],
        frameAncestors: "*.sardine.ai *.relayfi.com http://localhost:5667 https://localhost:5667",
      },
    })
  );
  app.use(mw.jsonBodyParser);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(
    bodyParser.json({
      type: "*/*",
    })
  );
  app.use(cookieParser());

  app.use(mw.attachCurrentUserToRequest(db));
  const unleashSevice = new UnleashService(String(process.env.UNLEASH_SECRET_KEY));
  app.use("/api", router(authService, ruleService, unleashSevice));
  app.use(express.static(path.join(__dirname, "..", "..", "..", "..", "..", "frontend", "build")));
  app.get("/*", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "..", "..", "..", "..", "frontend", "build", "index.html"));
  });
  app.use(mw.expressErrorHandler("SERVER"));
  app.use(
    Sentry.Handlers.errorHandler({
      shouldHandleError() {
        return true;
      },
    })
  );

  const port = process.env.PORT || config.get("SERVER_PORT");
  const server = http.createServer(app).listen(port, async () => {
    await loadSecrets();
    logger.info(`server listening on port ${port}`);
  });

  return server;
};

startHttpServer();
