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

import TheHeader from "@/layouts/TheHeader.vue";
</script>
