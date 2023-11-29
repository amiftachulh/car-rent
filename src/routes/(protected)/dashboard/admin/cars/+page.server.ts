import { prisma } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const cars = await prisma.car.findMany({
    include: {
      carModel: true
    }
  })

  return { cars }
}


export const actions: Actions = {
  delete: async ({ url }) => {
    const id = Number(url.searchParams.get("id"));
    if (isNaN(id)) {
      throw error(400, { message: "Invalid ID" })
    }

    const car = await prisma.car.findFirst({
      where: { id },
    })

    if (!car) {
      throw error(404, { message: "Seri mobil tidak ditemukan" })
    }

    await prisma.car.delete({ where: { id } });
    return { success: true }
  }
};
