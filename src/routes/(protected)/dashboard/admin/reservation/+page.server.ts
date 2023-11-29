import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const reservations = await prisma.reservation.findMany({
    include: {
      car: {
        include: { carModel: true }
      },
      user: true
    }
  });
  return { reservations }
};
