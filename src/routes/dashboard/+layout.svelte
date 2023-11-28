<script lang="ts">
  import { Button, NavBrand, Navbar } from "flowbite-svelte";
</script>

<Navbar>
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">JayaRoda</span>
  </NavBrand>
  <div class="flex md:order-2">
    <a href="/login">
      <Button size="sm">Masuk</Button>
    </a>
  </div>
</Navbar>

<slot />
