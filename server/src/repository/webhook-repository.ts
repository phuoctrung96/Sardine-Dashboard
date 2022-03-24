import { Webhook } from "@prisma/client";
import { captureException } from "../utils/error-utils";
import { prisma } from "./prisma-client";

export const listWebhooks = (): Promise<Webhook[]> => {
  try {
    return prisma.webhook.findMany({
      where: {
        deletedAt: null,
      },
    });
  } catch (e) {
    captureException(e);
    return Promise.resolve([]);
  }
};
