<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, Input, Label } from "flowbite-svelte";
  import type { PageData } from "./$types"

  export let data: PageData;
</script>

<h1 class="text-center font-bold text-2xl">Edit Pesanan</h1>
<form action="?/update&id={data.reservation.id}" method="post" class="mt-4 [&>*]:mt-4" use:enhance>
  <div>
    <Label for="user">Pengguna</Label>
    <Input type="text" id="user" autocomplete="off" value={data.reservation.user.fullName} disabled />
  </div>
  <div>
    <Label for="carId">ID Mobil</Label>
    <Input type="text" id="carId" name="carId" autocomplete="off" value={data.reservation.carId} required />
  </div>
  <div>
    <Label for="startDate">Tanggal Mulai</Label>
    <Input type="date" id="startDate" name="startDate" autocomplete="off" value={data.reservation.startDate.toISOString().split("T")[0]} required />
  </div>
  <div>
    <Label for="endDate">Tanggal Akhir</Label>
    <Input type="date" id="endDate" name="endDate" autocomplete="off" value={data.reservation.endDate.toISOString().split("T")[0]} required />
  </div>
  <Button type="submit">Submit</Button>
</form>
