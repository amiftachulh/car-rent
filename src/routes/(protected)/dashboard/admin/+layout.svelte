<script>
  import { page } from '$app/stores';
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
  import { ChartPieSolid, GridSolid, UserSolid, LabelSolid, EnvelopeSolid, PenSolid } from 'flowbite-svelte-icons';
  let spanClass = 'flex-1 ml-3 whitespace-nowrap';
  $: activeUrl = $page.url.pathname;
</script>

<div class="px-2 sm:px-4 py-4">
  <div class="mx-auto container flex justify-between gap-4">
    <Sidebar {activeUrl} class="self-start">
      <SidebarWrapper>
        <SidebarGroup>
          <SidebarItem label="Dashboard" href="/dashboard/admin">
            <svelte:fragment slot="icon">
              <ChartPieSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Pengguna" href="/dashboard/admin/users">
            <svelte:fragment slot="icon">
              <UserSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Seri Mobil" href="/dashboard/admin/car-models">
            <svelte:fragment slot="icon">
              <LabelSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Mobil" href="/dashboard/admin/cars">
            <svelte:fragment slot="icon">
              <GridSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Pesanan" href="/dashboard/admin/reservation">
            <svelte:fragment slot="icon">
              <EnvelopeSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Pengembalian" href="/dashboard/admin/return-list">
            <svelte:fragment slot="icon">
              <PenSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>

    <div class="bg-gray-50 flex-1 p-4 overflow-auto">
      <slot />
    </div>

  </div>
</div>
