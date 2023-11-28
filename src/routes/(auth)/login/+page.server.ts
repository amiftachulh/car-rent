import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from "./$types";
import { prisma } from '$lib/server/prisma';
import bcrypt from 'bcrypt';

export const actions: Actions = {
  login: async ({ cookies, request }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    if (
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      !username ||
      !password
    ) {
      return fail(400, { message: "Nama pengguna atau kata sandi tidak valid" });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return fail(404, { message: `Pengguna ${username} tidak ditemukan` });
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return fail(401, { message: "Kata sandi yang Anda masukkan salah" });
    }

    const authenticatedUser = await prisma.user.update({
      where: { username: user.username },
      data: { token: crypto.randomUUID() },
    });

    if (!authenticatedUser.token) {
      return fail(500, { message: "Internal server error" });
    }

    cookies.set('session', authenticatedUser.token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    throw redirect(302, '/');
  }
};
