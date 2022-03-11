import express, { Response } from "express";
import { query, body } from "express-validator";
import { superAdminUrls } from "sardine-dashboard-typescript-definitions";
import { Prisma } from "@prisma/client";
import { mw } from "../../commons/middleware";
import { db } from "../../commons/db";
import { AuthService } from "../../commons/AuthService";
import { captureException, getErrorMessage, isErrorWithSpecificMessage } from "../../utils/error-utils";
import {
  RequestWithUser,
  RevokeCredentialsRequest,
  GenerateCredentialRequest,
  RequestWithCurrentUser,
} from "../request-interface";
import { addSuperAdminEmail, listSuperAdminEmails } from "../../use-case/super-admin-use-case";

const {
  generateCredentialsRoute,
  getCredentialsRoute,
  revokeCredentialsRoute,
  listSuperAdminEmailsRoute,
  addSuperAdminEmailRoute,
} = superAdminUrls.routes;

const router = express.Router();

const superAdminRouter = (authService: AuthService) => {
  router[getCredentialsRoute.httpMethod](
    getCredentialsRoute.path,
    [query("organisation").exists()],
    mw.requireAdminAccess,
    async (req: RequestWithUser, res: Response) => {
      const { organisation = "" } = req.query;
      try {
        const clientId = await db.superadmin.getClientId(organisation.toString());
        const { keys }: { keys: string[] } = await authService.getAllKeys(clientId);
        return res.json(keys);
      } catch (e) {
        if (isErrorWithSpecificMessage(e, "NOT_FOUND")) {
          return res.status(404).json({ error: `Invalid organisation name` });
        }
        throw e;
      }
    }
  );

  router[revokeCredentialsRoute.httpMethod](
    revokeCredentialsRoute.path,
    [body("uuid").exists(), body("clientID").exists()],
    mw.validateRequest,
    async (req: RequestWithUser, res: Response) => {
      const { uuid, clientID } = req.body as RevokeCredentialsRequest;
      await authService.revokeCredentials(clientID, uuid);
      return res.end();
    }
  );

  router[generateCredentialsRoute.httpMethod](
    generateCredentialsRoute.path,
    [body("organisation").exists()],
    mw.validateRequest,
    async (req: RequestWithUser, res: Response) => {
      const { organisation } = req.body as GenerateCredentialRequest;
      const clientId = await db.superadmin.getClientId(organisation);
      const result = await authService.generateNewCredentails(clientId);
      return res.status(200).json(result);
    }
  );

  router[listSuperAdminEmailsRoute.httpMethod](
    listSuperAdminEmailsRoute.path,
    mw.requireSuperAdmin,
    async (req: RequestWithCurrentUser, res: Response) => {
      try {
        const superAdmins = await listSuperAdminEmails();
        return res.status(200).json(superAdmins.map((superAdmin) => ({ id: Number(superAdmin.id), email: superAdmin.email })));
      } catch (e) {
        captureException(e);
        return res.status(500).json({ error: "Something went wrong" });
      }
    }
  );

  router[addSuperAdminEmailRoute.httpMethod](
    addSuperAdminEmailRoute.path,
    mw.requireSuperAdmin,
    [body("email").exists()],
    async (req: RequestWithCurrentUser<{ email: string }>, res: Response) => {
      try {
        const { email } = req.body;

        const { currentUser } = req;
        if (currentUser === undefined) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        // DB should prevent from inserting a existing email.
        const superAdmin = await addSuperAdminEmail({ email, currentUser });

        return res.status(200).json({ superAdmin: { id: Number(superAdmin.id), email: superAdmin.email } });
      } catch (e) {
        captureException(e);

        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          let message = `Error code: ${e.code}`;
          if (e.code === "P2002") {
            message = `Email already exists`;
          }
          return res.status(500).json({ error: message });
        }
        const message = getErrorMessage(e);
        return res.status(500).json({ error: message });
      }
    }
  );

  return router;
};

export default superAdminRouter;
