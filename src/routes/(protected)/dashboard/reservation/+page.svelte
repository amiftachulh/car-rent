<script lang="ts">
  import { A, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import Footer from "$lib/components/Footer.svelte";
  import { enhance } from "$app/forms";

  export let data: PageData;
</script>

<svelte:head>
  <title>Pesanan</title>
</svelte:head>

<div class="px-2 sm:px-4">
  <div class="mx-auto container">
    <h1 class="py-4 font-bold text-2xl text-center">Pesanan</h1>
    {#if data.reservations.length}
      <Table>
        <TableHead>
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Mobil</TableHeadCell>
          <TableHeadCell>Nomor Plat</TableHeadCell>
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
              <TableBodyCell>{reservation.car.carModel.name}</TableBodyCell>
              <TableBodyCell>{reservation.car.registrationNumber}</TableBodyCell>
              <TableBodyCell>{reservation.startDate.toLocaleDateString()}</TableBodyCell>
              <TableBodyCell>{reservation.endDate.toLocaleDateString()}</TableBodyCell>
              <TableBodyCell>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(reservation.totalCost)}</TableBodyCell>
              <TableBodyCell>
                {#if (reservation.startDate.getTime() - new Date().getTime()) > 24 * 60 * 60 * 1000}
                  <form action="?/delete&id={reservation.id}" method="post" use:enhance>
                    <button class="text-primary-500 hover:underline">Batalkan</button>
                  </form>
                {:else}
                  <p>Tidak bisa dibatalkan</p>
                {/if}
              </TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    {:else}
      <p class="text-center">Belum ada pesanan</p>
    {/if}
  </div>
</div>
