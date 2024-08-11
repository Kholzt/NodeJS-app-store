import { clerkClient } from "@clerk/clerk-sdk-node";
import prisma from "./prisma";

export const auth = async (userId: string) => {
  if (userId) {
    let user: any = await clerkClient.users.getUser(userId);
    const userData = await prisma.users.findFirst({
      where: {
        email: user.primaryEmailAddress?.emailAddress,
      },
    });
    return userData;
  }
  return null;
};
