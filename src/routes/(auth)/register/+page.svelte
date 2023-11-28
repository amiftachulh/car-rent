<script lang="ts">
  import { A, Input, Button, Alert } from 'flowbite-svelte';
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";

  export let form: ActionData;
</script>

<svelte:head>
  <title>Daftar</title>
</svelte:head>

<form class="flex flex-col gap-4 w-80 bg-white p-8 shadow-lg" action="?/register" method="POST" use:enhance>
  <h1 class="font-bold text-2xl text-center">Daftar</h1>
  <Input type="text" id="username" name="username" placeholder="Nama Pengguna" autocomplete="off" required />
  <Input type="password" id="password" name="password" placeholder="Kata Sandi" required />
  <Input type="text" id="address" name="address" placeholder="Alamat" autocomplete="off" required />
  <Input type="tel" id="phoneNumber" name="phoneNumber" placeholder="No. Hp" required />
  <Button class="font-bold" type="submit">Daftar</Button>
  <p class="text-sm text-center">Sudah punya akun? <A href="/login">Masuk</A></p>
</form>

{#if form?.message}
  <div class="absolute top-4">
    <Alert class="bg-white shadow-lg" border color="red" dismissable>
      {form.message}
    </Alert>
  </div>
{/if}
