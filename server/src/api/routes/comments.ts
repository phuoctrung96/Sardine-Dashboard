import express, { Response } from "express";
import { query, body } from "express-validator";
import moment from "moment";
import { AddNewCommentRequestBody, commentUrls } from "sardine-dashboard-typescript-definitions";
import { captureException } from "../../utils/error-utils";
import { mw } from "../../commons/middleware";
import { db } from "../../commons/db";
import { RequestWithCurrentUser } from "../request-interface";
import { datastore } from "../../service/datastore-service";

const { addNewCommentRoute, getListCommentRoute } = commentUrls.routes;

const router = express.Router();

const commentsRouter = () => {
  const ENTITY_NAME = "comments";
  const getEntity = () => datastore.createQuery(ENTITY_NAME);

  router[getListCommentRoute.httpMethod](
    getListCommentRoute.path,
    [query("clientId").exists(), query("sessionKey").exists()],
    [mw.validateRequest, mw.requireLoggedIn],
    async (req: RequestWithCurrentUser<{}, { clientId: string; sessionKey: string }>, res: Response) => {
      const { clientId = "", sessionKey = "" } = req.query;
      try {
        const users =
          req.currentUser?.user_role === "sardine_admin"
            ? await db.auth.getAllUsersData()
            : await db.auth.getOrganizationUsers(clientId.toString(), true);

        const datastoreQuery = getEntity().filter("sessionKey", sessionKey.toString());

        const result = await datastore.runQuery(datastoreQuery);
        const data = result[0].map((r) => {
          const filteredUsers = users.filter((u) => u.id === r.owner_id);
          return {
            ...r,
            id: r[datastore.KEY].id,
            owner: filteredUsers.length > 0 ? filteredUsers[0] : {},
          };
        });

        return res.json(data);
      } catch (e: unknown) {
        if (e instanceof Error && e.message === "NOT_FOUND") {
          return res.status(404).json({ error: `Comments not found` });
        }

        return res.status(500).json({ error: `Internal server error` });
      }
    }
  );

  router[addNewCommentRoute.httpMethod](
    addNewCommentRoute.path,
    [body("sessionKey").exists(), body("comment").exists(), body("owner_id").exists()],
    [mw.validateRequest, mw.requireLoggedIn],
    async (req: RequestWithCurrentUser<AddNewCommentRequestBody>, res: Response) => {
      const { sessionKey, owner_id, comment, clientId } = req.body;

      try {
        if (owner_id === "") {
          return res.status(404).json({ error: `Failed to add comment` });
        }

        const datastoreKey = datastore.key(ENTITY_NAME);

        await datastore.save({
          key: datastoreKey,
          data: {
            clientId,
            sessionKey,
            comment,
            owner_id,
            timestamp: moment.now(),
          },
        });

        return res.json(datastoreKey.id || "");
      } catch (e) {
        captureException(e);
        return res.status(404).json({ error: `Failed to add comment` });
      }
    }
  );

  return router;
};

export default commentsRouter;
