import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

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

  return { cars };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const data = await request.formData();
    const carModelId = Number(data.get("carModelId"));
    const totalDays = Number(data.get("totalDays"));
    const startDate = data.get("startDate");

    if (
      typeof totalDays !== "number" ||
      typeof startDate !== "string" ||
      !totalDays ||
      !startDate ||
      totalDays < 1 ||
      totalDays > 7
    ) {
      return fail(400, { message: "Invalid request" });
    }

    const parsedStartDate = new Date(startDate);
    const endDate = new Date(startDate);
    endDate.setDate(parsedStartDate.getDate() + totalDays);

    const car = await prisma.car.findFirst({
      where: { carModelId, rented: false },
      include: { carModel: true }
    });

    if (!car) {
      return fail(404, { message: "Mobil tidak ditemukan atau sedang disewa" });
    }

    await prisma.$transaction([
      prisma.reservation.create({
        data: {
          carId: car.id,
          userId: locals.user.id,
          startDate: parsedStartDate.toISOString(),
          endDate: endDate.toISOString(),
          totalCost: car.carModel.costPerDay * totalDays,
        }
      }),
      prisma.car.update({
        where: { id: car.id },
        data: { rented: true }
      })
    ])

    throw redirect(302, "/dashboard/reservation");
  }
};
