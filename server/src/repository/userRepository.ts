import { User } from "@prisma/client";
import { prisma } from "./prismaClient";

export const fetchUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  if (users === undefined) {
    return [];
  }
  return users;
};
