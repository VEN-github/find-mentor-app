<template>
  <section>
    <div
      class="absolute top-1/2 left-1/2 container mx-auto px-8 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div class="sm:flex sm:justify-center">
        <p
          class="text-4xl font-bold tracking-tight text-secondaryBg sm:text-5xl"
        >
          404
        </p>
        <div class="sm:ml-6">
          <div class="sm:border-l sm:pl-6 sm:border-secondaryFg">
            <h1
              class="text-4xl font-bold tracking-tight text-primaryFg sm:text-5xl"
            >
              Page not found
            </h1>
            <p class="mt-1 text-base text-secondaryFg">
              Please check the URL in the address bar and try again.
            </p>
          </div>
          <div class="flex space-x-3 mt-10 sm:pl-6">
            <RouterLink
              to="/"
              class="inline-flex items-center px-4 py-2 text-sm font-medium bg-secondaryBg text-primaryFg rounded-md shadow transition duration-300 hover:bg-opacity-75"
            >
              Back to homepage
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
};
</script>
