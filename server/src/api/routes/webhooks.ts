import express, { Response } from "express";
import { query, body } from "express-validator";
import { v4 as uuidV4 } from "uuid";
import { Org } from "@prisma/client";
import { CreateWebhookRequestBody, webhookUrls } from "sardine-dashboard-typescript-definitions";
import { mw } from "../../commons/middleware";
import { db } from "../../commons/db";
import { RequestWithUser } from "../request-interface";
import { listWebhooks } from "../../repository/webhookRepository";
import { listOrgs } from "../../repository/orgRepository";

const { createWebhookRoute, updateWebhookRoute, deleteWebhookRoute, getWebhookRoute } = webhookUrls.routes;

const router = express.Router();

const webhooksRouter = () => {
  router[getWebhookRoute.httpMethod]("", [], mw.requireSuperAdmin, async (req: RequestWithUser, res: Response) => {
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
    [body("url").exists(), body("organisation").exists()],
    mw.validateRequest,
    mw.requireSuperAdmin,
    async (req: RequestWithUser, res: Response) => {
      const { url, organisation } = req.body as CreateWebhookRequestBody;

      const clientId = await db.superadmin.getClientId(organisation.toString());

      let secret = uuidV4();
      const client = await db.webhooks.getSecretForClient(clientId);
      if (client?.secret) {
        secret = client.secret;
      }

      const result = await db.webhooks.createWebhook(clientId, url, secret);
      return res.status(200).json(result);
    }
  );

  router[updateWebhookRoute.httpMethod](
    "",
    [query("id").exists(), body(["url", "organisation"]).exists()],
    mw.validateRequest,
    mw.requireSuperAdmin,
    async (req: RequestWithUser, res: Response) => {
      const { id } = req.query;
      const { url, organisation } = req.body as CreateWebhookRequestBody;

      const clientId = await db.superadmin.getClientId(organisation.toString());

      if (!id) {
        return res.status(400).json({ error: `Please provide webhook id` });
      }
      const result = await db.webhooks.updateWebhook(id!.toString(), clientId, url);
      return res.status(200).json(result);
    }
  );

  router[deleteWebhookRoute.httpMethod](
    "",
    [query("id").exists()],
    mw.validateRequest,
    mw.requireSuperAdmin,
    async (req: RequestWithUser, res: Response) => {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: `Please provide webhook id` });
      }
      const result = await db.webhooks.deleteWebhook(id!.toString());
      return res.status(200).json(result);
    }
  );

  return router;
};

export default webhooksRouter;
