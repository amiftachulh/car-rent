import { prisma } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const carModels = await prisma.carModel.findMany();
  return { carModels };
}

export const actions: Actions = {
  delete: async ({ url }) => {
    const id = Number(url.searchParams.get("id"));
    if (isNaN(id)) {
      throw error(400, { message: "Invalid ID" })
    }

    const carModel = await prisma.carModel.findFirst({
      where: { id },
    })

    if (!carModel) {
      throw error(404, { message: "Seri mobil tidak ditemukan" })
    }

    await prisma.carModel.delete({ where: { id } });
    return { success: true }
  }
};
