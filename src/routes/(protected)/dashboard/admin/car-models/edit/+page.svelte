<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, Input, Label } from "flowbite-svelte";
  import type { PageData } from "./$types"

  export let data: PageData;
</script>

<h1 class="text-center font-bold text-2xl">Edit Seri Mobil</h1>
<form action="?/update&id={data.carModel.id}" method="post" class="mt-4 [&>*]:mt-4" use:enhance>
  <div>
    <Label for="name">Nama</Label>
    <Input type="text" id="name" name="name" autocomplete="off" value={data.carModel.name} required />
  </div>
  <div>
    <Label for="costPerDay">Sewa per Hari</Label>
    <Input type="text" id="costPerDay" name="costPerDay" autocomplete="off" value={data.carModel.costPerDay} required />
  </div>
  <div>
    <Label for="imageUrl">URL Gambar</Label>
    <Input type="text" id="imageUrl" name="imageUrl" autocomplete="off" value={data.carModel.imageUrl} required />
  </div>
  <Button type="submit">Submit</Button>
</form>
