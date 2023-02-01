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
        @blur="clearValidity(input)"
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
    id() {
      return this.item.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-");
    },
  },
  methods: {
    clearValidity(key) {
      this.$emit("clearValidity", key);
    },
  },
};
</script>
