<script lang="ts">
  import { Alert, Button, Input, Label, Modal } from "flowbite-svelte";
  import type { ActionData, PageData } from "./$types";
  import Footer from "$lib/components/Footer.svelte";

  export let data: PageData;
  export let form: ActionData;

  let openModal = false;
  let selectedCarIndex = 0;
  let selectedTotalDays = 1;

  $: totalCost = data.cars[selectedCarIndex].costPerDay * selectedTotalDays;

  function handleClick(index: number) {
    selectedCarIndex = index;
    selectedTotalDays = 1;
    openModal = true;
  }
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<div class="px-2 sm:px-4 py-8">
  <h1 class="font-bold text-2xl mb-6 text-center">Pilih Mobil</h1>
  <div class="mx-auto container grid grid-cols-fill gap-8 justify-between">
    {#each data.cars as car, index (car.id)}
      <div
        class="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        {#if car.cars.length}
          <div class="absolute top-2 right-2 px-2 bg-primary-600 text-white text-sm rounded-lg">
            Tersedia: {car.cars.length}
          </div>
        {:else}
          <div class="absolute top-2 right-2 px-2 bg-primary-600 text-white text-sm rounded-lg grayscale">
            Sedang disewa
          </div>
        {/if}
        <img
          class="rounded-t-lg w-full h-[200px] object-cover"
          src={car.imageUrl}
          alt={car.name}
        />
        <div class="p-5">
          <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900">
            {car.name}
          </h5>
          <p class="mb-3 font-normal text-gray-700">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(car.costPerDay)} / hari
          </p>
          <Button on:click={() => handleClick(index)} disabled={!car.cars.length}>
            Pesan
          </Button>
        </div>
      </div>
    {/each}

    <Modal
      bind:open={openModal}
      size="xs"
      autoclose={false}
      class="w-full"
      outsideclose
    >
      <form method="post" class="flex flex-col space-y-6">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
          Sewa <span class="font-bold">{data.cars[selectedCarIndex].name}</span>
        </h3>
        <input type="text" class="hidden" name="carModelId" value={data.cars[selectedCarIndex].id} />
        <div>
          <Label for="total-days" class="mb-2">Hari</Label>
          <select bind:value={selectedTotalDays} id="total-days" name="totalDays" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" required>
            <option value={1} selected>1 hari</option>
            <option value={2}>2 hari</option>
            <option value={3}>3 hari</option>
            <option value={4}>4 hari</option>
            <option value={5}>5 hari</option>
            <option value={6}>6 hari</option>
            <option value={7}>7 hari</option>
          </select>
        </div>
        <div>
          <Label for="start-date" class="mb-2">Tanggal mulai</Label>
          <Input type="date" id="start-date" name="startDate" required />
        </div>
        <p class="text-right">
          Total:
          <span class="font-bold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(totalCost)}
          </span>
        </p>
        <Button type="submit">Bayar</Button>
      </form>
    </Modal>
  </div>
</div>

<Footer />

{#if form?.message}
  <div class="absolute top-4 left-1/2 -translate-x-1/2">
    <Alert class="bg-white shadow-lg" border color="red" dismissable>
      {form.message}
    </Alert>
  </div>
{/if}
