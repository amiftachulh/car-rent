<script lang="ts">
  import { A, Input, Button, Alert } from 'flowbite-svelte';
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";

  export let form: ActionData;
</script>

<svelte:head>
  <title>Masuk</title>
</svelte:head>

<form class="flex flex-col gap-4 w-80 bg-white p-8 shadow-lg" action="?/login" method="POST" use:enhance>
  <h1 class="font-bold text-2xl text-center">Masuk</h1>
  <Input type="text" id="username" name="username" placeholder="Nama Pengguna" autocomplete="off" required />
  <Input type="password" id="username" name="password" placeholder="Kata Sandi" required />
  <Button class="font-bold" type="submit">Masuk</Button>
  <p class="text-sm text-center">Belum punya akun? <A href="/register">Daftar</A></p>
</form>

{#if form?.message}
  <div class="absolute top-4">
    <Alert class="bg-white shadow-lg" border color="red" dismissable>
      {form.message}
    </Alert>
  </div>
{/if}
