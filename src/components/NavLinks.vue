<template>
  <ul class="hidden space-x-1 items-center text-primaryFg lg:flex">
    <li>
      <RouterLink
        to="/mentors"
        class="py-2.5 px-4 font-semibold hover:opacity-70"
      >
        Find Mentors
      </RouterLink>
    </li>
    <li>
      <RouterLink
        to="/mentors/create"
        class="py-2.5 px-4 font-semibold hover:opacity-70"
      >
        Become a Mentor
      </RouterLink>
    </li>
    <li>
      <a href="#" class="py-2.5 px-4 font-semibold hover:opacity-70">
        Request
      </a>
    </li>
    <li>
      <a
        href="#"
        class="py-2.5 px-4 font-semibold rounded transition-all hover:bg-primaryFg hover:text-primaryBg hover:shadow hover:opacity-70"
      >
        Login
      </a>
    </li>
    <li>
      <a
        href="#"
        class="py-2.5 px-4 font-semibold bg-secondaryBg rounded shadow transition-opacity hover:opacity-80"
      >
        Sign Up
      </a>
    </li>
  </ul>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
};
</script>
