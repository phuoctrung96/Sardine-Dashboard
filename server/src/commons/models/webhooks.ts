import pgPromise from "pg-promise";
import { WebhookType } from "sardine-dashboard-typescript-definitions";

const webhookModel = (db: pgPromise.IDatabase<{}>) => {
  const getWebhooks = async () => {
    const result = await db.manyOrNone(
      `SELECT
        ow.id, ow.client_id, ow.type, ow.url, ow.secret, o.display_name as name
        FROM organization_webhooks ow
        JOIN organisation o
        ON ow.client_id = o.client_id
        WHERE ow.deleted_at is null`,
      []
    );
    return result;
  };

  const getSecretForClient = async (clientId: string) => {
    const result = await db.oneOrNone(
      `SELECT secret FROM organization_webhooks WHERE deleted_at is null and client_id = $1 LIMIT 1`,
      [clientId]
    );
    return result;
  };

  const createWebhook = (clientId: string, url: string, secret: string, type: WebhookType) =>
    db.oneOrNone(
      `
      INSERT INTO organization_webhooks
      (client_id, url, secret, type) VALUES ($1, $2, $3, $4) RETURNING id
    `,
      [clientId, url, secret, type]
    );

  const updateWebhook = (id: string, clientId: string, url: string, type: WebhookType) =>
    db.oneOrNone(
      `
      UPDATE organization_webhooks SET client_id = $1, url = $2, updated_at = now(), type = $3 WHERE id = $4 RETURNING id
    `,
      [clientId, url, type, id]
    );

  const deleteWebhook = (id: string) =>
    db.oneOrNone(
      `
      UPDATE organization_webhooks SET deleted_at = now() WHERE id = $1 RETURNING id
    `,
      [id]
    );

  return {
    getWebhooks,
    createWebhook,
    updateWebhook,
    deleteWebhook,
    getSecretForClient,
  };
};

export default webhookModel;
