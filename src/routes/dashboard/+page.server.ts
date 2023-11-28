import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const cars = await prisma.carModel.findMany({
    select: {
      id: true,
      name: true,
      costPerDay: true,
      imageUrl: true,
      _count: true,
    },
  });
  console.log(cars);

  return { cars };
};
