<script lang="ts">
  import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Button } from "flowbite-svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1 class="text-center font-bold text-2xl">Daftar Mobil</h1>
<Table>
  <TableHead>
    <TableHeadCell>ID</TableHeadCell>
    <TableHeadCell>Nama</TableHeadCell>
    <TableHeadCell>Plat Nomor</TableHeadCell>
    <TableHeadCell>Status</TableHeadCell>
    <TableHeadCell>
      <span class="sr-only">Edit</span>
    </TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each data.cars as car}
      <TableBodyRow>
        <TableBodyCell>{car.id}</TableBodyCell>
        <TableBodyCell>{car.carModel.name}</TableBodyCell>
        <TableBodyCell>{car.registrationNumber}</TableBodyCell>
        <TableBodyCell>{car.rented ? "Sedang disewa" : "Tidak disewa"}</TableBodyCell>
        <TableBodyCell>
          <form class="inline" action="?/delete&id={car.id}" method="post">
            <Button>Hapus</Button>
          </form>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
