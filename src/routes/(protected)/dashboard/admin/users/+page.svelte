<script lang="ts">
  import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Button } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";

  export let data: PageData;
</script>

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
          <Button href="users/edit?id={user.id}" color="blue">Edit</Button>
          <form class="inline" action="?/delete&id={user.id}" method="post" use:enhance>
            <Button type="submit">Hapus</Button>
          </form>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
