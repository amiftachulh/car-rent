<script lang="ts">
  import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Button } from "flowbite-svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>


<h1 class="text-center font-bold text-2xl">Daftar Pesanan</h1>
<Table>
  <TableHead>
    <TableHeadCell>ID</TableHeadCell>
    <TableHeadCell>ID Pesanan</TableHeadCell>
    <TableHeadCell>
      <span class="sr-only">Delete</span>
    </TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each data.returnsList as r}
      <TableBodyRow>
        <TableBodyCell>{r.id}</TableBodyCell>
        <TableBodyCell>{r.reservationId}</TableBodyCell>
        <TableBodyCell>
          <Button>Hapus</Button>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
