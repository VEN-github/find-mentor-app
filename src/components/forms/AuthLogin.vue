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
const formIsValid = ref(true);

function clearValidity(key) {
  if (key.value.length === 0) return;
  key.isInvalid = false;
}

function validateForm() {
  formIsValid.value = true;

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
}

function submitForm() {
  validateForm();

  if (!formIsValid.value) return;

  const credentials = {
    email: email.value,
    password: password.value,
  };
  emit("submitForm", credentials);
}
</script>
