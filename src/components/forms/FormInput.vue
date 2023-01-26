<template>
  <label
    class="block text-sm font-medium text-primaryFg"
    :class="{ 'text-red': modelValue.isInvalid }"
  >
    {{ label }}
  </label>
  <input
    v-if="type === 'number'"
    v-model.number="model.value"
    type="text"
    class="block w-full mt-1 text-primaryFg rounded-md border-secondaryFg shadow-sm focus:border-secondaryBg focus:ring-secondaryBg sm:text-sm"
    :class="{
      'border-red focus:ring-red focus:border-red': modelValue.isInvalid,
    }"
    @blur="clearValidity(input)"
  />
  <input
    v-else
    v-model.trim="model.value"
    :type="type"
    class="block w-full mt-1 text-primaryFg rounded-md border-secondaryFg shadow-sm focus:border-secondaryBg focus:ring-secondaryBg sm:text-sm"
    :class="{
      'border-red focus:ring-red focus:border-red': modelValue.isInvalid,
    }"
    @blur="clearValidity(input)"
  />
  <p v-if="modelValue.isInvalid" class="mt-2 text-sm text-red">
    {{ modelValue.errorMsg }}
  </p>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default() {
        return null;
      },
    },
    type: {
      type: String,
      default() {
        return null;
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
  },
  emits: ["update:modelValue", "clearValidity"],
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    clearValidity(key) {
      this.$emit("clearValidity", key);
    },
  },
};
</script>
