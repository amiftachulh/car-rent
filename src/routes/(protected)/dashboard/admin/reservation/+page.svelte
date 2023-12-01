<script lang="ts">
  import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Button, ButtonGroup, Tabs, TabItem } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";

  export let data: PageData;
</script>

<svelte:head>
  <title>Daftar Pesanan</title>
</svelte:head>

<h1 class="text-center font-bold text-2xl">Daftar Pesanan</h1>
<Tabs>
  <TabItem open title="Belum Selesai">
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
              <form class="inline" action="?/delete&id={reservation.id}" method="post" use:enhance>
                <ButtonGroup>
                  <Button type="button" href="reservation/edit?id={reservation.id}" color="blue">Edit</Button>
                  <Button type="submit" color="red">Hapus</Button>
                  <Button type="submit" formaction="?/completed&id={reservation.id}" color="yellow">Selesai</Button>
                </ButtonGroup>
              </form>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </TabItem>
  <TabItem title="Sudah Selesai">
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
        {#each data.completedReservations as reservation}
          <TableBodyRow>
            <TableBodyCell>{reservation.id}</TableBodyCell>
            <TableBodyCell>{reservation.user.fullName}</TableBodyCell>
            <TableBodyCell>{reservation.car.carModel.name}</TableBodyCell>
            <TableBodyCell>{reservation.startDate.toLocaleDateString()}</TableBodyCell>
            <TableBodyCell>{reservation.endDate.toLocaleDateString()}</TableBodyCell>
            <TableBodyCell>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(reservation.totalCost)}</TableBodyCell>
            <TableBodyCell>
              <form class="inline" action="?/reset&id={reservation.id}" method="post" use:enhance>
                <Button type="submit" color="red">Reset</Button>
              </form>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </TabItem>
</Tabs>
