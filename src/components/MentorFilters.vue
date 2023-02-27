<template>
  <li
    class="w-full border-b border-lightGray sm:border-b-0 last:border-none sm:border-r"
  >
    <div class="flex items-center pl-3">
      <input
        :id="id"
        v-model="model"
        type="checkbox"
        :value="filter.name"
        class="w-4 h-4 bg-white bg-opacity-40 text-secondaryBg border-lightGray rounded focus:ring-2 focus:ring-secondaryBg"
      />
      <label
        :for="id"
        class="w-full mx-2 py-3 text-xs font-medium text-primaryFg md:text-sm"
      >
        {{ filter.name }}
      </label>
    </div>
  </li>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  filter: {
    type: Object,
    default() {
      return {};
    },
  },
  modelValue: {
    type: Array,
    default() {
      return [];
    },
  },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const id = computed(() => {
  return props.filter.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
});
</script>
