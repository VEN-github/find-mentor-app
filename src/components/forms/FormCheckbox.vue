<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="id"
        v-model="model.value"
        type="checkbox"
        class="h-4 w-4 rounded text-secondaryBg focus:ring-secondaryBg"
        :class="modelValue.isInvalid ? 'border-red' : 'border-secondaryFg'"
        :value="item.name"
        @blur="clearValidity(model)"
      />
    </div>
    <div class="ml-3 text-sm">
      <label
        :for="id"
        class="font-medium"
        :class="modelValue.isInvalid ? 'text-red' : ' text-primaryFg'"
      >
        {{ item.name }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default() {
      return {};
    },
  },
  input: {
    type: String,
    default() {
      return null;
    },
  },
  modelValue: {
    type: Object,
    default() {
      return {};
    },
  },
});
const emit = defineEmits(["update:modelValue", "clearValidity"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const id = computed(() => {
  return props.item.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
});

function clearValidity(key) {
  emit("clearValidity", key);
}
</script>
