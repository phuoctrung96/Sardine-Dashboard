import express, { Response } from "express";
import { query, body } from "express-validator";
import { v4 as uuidV4 } from "uuid";
import { Org } from "@prisma/client";
import { CreateWebhookRequestBody, webhookUrls, WEBHOOK_TYPE } from "sardine-dashboard-typescript-definitions";
import { mw } from "../../commons/middleware";
import { db } from "../../commons/db";
import { RequestWithCurrentUser } from "../request-interface";
import { captureException } from "../../utils/error-utils";
import { listWebhooks } from "../../repository/webhook-repository";
import { listOrgs } from "../../repository/org-repository";

const { createWebhookRoute, updateWebhookRoute, deleteWebhookRoute, getWebhookRoute } = webhookUrls.routes;

const router = express.Router();

const webhooksRouter = () => {
  router[getWebhookRoute.httpMethod]("", [], mw.requireSuperAdmin, async (req: RequestWithCurrentUser, res: Response) => {
    const webhooks = await listWebhooks();
    const clientIds = webhooks.map((webhook) => webhook.clientId);

    // To avoid N+1 problem, use "in" query: https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance#solving-n1-with-include
    const orgs = await listOrgs({ clientIds });
    const clientIdOrgs: { [clientId: string]: Org } = {};
    orgs.forEach((org) => {
      clientIdOrgs[org.clientId] = org;
    });

    const result = webhooks.map((w) => ({
      id: Number(w.id),
      client_id: w.clientId,
      type: w.type,
      url: w.url,
      secret: w.secret,
      name: clientIdOrgs[w.clientId].name,
    }));
    return res.json({ result });
  });

  router[createWebhookRoute.httpMethod](
    "",
    [body("url").exists(), body("organisation").exists(), body("type").exists()],
    mw.validateRequest,
    mw.requireSuperAdmin,
    async (req: RequestWithCurrentUser<CreateWebhookRequestBody>, res: Response) => {
      try {
        const { url, organisation, type } = req.body;

        const clientId = await db.superadmin.getClientId(organisation.toString());

        const client = await db.webhooks.getSecretForClient(clientId);
        const secret: string = client?.secret || uuidV4();

        const result = await db.webhooks.createWebhook(clientId, url, secret, WEBHOOK_TYPE[type]);
        return res.status(200).json(result);
      } catch (e) {
        captureException(e);
        return res.status(500).json({ error: "internal error" });
      }
    }
  );

  router[updateWebhookRoute.httpMethod](
    "",
    [query("id").exists(), body(["url", "organisation"]).exists(), body("type").exists()],
    mw.validateRequest,
    mw.requireSuperAdmin,
    async (req: RequestWithCurrentUser<CreateWebhookRequestBody, { id: string }>, res: Response) => {
      const { id } = req.query;
      const { url, organisation, type } = req.body as CreateWebhookRequestBody;

      const clientId = await db.superadmin.getClientId(organisation.toString());

      if (!id) {
        return res.status(400).json({ error: `Please provide webhook id` });
      }
      const result = await db.webhooks.updateWebhook(id!.toString(), clientId, url, WEBHOOK_TYPE[type]);
      return res.status(200).json(result);
    }
  );

  router[deleteWebhookRoute.httpMethod](
    "",
    [query("id").exists()],
    mw.validateRequest,
    mw.requireSuperAdmin,
    async (req: RequestWithCurrentUser<{}, { id: string }>, res: Response) => {
      const { id } = req.query;
      try {
        if (!id) {
          return res.status(400).json({ error: `Please provide webhook id` });
        }
        const result = await db.webhooks.deleteWebhook(id);
        return res.status(200).json(result);
      } catch (e) {
        captureException(e);
        return res.status(500).json({ error: "internal error" });
      }
    }
  );

  return router;
};

export default webhooksRouter;
