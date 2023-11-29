import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ url }) => {
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

  return { userData: user }
};

export const actions: Actions = {
  update: async ({ request, url }) => {
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

    const data = Object.fromEntries(await request.formData()) as {
      username: string;
      fullName: string;
      address: string;
      phoneNumber: string;
    }

    await prisma.user.update({
      where: { id },
      data
    })

    throw redirect(302, "/dashboard/admin/users")
  }
};
