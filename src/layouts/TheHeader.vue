<template>
  <header class="w-full mb-8 md:mb-12 md:py-6 xl:mb-16">
    <div class="container flex justify-between items-center mx-auto py-4 px-8">
      <BrandLogo />
      <NavLinks />
      <BurgerButton :is-open="isOpen" @toggle-menu="toggleMenu" />
    </div>
  </header>
</template>

<script>
import BrandLogo from "@/components/BrandLogo.vue";
import NavLinks from "@/components/NavLinks.vue";
import BurgerButton from "@/components/BurgerButton.vue";

export default {
  components: {
    BrandLogo,
    NavLinks,
    BurgerButton,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  watch: {
    isOpen(value) {
      if (value) document.addEventListener("click", this.detectClickOutside);
    },
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    detectClickOutside(event) {
      if (!event.target.closest(".hamburger")) this.isOpen = false;
    },
  },
};
</script>
