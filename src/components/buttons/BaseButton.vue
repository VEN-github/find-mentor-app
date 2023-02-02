<template>
  <RouterLink v-if="isLink" :to="link" :class="[mode, `${mode}--${size}`]">
    <slot></slot>
  </RouterLink>
  <button v-else :type="type" :class="[mode, `${mode}--${size}`]">
    <slot></slot>
  </button>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
  props: {
    isLink: {
      type: Boolean,
      default() {
        return false;
      },
    },
    type: {
      type: String,
      default() {
        return "button";
      },
    },
    mode: {
      type: String,
      default() {
        return null;
      },
    },
    size: {
      type: String,
      default() {
        return "md";
      },
      validator: (value) => ["xs", "sm", "md", "lg", "xl"].includes(value),
    },
    link: {
      type: String,
      default() {
        return "/";
      },
    },
  },
};
</script>

<style scoped>
.primary {
  @apply inline-flex justify-center items-center font-medium bg-secondaryBg text-primaryFg shadow-sm transition-opacity duration-500 hover:bg-opacity-75 focus:outline-none;
}

.primary--xs {
  @apply px-2.5 py-1.5 text-xs rounded;
}

.primary--sm {
  @apply px-3 py-2 text-sm leading-4 rounded-md;
}

.primary--md {
  @apply px-4 py-2 text-sm rounded-md;
}

.primary--lg {
  @apply px-4 py-2 text-base rounded-md;
}

.primary--xl {
  @apply px-6 py-3 text-base rounded-md;
}

.secondary {
  @apply inline-flex justify-center items-center font-medium bg-primaryFg bg-opacity-70 text-primaryBg shadow-sm transition-opacity duration-500 hover:bg-opacity-75 focus:outline-none;
}

.secondary--xs {
  @apply px-2.5 py-1.5 text-xs rounded;
}

.secondary--sm {
  @apply px-3 py-2 text-sm leading-4 rounded-md;
}

.secondary--md {
  @apply px-4 py-2 text-sm rounded-md;
}

.secondary--lg {
  @apply px-4 py-2 text-base rounded-md;
}

.secondary--xl {
  @apply px-6 py-3 text-base rounded-md;
}

.outline-primary {
  @apply inline-flex justify-center items-center font-medium text-secondaryBg border border-secondaryBg shadow-sm transition-colors duration-500 hover:bg-secondaryBg hover:text-primaryFg focus:outline-none;
}

.outline-primary--xs {
  @apply px-2.5 py-1.5 text-xs rounded;
}

.outline-primary--sm {
  @apply px-3 py-2 text-sm leading-4 rounded-md;
}

.outline-primary--md {
  @apply px-4 py-2 text-sm rounded-md;
}

.outline-primary--lg {
  @apply px-4 py-2 text-base rounded-md;
}

.outline-primary--xl {
  @apply px-6 py-3 text-base rounded-md;
}
</style>
