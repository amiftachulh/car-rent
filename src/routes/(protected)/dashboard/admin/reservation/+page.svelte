<script lang="ts">
  import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Button } from "flowbite-svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1 class="text-center font-bold text-2xl">Daftar Pesanan</h1>
<Table>
  <TableHead>
    <TableHeadCell>ID</TableHeadCell>
    <TableHeadCell>Pengguna</TableHeadCell>
    <TableHeadCell>Mobil</TableHeadCell>
    <TableHeadCell>Tanggal Mulai</TableHeadCell>
    <TableHeadCell>Tanggal Akhir</TableHeadCell>
    <TableHeadCell>Total Biaya</TableHeadCell>
    <TableHeadCell>
      <span class="sr-only">Edit</span>
    </TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each data.reservations as reservation}
      <TableBodyRow>
        <TableBodyCell>{reservation.id}</TableBodyCell>
        <TableBodyCell>{reservation.user.fullName}</TableBodyCell>
        <TableBodyCell>{reservation.car.carModel.name}</TableBodyCell>
        <TableBodyCell>{reservation.startDate.toLocaleDateString()}</TableBodyCell>
        <TableBodyCell>{reservation.endDate.toLocaleDateString()}</TableBodyCell>
        <TableBodyCell>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(reservation.totalCost)}</TableBodyCell>
        <TableBodyCell>
          <Button href="reservation/edit?id={reservation.id}" color="blue">Edit</Button>
          <form class="inline" action="?/delete&id={reservation.id}" method="post">
            <Button type="submit">Hapus</Button>
          </form>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
