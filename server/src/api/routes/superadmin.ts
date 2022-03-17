import express, { Response } from "express";
import { query, body } from "express-validator";
import { superAdminUrls } from "sardine-dashboard-typescript-definitions";
import { Prisma } from "@prisma/client";
import { mw } from "../../commons/middleware";
import { db } from "../../commons/db";
import { AuthService } from "../../commons/AuthService";
import { captureException, getErrorMessage, isErrorWithSpecificMessage } from "../../utils/error-utils";
import { RevokeCredentialsRequest, GenerateCredentialRequest, RequestWithCurrentUser } from "../request-interface";
import { addSuperAdminEmail, deleteSuperAdminEmail, listSuperAdminEmails } from "../../use-case/super-admin-use-case";

const {
  generateCredentialsRoute,
  getCredentialsRoute,
  revokeCredentialsRoute,
  listSuperAdminEmailsRoute,
  addSuperAdminEmailRoute,
  deleteSuperAdminEmailRoute,
} = superAdminUrls.routes;

const router = express.Router();

const superAdminRouter = (authService: AuthService) => {
  router[getCredentialsRoute.httpMethod](
    getCredentialsRoute.path,
    [query("organisation").exists()],
    mw.requireAdminAccess,
    async (req: RequestWithCurrentUser<{}, { organisation: string }>, res: Response) => {
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
    async (req: RequestWithCurrentUser<RevokeCredentialsRequest>, res: Response) => {
      const { uuid, clientID } = req.body;
      await authService.revokeCredentials(clientID, uuid);
      return res.end();
    }
  );

  router[generateCredentialsRoute.httpMethod](
    generateCredentialsRoute.path,
    [body("organisation").exists()],
    mw.validateRequest,
    async (req: RequestWithCurrentUser<GenerateCredentialRequest>, res: Response) => {
      const { organisation } = req.body;
      const clientId = await db.superadmin.getClientId(organisation);
      const result = await authService.generateNewCredentials(clientId);
      return res.status(200).json(result);
    }
  );

  router[listSuperAdminEmailsRoute.httpMethod](
    listSuperAdminEmailsRoute.path,
    mw.requireSuperAdmin,
    async (_req: RequestWithCurrentUser, res: Response) => {
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

  router[deleteSuperAdminEmailRoute.httpMethod](
    deleteSuperAdminEmailRoute.path,
    mw.requireSuperAdmin,
    [query("id").exists()],
    async (req: RequestWithCurrentUser<{}, { id: string }>, res: Response) => {
      try {
        const { id } = req.query;
        if (id === undefined) {
          return res.status(400).json({ error: "id is required" });
        }
        const idNumber = Number(id);

        const { currentUser } = req;
        if (currentUser === undefined) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        // If the super admin record with the ID does not exist, error will be raised.
        const superAdmin = await deleteSuperAdminEmail({ id: idNumber, currentUser });

        return res.status(200).json({ id: Number(superAdmin.id), email: superAdmin.email });
      } catch (e) {
        captureException(e);

        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          const message = `Error code: ${e.code}`;
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
