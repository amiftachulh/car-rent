import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import bcrypt from "bcrypt";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    throw redirect(302, "/");
  }
};

export const actions: Actions = {
  register: async ({ request }) => {
    const data = await request.formData();
    const username = data.get("username");
    const password = data.get("password");
    const address = data.get("address");
    const phoneNumber = data.get("phoneNumber");

    if (
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      typeof address !== 'string' ||
      typeof phoneNumber !== 'string' ||
      !username ||
      !password ||
      !address ||
      !phoneNumber
    ) {
      return fail(400, { message: "Invalid payload" });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      return fail(419, { message: "Nama pengguna sudah dipakai" });
    }

    await prisma.user.create({
      data: {
        username,
        password: await bcrypt.hash(password, 10),
        address,
        phoneNumber,
        roleId: 2,
      },
    });

    throw redirect(303, "/login");
  },
};
