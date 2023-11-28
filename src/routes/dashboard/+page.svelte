<script lang="ts">
  import { Button } from "flowbite-svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="flex">
  {#each data.cars as car}
    <div class="bg-white flex-1">
      <img src="{car.imageUrl}" alt="{car.Name}">
      <div class="row">
        <span>{car.costPerDay}</span>
        <Button>Pesan</Button>
      </div>
    </div>
  {/each}
</div>
