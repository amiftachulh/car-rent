import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ url }) => {
  const id = Number(url.searchParams.get("id"));
  if (isNaN(id)) {
    throw error(400, { message: "Invalid ID" })
  }

  const reservation = await prisma.reservation.findFirst({
    where: { id },
    include: {
      user: true
    }
  })

  if (!reservation) {
    throw error(404, { message: "Pesanan tidak ditemukan" })
  }

  return { reservation }
};

export const actions: Actions = {
  update: async ({ request, url }) => {
    const id = Number(url.searchParams.get("id"));
    if (isNaN(id)) {
      throw error(400, { message: "Invalid ID" })
    }

    const reservation = await prisma.reservation.findFirst({
      where: { id },
    })

    if (!reservation) {
      throw error(404, { message: "Pesanan tidak ditemukan" })
    }

    const formData = await request.formData();
    const carId = Number(formData.get("carId"));

    if (isNaN(carId)) {
      throw error(400, { message: "Invalid Car ID" });
    }

    const car = await prisma.car.findFirst({
      where: {
        id: carId,
      },
      include: {
        carModel: true
      }
    });

    if (!car) {
      throw error(400, { message: "Mobil tidak ditemukan" });
    }

    const startDateEntry = formData.get("startDate") as unknown as Date;
    const endDateEntry = formData.get("endDate") as unknown as Date;

    const startDate = new Date(startDateEntry);
    const endDate = new Date(endDateEntry);

    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    await prisma.reservation.update({
      where: { id },
      data: {
        carId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        totalCost: daysDifference * car.carModel.costPerDay
      }
    })

    throw redirect(302, "/dashboard/admin/reservation")
  }
};
