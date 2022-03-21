import { captureException } from "./error-utils";
import { RequestWithCurrentUser } from "../api/request-interface";
import { db } from "../commons/db";

export const writeAuditLog = (req: RequestWithCurrentUser, clientID: string, targetId: number, type: string, data: string) => {
  const userId = parseInt(req.currentUser?.id || "", 10);
  if (clientID && !Number.isNaN(userId)) {
    db.audit.createLog(clientID, type, targetId, userId, data).catch(captureException);
  } else {
    captureException(`Failed to write audit log for clientID: ${clientID} and userId: ${userId}`);
  }
};
