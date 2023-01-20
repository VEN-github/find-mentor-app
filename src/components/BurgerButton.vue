<template>
  <button
    type="button"
    class="hamburger hamburger--squeeze lg:hidden"
    :class="{ 'is-active': isOpen }"
    @click="$emit('toggleMenu')"
  >
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
    },
  },
  emits: ["toggleMenu"],
};
</script>
