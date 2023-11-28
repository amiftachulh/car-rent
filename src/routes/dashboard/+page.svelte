<script lang="ts">
  import { Button, Input, Modal, Select } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import Footer from "$lib/components/Footer.svelte";
  import { onMount } from "svelte";

  export let data: PageData;
  let carModals: boolean[] = Array(data.cars.length).fill(false);
  let selected: number;
  let totalCost: number;

  function updateTotalCost() {
    if (selected !== undefined) {
      totalCost = selected * data.cars[selected].costPerDay;
      console.log(data.cars[selected - 1]);
    }
  }

  function openModal(carId: number) {
    carModals[carId] = true;
    selected = 1;
    updateTotalCost();
  }

  let days = [
    { value: 1, name: "1 hari" },
    { value: 2, name: "2 hari" },
    { value: 3, name: "3 hari" },
    { value: 4, name: "4 hari" },
    { value: 5, name: "5 hari" },
    { value: 6, name: "6 hari" },
    { value: 7, name: "7 hari" },
  ];

  onMount(() => {
    updateTotalCost();
  });
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<div class="px-2 sm:px-4 py-8">
  <div class="mx-auto container grid grid-cols-fill gap-8 justify-between">
    {#each data.cars as car (car.id)}
      <div
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
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
          <Button on:click={() => openModal(car.id)}>Pesan</Button>
        </div>
      </div>
      <Modal
        bind:open={carModals[car.id]}
        size="xs"
        autoclose={false}
        class="w-full"
      >
        <form class="flex flex-col space-y-6" action="#">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Sewa <span class="font-bold">{car.name}</span>
          </h3>
          <Select
            class="mt-2"
            items={days}
            bind:value={selected}
            on:change={updateTotalCost}
          />
          <p class="font-bold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(totalCost)}
          </p>
        </form>
      </Modal>
    {/each}
  </div>
</div>

<Footer />
