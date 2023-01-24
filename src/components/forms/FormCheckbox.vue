<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        v-model="model.value"
        type="checkbox"
        class="h-4 w-4 rounded border-secondaryFg text-secondaryBg focus:ring-secondaryBg"
        :class="{
          'border-red': modelValue.isInvalid,
        }"
        :value="item.name"
        @blur="clearValidity(input)"
      />
    </div>
    <div class="ml-3 text-sm">
      <label
        class="font-medium text-primaryFg"
        :class="{ 'text-red': modelValue.isInvalid }"
      >
        {{ item.name }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    input: {
      type: String,
      default() {
        return "";
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
