import { prisma } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      fullName: true,
      address: true,
      phoneNumber: true,
    }
  });

  return { users };
}

export const actions: Actions = {
  delete: async ({ url }) => {
    const id = Number(url.searchParams.get("id"));
    if (isNaN(id)) {
      throw error(400, { message: "Invalid ID" })
    }

    const user = await prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        username: true,
        fullName: true,
        address: true,
        phoneNumber: true
      }
    })

    if (!user) {
      throw error(404, { message: "Pengguna tidak ditemukan" })
    }

    await prisma.user.delete({ where: { id } });
    return { success: true }
  }
};
