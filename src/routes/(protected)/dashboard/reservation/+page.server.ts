import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const reservations = await prisma.reservation.findMany({
    where: { userId: locals.user.id },
    include: {
      car: {
        include: { carModel: true }
      }
    }
  });
  return { reservations };
};

export const actions: Actions = {
  delete: async ({ url, locals }) => {
    const id = Number(url.searchParams.get("id"));
    if (isNaN(id)) {
      return fail(400, { message: "Pesanan tidak valid" });
    }

    const reservation = await prisma.reservation.findFirst({
      where: {
        id,
        userId: locals.user.id
      }
    })

    if (!reservation) {
      return fail(404, { message: "Pesanan tidak ditemukan" });
    }

    if ((reservation.startDate.getTime() - new Date().getTime()) < 24 * 60 * 60 * 1000) {
      return fail(400, { message: "Tidak bisa dibatalkan jika jarak 1 hari" });
    }

    await prisma.$transaction([
      prisma.reservation.delete({ where: { id } }),
      prisma.car.update({
        where: { id: reservation.carId },
        data: { rented: false }
      })
    ])

    return {
      success: true
    };
  }
};
