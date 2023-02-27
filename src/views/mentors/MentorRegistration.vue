<template>
  <section class="mt-8">
    <AlertMessage :error-msg="errorMsg" />
    <div class="container mx-auto px-8 pb-8">
      <h1 class="mb-8 text-3xl font-medium text-primaryFg">
        Register as a mentor now!
      </h1>
      <form class="space-y-6" @submit.prevent="addMentor">
        <div class="px-4 py-5 bg-white shadow sm:p-6 sm:rounded-lg">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <h3 class="text-lg font-medium leading-6 text-primaryFg">
                Profile
              </h3>
              <p class="mt-1 text-sm text-secondaryFg">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            <div class="mt-5 md:col-span-2 md:mt-0">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <FormInput
                    v-model="firstName"
                    label="First name*"
                    type="text"
                    input="firstName"
                    @clear-validity="clearValidity"
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <FormInput
                    v-model="lastName"
                    label="Last name*"
                    type="text"
                    input="lastName"
                    @clear-validity="clearValidity"
                  />
                </div>
                <div class="col-span-6">
                  <FormInput
                    v-model="email"
                    label="Email address*"
                    type="email"
                    input="email"
                    @clear-validity="clearValidity"
                  />
                </div>
                <div class="col-span-6">
                  <label
                    for="about"
                    class="block text-sm font-medium"
                    :class="about.isInvalid ? 'text-red' : 'text-primaryFg'"
                  >
                    About*
                  </label>
                  <div class="mt-1">
                    <textarea
                      id="about"
                      v-model.trim="about.value"
                      rows="3"
                      class="block w-full mt-1 text-primaryFg rounded-md shadow-sm sm:text-sm"
                      :class="
                        about.isInvalid
                          ? 'border-red focus:ring-red focus:border-red'
                          : 'border-secondaryFg focus:border-secondaryBg focus:ring-secondaryBg'
                      "
                      @blur="clearValidity(about)"
                    ></textarea>
                  </div>
                  <p v-if="about.isInvalid" class="mt-2 text-sm text-red">
                    Please input about
                  </p>
                  <p v-else class="mt-2 text-sm text-secondaryFg">
                    Brief description for your profile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-5 bg-white shadow sm:p-6 sm:rounded-lg">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <h3 class="text-lg font-medium leading-6 text-primaryFg">
                Expertise
              </h3>
              <p class="mt-1 text-sm text-secondaryFg">
                Provide basic information about the expertise.
              </p>
            </div>
            <div class="mt-5 space-y-6 md:col-span-2 md:mt-0">
              <div class="col-span-6 sm:col-span-4">
                <FormInput
                  v-model="rate"
                  label="Hourly Rate*"
                  type="number"
                  input="rate"
                  @clear-validity="clearValidity"
                />
              </div>
              <fieldset>
                <legend class="sr-only">Areas of Expertise</legend>
                <div
                  class="text-base font-medium"
                  :class="expertise.isInvalid ? 'text-red' : 'text-primaryFg'"
                  aria-hidden="true"
                >
                  Areas of Expertise*
                </div>
                <div class="mt-4 space-y-4">
                  <FormCheckbox
                    v-for="item in expertiseList"
                    :key="item.id"
                    v-model="expertise"
                    :item="item"
                    input="expertise"
                    @clear-validity="clearValidity"
                  />
                  <p v-if="expertise.isInvalid" class="mt-2 text-sm text-red">
                    Please select at least one expertise
                  </p>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <BaseButton type="submit" mode="primary">Register</BaseButton>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useStore } from "vuex";

import AlertMessage from "@/components/AlertMessage.vue";
import FormInput from "@/components/forms/FormInput.vue";
import FormCheckbox from "@/components/forms/FormCheckbox.vue";

onBeforeRouteLeave((_, _2, next) => {
  if (
    firstName.value === "" &&
    lastName.value === "" &&
    email.value === "" &&
    about.value === "" &&
    rate.value === "" &&
    expertise.value.length === 0
  ) {
    next();
  } else if (changesSaved.value) {
    next();
  } else {
    const response = confirm(
      "Are you sure you want to leave this page?\n\nYou have unsaved changes. If you leave the page, these changes will be lost"
    );
    next(response);
  }
});

const store = useStore();
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
const about = reactive({
  value: "",
  isInvalid: false,
  errorMsg: "",
});
const rate = reactive({
  value: "",
  isInvalid: false,
  errorMsg: "",
});
const expertise = reactive({
  value: [],
  isInvalid: false,
});
const formIsValid = ref(true);
const errorMsg = ref(null);

const expertiseList = computed(() => {
  return store.getters["mentors/getExpertiseList"];
});

const changesSaved = computed(() => {
  return store.getters["mentors/changesSaved"];
});

const slug = computed(() => {
  const string = `${firstName.value} ${lastName.value}`;
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
});

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
  if (about.value === "") {
    about.isInvalid = true;
    formIsValid.value = false;
  }
  if (isNaN(rate.value) || rate.value <= 0) {
    rate.isInvalid = true;
    rate.errorMsg = "Hourly rate must be a number and greater than zero";
    formIsValid.value = false;
  }
  if (rate.value === "") {
    rate.isInvalid = true;
    rate.errorMsg = "Please input hourly rate";
    formIsValid.value = false;
  }
  if (expertise.value.length === 0) {
    expertise.isInvalid = true;
    formIsValid.value = false;
  }
}

function showErrorMessage(error) {
  errorMsg.value = error;

  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}

async function addMentor() {
  validateForm();

  if (!formIsValid.value) return;

  const formData = {
    id: Date.now(),
    slug: slug.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    about: about.value,
    rate: rate.value,
    expertise: expertise.value,
  };
  try {
    await store.dispatch("mentors/registerMentor", formData);
  } catch (error) {
    showErrorMessage(error.message);
  }
}
</script>
