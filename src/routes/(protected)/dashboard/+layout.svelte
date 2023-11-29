<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { Avatar, Dropdown, DropdownDivider, DropdownItem, NavBrand, Navbar } from "flowbite-svelte";

  function handleLogout() {
    document.forms[0].submit();
  }
</script>

<Navbar>
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">JayaRoda</span>
  </NavBrand>
  <div class="flex md:order-2">
    {#if $page.data.user}
      <div id="user" class="flex justify-center items-center gap-4 cursor-pointer">
        <span class="font-bold">{$page.data.user.fullName}</span>
        <Avatar border />
      </div>
      <Dropdown triggeredBy="#user">
        {#if $page.data.user.role === 1}
          <DropdownItem href="/dashboard/admin">Dashboard</DropdownItem>
        {:else}
          <DropdownItem href="/dashboard">Dashboard</DropdownItem>
          <DropdownItem href="/dashboard/reservation">Pesanan</DropdownItem>
        {/if}
        <DropdownDivider />
        <form class="hidden" action="/logout" method="post" use:enhance></form>
        <DropdownItem on:click={handleLogout}>Keluar</DropdownItem>
      </Dropdown>
    {/if}
  </div>
</Navbar>

<slot />
