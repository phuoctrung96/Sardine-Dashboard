import { User } from "@prisma/client";
import { prisma } from "./prismaClient";

export const fetchUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  if (users === undefined) {
    return [];
  }
  return users;
};

export const findUser = async ({ sessionId }: { sessionId: string }): Promise<User | undefined> => {
  const session = await prisma.session.findFirst({ where: { id: sessionId } });
  if (session === null) {
    return undefined;
  }
  if (session.expiredAt < new Date()) {
    return undefined;
  }
  const { userId } = session;
  if (userId === null) {
    return undefined;
  }
  const userIdNumber = Number(userId);
  const user = await prisma.user.findFirst({
    where: {
      id: userIdNumber,
    },
  });
  if (user === null) {
    return undefined;
  }
  return user;
};
