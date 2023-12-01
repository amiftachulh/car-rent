<script lang="ts">
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>Dashboard Admin</title>
</svelte:head>

<h1>Selamat datang <span class="font-bold">{$page.data.user.fullName}</span></h1>
