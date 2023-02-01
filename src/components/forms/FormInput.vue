<template>
  <label
    class="block text-sm font-medium"
    :class="modelValue.isInvalid ? 'text-red' : 'text-primaryFg'"
  >
    {{ label }}
  </label>
  <input
    v-if="type === 'number'"
    v-model.number="model.value"
    type="text"
    class="block w-full mt-1 text-primaryFg rounded-md shadow-sm sm:text-sm"
    :class="
      modelValue.isInvalid
        ? 'border-red focus:ring-red focus:border-red'
        : 'border-secondaryFg focus:border-secondaryBg focus:ring-secondaryBg'
    "
    @blur="clearValidity(input)"
  />
  <div
    v-else-if="input === 'password' || input === 'confirmPassword'"
    class="relative"
  >
    <input
      v-model.trim="model.value"
      :type="isShow ? 'text' : 'password'"
      class="block w-full mt-1 pr-10 text-primaryFg rounded-md shadow-sm sm:text-sm"
      :class="
        modelValue.isInvalid
          ? 'border-red focus:ring-red focus:border-red'
          : 'border-secondaryFg focus:border-secondaryBg focus:ring-secondaryBg'
      "
      @blur="clearValidity(input)"
    />
    <div
      class="absolute inset-y-0 right-0 flex items-center mr-3 cursor-pointer"
      @click="showPassword"
    >
      <Icon v-if="!isShow" icon="ri:eye-off-line" class="text-secondaryFg" />
      <Icon v-else icon="ri:eye-line" class="text-secondaryFg" />
    </div>
  </div>
  <input
    v-else
    v-model.trim="model.value"
    :type="type"
    class="block w-full mt-1 text-primaryFg rounded-md shadow-sm sm:text-sm"
    :class="
      modelValue.isInvalid
        ? 'border-red focus:ring-red focus:border-red'
        : 'border-secondaryFg focus:border-secondaryBg focus:ring-secondaryBg'
    "
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
  data() {
    return {
      isShow: false,
    };
  },
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
    showPassword() {
      this.isShow = !this.isShow;
    },
  },
};
</script>
