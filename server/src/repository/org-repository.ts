import { Org } from "@prisma/client";
import { captureException } from "../utils/error-utils";
import { prisma } from "./prisma-client";

export const findOrg = async ({ clientId }: { clientId: string }): Promise<Org | undefined> => {
  try {
    const org = await prisma.org.findFirst({ where: { clientId } });
    if (org === null) {
      return undefined;
    }
    return org;
  } catch (e) {
    captureException(e);
  }
  return undefined;
};

export const findOrgById = async (id: bigint): Promise<Org | undefined> => {
  try {
    const org = await prisma.org.findFirst({ where: { id } });
    if (org === null) {
      return undefined;
    }
    return org;
  } catch (e) {
    captureException(e);
  }
  return undefined;
};

export const listOrgs = async ({ clientIds }: { clientIds: string[] }): Promise<Org[]> => {
  try {
    const orgs = await prisma.org.findMany({ where: { clientId: { in: clientIds } } });
    return orgs;
  } catch (e) {
    captureException(e);
  }
  return [];
};
