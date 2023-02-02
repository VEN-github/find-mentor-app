<template>
  <form class="space-y-6" @submit.prevent="submitForm">
    <div>
      <FormInput
        v-model="email"
        label="Email address"
        type="email"
        input="email"
        @clear-validity="clearValidity"
      />
    </div>
    <div>
      <FormInput
        v-model="password"
        label="Password"
        input="password"
        @clear-validity="clearValidity"
      />
    </div>
    <div>
      <BaseButton
        type="submit"
        mode="primary"
        class="w-full"
        :class="{ 'gap-2': isLoading }"
      >
        <Icon v-if="isLoading" icon="gg:spinner" class="text-sm animate-spin" />
        {{ isLoading ? "Loading" : "Login" }}
      </BaseButton>
    </div>
  </form>
</template>

<script>
import FormInput from "@/components/forms/FormInput.vue";

export default {
  components: {
    FormInput,
  },
  props: {
    isLoading: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  emits: ["submitForm"],
  data() {
    return {
      email: {
        value: "",
        isInvalid: false,
        errorMsg: "",
      },
      password: {
        value: "",
        isInvalid: false,
        errorMsg: "",
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(key) {
      if (this[key].value.length === 0) return;
      this[key].isInvalid = false;
    },
    validateForm() {
      const { email, password } = this;

      this.formIsValid = true;

      if (email.value === "") {
        email.isInvalid = true;
        email.errorMsg = "Please input email address";
        this.formIsValid = false;
      }

      if (password.value === "") {
        password.isInvalid = true;
        password.errorMsg = "Please input password";
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) return;

      const credentials = {
        email: this.email.value,
        password: this.password.value,
      };
      this.$emit("submitForm", credentials);
    },
  },
};
</script>
