<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, Input, Label } from "flowbite-svelte";
  import type { PageData } from "./$types"

  export let data: PageData;
</script>

<h1 class="text-center font-bold text-2xl">Edit Pengguna</h1>
<form action="?/update&id={data.userData.id}" method="post" class="mt-4 [&>*]:mt-4" use:enhance>
  <div>
    <Label for="username">Nama Pengguna</Label>
    <Input type="text" id="username" name="username" autocomplete="off" value={data.userData.username} required />
  </div>
  <div>
    <Label for="fullName">Nama Lengkap</Label>
    <Input type="text" id="fullName" name="fullName" autocomplete="off" value={data.userData.fullName} required />
  </div>
  <div>
    <Label for="address">Alamat</Label>
    <Input type="text" id="address" name="address" autocomplete="off" value={data.userData.address} required />
  </div>
  <div>
    <Label for="phoneNumber">No. Hp</Label>
    <Input type="text" id="phoneNumber" name="phoneNumber" autocomplete="off" value={data.userData.phoneNumber} required />
  </div>
  <Button type="submit">Submit</Button>
</form>
