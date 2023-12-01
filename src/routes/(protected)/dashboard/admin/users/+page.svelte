<script lang="ts">
  import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Button, ButtonGroup } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";

  export let data: PageData;
</script>

<svelte:head>
  <title>Daftar Pengguna</title>
</svelte:head>

<h1 class="text-center font-bold text-2xl">Daftar Pengguna</h1>
<Table>
  <TableHead>
    <TableHeadCell>ID</TableHeadCell>
    <TableHeadCell>Nama Pengguna</TableHeadCell>
    <TableHeadCell>Nama Lengkap</TableHeadCell>
    <TableHeadCell>Alamat</TableHeadCell>
    <TableHeadCell>Nomor Hp</TableHeadCell>
    <TableHeadCell>
      <span class="sr-only">Edit</span>
    </TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each data.users as user}
      <TableBodyRow>
        <TableBodyCell>{user.id}</TableBodyCell>
        <TableBodyCell>{user.username}</TableBodyCell>
        <TableBodyCell>{user.fullName}</TableBodyCell>
        <TableBodyCell>{user.address}</TableBodyCell>
        <TableBodyCell>{user.phoneNumber}</TableBodyCell>
        <TableBodyCell>
          <form action="?/delete&id={user.id}" method="post" use:enhance>
            <ButtonGroup>
              <Button type="button" href="users/edit?id={user.id}" color="blue">Edit</Button>
              <Button type="submit" color="red">Hapus</Button>
            </ButtonGroup>
          </form>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
