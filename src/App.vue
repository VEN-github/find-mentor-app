<template>
  <TheHeader />
  <main><RouterView /></main>
</template>

<script>
import { RouterView } from "vue-router";

import TheHeader from "@/layouts/TheHeader.vue";

export default {
  components: {
    TheHeader,
    RouterView,
  },
};
</script>
