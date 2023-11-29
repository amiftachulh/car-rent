<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import Footer from "$lib/components/Footer.svelte";
  import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, NavBrand, Navbar } from "flowbite-svelte";

  function handleLogout() {
    document.forms[0].submit();
  }
</script>

<svelte:head>
  <title>JayaRoda</title>
</svelte:head>

<Navbar>
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      JayaRoda
    </span>
  </NavBrand>
  <div class="flex md:order-2">
    {#if !$page.data.user}
      <Button href="/login" size="sm">Masuk</Button>
    {:else}
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

<div class="px-2 sm:px-4 py-8">
  <div class="mx-auto lg:flex lg:gap-8 container">
    <div class="flex-1">
      <h1 class="font-bold text-2xl text-center lg:text-3xl lg:text-left">
        JayaRoda - Mitra Sewa Mobil Anda yang Terpercaya
      </h1>
      <p class="mt-4 text-gray-600 text-center lg:text-left">
        JayaRoda adalah pilihan sempurna untuk kebutuhan mobilitas Anda,
        menyediakan solusi persewaan mobil yang nyaman dan andal yang
        disesuaikan dengan kebutuhan Anda. Tim profesional kami menawarkan
        layanan yang luar biasa, bersama dengan harga yang kompetitif,
        memastikan pengalaman sewa yang lancar dan memuaskan bagi pelanggan
        kami.
      </p>
    </div>
    <div class="mt-4 w-5/12 lg:mt-0">
      <img
        src="https://10web-site.ai/22/wp-content/uploads/sites/24/2023/11/georgie-cobbs-bKjHgo_Lbpo-unsplash_XVmzgMHm.webp"
        alt="Sewa Mobil"
        class="rounded"
      />
    </div>
  </div>
</div>

<div class="px-2 sm:px-4 py-8">
  <div class="mx-auto container">
    <h2 class="font-bold text-xl text-center lg:text-3xl lg:text-left">
      Layanan Kami
    </h2>
    <div class="flex flex-col gap-8 mt-4 lg:flex-row">
      <div class="flex-1">
        <img
          src="https://10web-site.ai/22/wp-content/uploads/sites/24/2023/11/sam-balye-fjTJ_Q0Pwkg-unsplash_XVmzgMHm.webp"
          alt="Sewa Mobil"
        />
        <h3 class="py-2 font-bold text-lg">Sewa Mobil</h3>
        <p class="text-gray-600">
          Dapatkan tujuan yang Anda inginkan dengan layanan penyewaan mobil kami
          yang bebas repot dan andal, mulai dari mobil ekonomi hingga mobil
          mewah.
        </p>
      </div>
      <div class="flex-1">
        <img
          src="https://10web-site.ai/22/wp-content/uploads/sites/24/2023/11/evelyn-paris-QR_vT8_hBZM-unsplash_XVmzgMHm.webp"
          alt="Harga yang Kompetitif"
        />
        <h3 class="py-2 font-bold text-lg">Harga yang Kompetitif</h3>
        <p class="text-gray-600">
          Kami menawarkan opsi harga yang kompetitif untuk memastikan Anda
          mendapatkan nilai terbaik untuk uang Anda, tanpa mengurangi kualitas.
        </p>
      </div>
      <div class="flex-1">
        <img
          src="https://10web-site.ai/22/wp-content/uploads/sites/24/2023/11/soroush-karimi-crjPrExvShc-unsplash_XVmzgMHm.webp"
          alt="Transportasi Premium"
        />
        <h3 class="py-2 font-bold text-lg">Transportasi Premium</h3>
        <p class="text-gray-600">
          Rasakan kemewahan dan kenyamanan dengan layanan transportasi premium
          kami, termasuk sedan mewah, SUV, dan limusin.
        </p>
      </div>
    </div>
  </div>
</div>

<Footer />
