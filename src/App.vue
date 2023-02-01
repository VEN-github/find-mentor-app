<template>
  <TheHeader />
  <main>
    <RouterView #default="slotProps">
      <Transition name="route" mode="out-in">
        <Component :is="slotProps.Component" />
      </Transition>
    </RouterView>
  </main>
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
