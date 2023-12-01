import { prisma } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const reservations = prisma.reservation.findMany({
    where: {
      return: null
    },
    include: {
      car: {
        include: { carModel: true }
      },
      user: true
    }
  });

  const completedReservations = prisma.reservation.findMany({
    where: {
      return: { isNot: null }
    },
    include: {
      car: {
        include: { carModel: true }
      },
      user: true
    }
  });

  return {
    reservations: await reservations,
    completedReservations: await completedReservations
  }
};

export const actions: Actions = {
  delete: async ({ url }) => {
    const id = Number(url.searchParams.get("id"));
    if (isNaN(id)) {
      throw error(400, { message: "Invalid ID" });
    }

    const reservation = await prisma.reservation.findFirst({ where: { id } });

    if (!reservation) {
      throw error(404, { message: "Pesanan tidak ada" });
    }

    await prisma.reservation.delete({ where: { id } });

    return { success: true };
  },
  completed: async ({ url }) => {
    const id = Number(url.searchParams.get("id"));
    if (isNaN(id)) {
      throw error(400, { message: "Invalid ID" });
    }

    const reservation = await prisma.reservation.findFirst({
      where: { id },
    });

    if (!reservation) {
      throw error(404, { message: "Pesanan tidak ada" });
    }

    await prisma.$transaction([
      prisma.return.create({
        data: {
          reservationId: reservation.id
        }
      }),
      prisma.car.update({
        where: { id: reservation.carId },
        data: { rented: false }
      })
    ]);

    return { success: true };
  },
  reset: async ({ url }) => {
    const id = Number(url.searchParams.get("id"));
    if (isNaN(id)) {
      throw error(400, { message: "Invalid ID" });
    }

    const reservation = await prisma.reservation.findFirst({ where: { id } })
    if (!reservation) {
      throw error(404, { message: "Pesanan tidak ada" });
    }

    await prisma.return.delete({
      where: { reservationId: reservation.id },
    })

    return { success: true }
  }
};
