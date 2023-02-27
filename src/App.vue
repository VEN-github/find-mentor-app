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

<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { useStore } from "vuex";

import TheHeader from "@/layouts/TheHeader.vue";

const store = useStore();

onMounted(async () => {
  await store.dispatch("loadLoggedUser");
});
</script>
