import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

/**
 * Gets the current user from the database, creating it if it doesn't exist.
 * This ensures we have a local User record linked to the Clerk user.
 */
export async function getOrCreateUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  
  if (!email) {
    return null;
  }

  // Find or create the user in our database
  const user = await prisma.user.upsert({
    where: { clerkId: clerkUser.id },
    update: {
      email: email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
    },
    create: {
      clerkId: clerkUser.id,
      email: email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
    },
  });

  return user;
}
