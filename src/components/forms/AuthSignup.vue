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

<script setup>
import { ref, reactive } from "vue";
import FormInput from "@/components/forms/FormInput.vue";

defineProps({
  isLoading: {
    type: Boolean,
    default() {
      return false;
    },
  },
});

const emit = defineEmits(["submitForm"]);

const firstName = reactive({
  value: "",
  isInvalid: false,
  errorMsg: "",
});
const lastName = reactive({
  value: "",
  isInvalid: false,
  errorMsg: "",
});
const email = reactive({
  value: "",
  isInvalid: false,
  errorMsg: "",
});
const password = reactive({
  value: "",
  isInvalid: false,
  errorMsg: "",
});
const confirmPassword = reactive({
  value: "",
  isInvalid: false,
  errorMsg: "",
});
const formIsValid = ref(true);

function clearValidity(key) {
  if (key.value.length === 0) return;
  key.isInvalid = false;
}

function validateForm() {
  formIsValid.value = true;

  if (firstName.value === "") {
    firstName.isInvalid = true;
    firstName.errorMsg = "Please input first name";
    formIsValid.value = false;
  }
  if (lastName.value === "") {
    lastName.isInvalid = true;
    lastName.errorMsg = "Please input last name";
    formIsValid.value = false;
  }
  if (email.value === "") {
    email.isInvalid = true;
    email.errorMsg = "Please input email address";
    formIsValid.value = false;
  }
  if (password.value === "") {
    password.isInvalid = true;
    password.errorMsg = "Please input password";
    formIsValid.value = false;
  }
  if (password.value != confirmPassword.value) {
    password.isInvalid = true;
    confirmPassword.isInvalid = true;
    password.errorMsg = "Password does not match";
    confirmPassword.errorMsg = "Password does not match";
    formIsValid.value = false;
  }
  if (password.value.length < 8) {
    password.isInvalid = true;
    password.errorMsg = "Password must be at least 8 characters";
    formIsValid.value = false;
  }
  if (password.value === "") {
    password.isInvalid = true;
    password.errorMsg = "Please input password";
    formIsValid.value = false;
  }
  if (confirmPassword.value === "") {
    confirmPassword.isInvalid = true;
    confirmPassword.errorMsg = "Please input confirm password";
    formIsValid.value = false;
  }
}

function submitForm() {
  validateForm();

  if (!formIsValid.value) return;

  const credentials = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };
  emit("submitForm", credentials);
}
</script>
