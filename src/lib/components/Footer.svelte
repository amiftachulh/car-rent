<script lang="ts">
  import { Footer, FooterCopyright, FooterIcon } from "flowbite-svelte";
  import {
    FacebookSolid,
    LinkedinSolid,
    TwitterSolid,
    YoutubeSolid,
  } from "flowbite-svelte-icons";
</script>

<Footer footerType="socialmedia" class="px-2 sm:px-4">
  <div class="mx-auto container">
    <div class="md:flex md:justify-between">
      <div class="mb-6 md:mb-0">
        <h1 class="font-bold text-lg">JayaRoda</h1>
      </div>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div class="sm:flex sm:items-center sm:justify-between">
      <FooterCopyright href="/" by="JayaRoda" />
      <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
        <FooterIcon href="/">
          <FacebookSolid
            class="w-4 h-4 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
          />
        </FooterIcon>
        <FooterIcon href="/">
          <TwitterSolid
            class="w-4 h-4 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
          />
        </FooterIcon>
        <FooterIcon href="/">
          <LinkedinSolid
            class="w-4 h-4 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
          />
        </FooterIcon>
        <FooterIcon href="/">
          <YoutubeSolid
            class="w-4 h-4 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
          />
        </FooterIcon>
      </div>
    </div>
  </div>
</Footer>
