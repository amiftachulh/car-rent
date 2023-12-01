<script lang="ts">
  import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Button, ButtonGroup } from "flowbite-svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1 class="text-center font-bold text-2xl">Daftar Seri Mobil</h1>
<Table>
  <TableHead>
    <TableHeadCell>ID</TableHeadCell>
    <TableHeadCell>Nama</TableHeadCell>
    <TableHeadCell>Sewa per Hari</TableHeadCell>
    <TableHeadCell>URL Gambar</TableHeadCell>
    <TableHeadCell>
      <span class="sr-only">Edit</span>
    </TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each data.carModels as carModel}
      <TableBodyRow>
        <TableBodyCell>{carModel.id}</TableBodyCell>
        <TableBodyCell>{carModel.name}</TableBodyCell>
        <TableBodyCell>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(carModel.costPerDay)}</TableBodyCell>
        <TableBodyCell>{carModel.imageUrl}</TableBodyCell>
        <TableBodyCell>
          <form class="inline" action="?/delete&id={carModel.id}" method="post">
            <ButtonGroup>
              <Button type="button" color="blue" href="car-models/edit?id={carModel.id}">Edit</Button>
              <Button type="submit" color="red">Hapus</Button>
            </ButtonGroup>
          </form>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
