import type { Handle } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get("session");

  if (!session) {
    return await resolve(event);
  }

  const user = await prisma.user.findFirst({
    where: { token: session },
  });

  if (user) {
    event.locals.user = {
      id: user.id,
      username: user.username,
      role: user.roleId,
    };
  }

  return await resolve(event);
};
