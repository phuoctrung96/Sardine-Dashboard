import { SuperAdmin } from "@prisma/client";
import { AUDIT_LOG_TYPES } from "sardine-dashboard-typescript-definitions";
import { CurrentUser } from "src/api/request-interface";
import { logger } from "../commons/logger";
import { prisma } from "../repository/prismaClient";

export const listSuperAdminEmails = (): Promise<SuperAdmin[]> => prisma.superAdmin.findMany();

export const addSuperAdminEmail = async ({
  email,
  currentUser,
}: {
  email: string;
  currentUser: CurrentUser;
}): Promise<SuperAdmin> => {
  const result = await prisma.superAdmin.create({ data: { email } });
  logger.info(`Email added to super admin: ${email} by ${currentUser.name}`);

  // Audit log. Once the log search is implemented, this should be removed.
  await prisma.auditLog.create({
    data: {
      clientId: currentUser.organisation_client_id || "",
      type: AUDIT_LOG_TYPES.ADD_SUPER_ADMIN,
      targetId: BigInt(result.id),
      actorId: BigInt(currentUser.id),
    },
  });

  return result;
};
