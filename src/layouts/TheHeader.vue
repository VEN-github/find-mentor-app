<template>
  <header class="w-full md:py-6">
    <div class="container flex justify-between items-center mx-auto py-4 px-8">
      <BrandLogo />
      <NavLinks />
      <BurgerButton :is-open="isOpen" @toggle-menu="toggleMenu" />
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from "vue";

import BrandLogo from "@/components/BrandLogo.vue";
import NavLinks from "@/components/NavLinks.vue";
import BurgerButton from "@/components/BurgerButton.vue";

const isOpen = ref(false);

watch(isOpen, (value) => {
  if (value) document.addEventListener("click", detectClickOutside);
});

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function detectClickOutside(event) {
  if (!event.target.closest(".hamburger")) isOpen.value = false;
}
</script>
