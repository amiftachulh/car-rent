import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async () => {
  const returnsList = await prisma.return.findMany()
  return { returnsList }
};
