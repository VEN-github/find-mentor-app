<template>
  <form class="space-y-6" @submit.prevent="submitForm">
    <div>
      <FormInput
        v-model="firstName"
        label="First name"
        type="text"
        input="firstName"
        @clear-validity="clearValidity"
      />
    </div>
    <div>
      <FormInput
        v-model="lastName"
        label="Last name"
        type="text"
        input="lastName"
        @clear-validity="clearValidity"
      />
    </div>
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
      <FormInput
        v-model="confirmPassword"
        label="Confirm password"
        type="password"
        input="confirmPassword"
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
        {{ isLoading ? "Loading" : "Sign Up" }}
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
      firstName: {
        value: "",
        isInvalid: false,
        errorMsg: "",
      },
      lastName: {
        value: "",
        isInvalid: false,
        errorMsg: "",
      },
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
      confirmPassword: {
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
      const { firstName, lastName, email, password, confirmPassword } = this;

      this.formIsValid = true;

      if (firstName.value === "") {
        firstName.isInvalid = true;
        firstName.errorMsg = "Please input first name";
        this.formIsValid = false;
      }
      if (lastName.value === "") {
        lastName.isInvalid = true;
        lastName.errorMsg = "Please input last name";
        this.formIsValid = false;
      }
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
      if (password.value != confirmPassword.value) {
        password.isInvalid = true;
        confirmPassword.isInvalid = true;
        password.errorMsg = "Password does not match";
        confirmPassword.errorMsg = "Password does not match";
        this.formIsValid = false;
      }
      if (password.value.length < 8) {
        password.isInvalid = true;
        password.errorMsg = "Password must be at least 8 characters";
        this.formIsValid = false;
      }
      if (password.value === "") {
        password.isInvalid = true;
        password.errorMsg = "Please input password";
        this.formIsValid = false;
      }
      if (confirmPassword.value === "") {
        confirmPassword.isInvalid = true;
        confirmPassword.errorMsg = "Please input confirm password";
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) return;

      const credentials = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        password: this.password.value,
      };
      this.$emit("submitForm", credentials);
    },
  },
};
</script>
