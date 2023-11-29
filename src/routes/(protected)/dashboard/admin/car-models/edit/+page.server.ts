import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ url }) => {
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

  return { carModel }
};

export const actions: Actions = {
  update: async ({ request, url }) => {
    const id = Number(url.searchParams.get("id"));
    if (isNaN(id)) {
      throw error(400, { message: "Invalid ID" })
    }

    const user = await prisma.carModel.findFirst({
      where: { id },
    })

    if (!user) {
      throw error(404, { message: "Seri mobil tidak ditemukan" })
    }

    const data = Object.fromEntries(await request.formData()) as {
      name: string;
      costPerDay: string;
      imageUrl: string;
    }

    const costPerDay = Number(data.costPerDay);

    if (isNaN(costPerDay)) {
      throw error(400, { message: "Invalid cost per day" })
    }

    await prisma.carModel.update({
      where: { id },
      data: { ...data, costPerDay }
    })

    throw redirect(302, "/dashboard/admin/car-models")
  }
};
