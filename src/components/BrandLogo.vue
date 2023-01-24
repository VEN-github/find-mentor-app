<template>
  <RouterLink to="/">
    <img src="@/assets/images/logo.svg" alt="Brand Logo" />
  </RouterLink>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
};
</script>
