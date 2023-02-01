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
                    class="block text-sm font-medium text-primaryFg"
                    :class="{ 'text-red': about.isInvalid }"
                  >
                    About*
                  </label>
                  <div class="mt-1">
                    <textarea
                      id="about"
                      v-model.trim="about.value"
                      rows="3"
                      class="block w-full mt-1 text-primaryFg rounded-md border-secondaryFg shadow-sm focus:border-secondaryBg focus:ring-secondaryBg sm:text-sm"
                      :class="{
                        'border-red focus:ring-red focus:border-red':
                          about.isInvalid,
                      }"
                      @blur="clearValidity('about')"
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
                  class="text-base font-medium text-primaryFg"
                  :class="{ 'text-red': expertise.isInvalid }"
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
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 text-sm font-medium bg-secondaryBg text-primaryFg border rounded-md border-secondaryBg shadow-sm transition duration-100 hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-secondaryBg focus:ring-offset-2"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import AlertMessage from "@/components/AlertMessage.vue";
import FormInput from "@/components/forms/FormInput.vue";
import FormCheckbox from "@/components/forms/FormCheckbox.vue";

export default {
  components: {
    AlertMessage,
    FormInput,
    FormCheckbox,
  },
  beforeRouteLeave(_, _2, next) {
    const { firstName, lastName, email, about, rate, expertise } = this;
    if (
      firstName.value === "" &&
      lastName.value === "" &&
      email.value === "" &&
      about.value === "" &&
      rate.value === "" &&
      expertise.value.length === 0
    ) {
      next();
    } else if (this.changesSaved) {
      next();
    } else {
      const response = confirm(
        "Are you sure you want to leave this page?\n\nYou have unsaved changes. If you leave the page, these changes will be lost"
      );
      next(response);
    }
  },
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
      about: {
        value: "",
        isInvalid: false,
        errorMsg: "",
      },
      rate: {
        value: "",
        isInvalid: false,
        errorMsg: "",
      },
      expertise: {
        value: [],
        isInvalid: false,
      },
      formIsValid: true,
      errorMsg: null,
    };
  },
  computed: {
    expertiseList() {
      return this.$store.getters["mentors/getExpertiseList"];
    },
    changesSaved() {
      return this.$store.getters["mentors/changesSaved"];
    },
    slug() {
      const string = `${this.firstName.value} ${this.lastName.value}`;
      return string
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
      if (this[key].value.length === 0) return;
      this[key].isInvalid = false;
    },
    validateForm() {
      const { firstName, lastName, email, about, rate, expertise } = this;

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
      if (about.value === "") {
        about.isInvalid = true;
        this.formIsValid = false;
      }
      if (isNaN(rate.value) || rate.value <= 0) {
        rate.isInvalid = true;
        rate.errorMsg = "Hourly rate must be a number and greater than zero";
        this.formIsValid = false;
      }
      if (rate.value === "") {
        rate.isInvalid = true;
        rate.errorMsg = "Please input hourly rate";
        this.formIsValid = false;
      }
      if (expertise.value.length === 0) {
        expertise.isInvalid = true;
        this.formIsValid = false;
      }
    },
    showErrorMessage(error) {
      this.errorMsg = error;

      setTimeout(() => {
        this.errorMsg = null;
      }, 5000);
    },
    async addMentor() {
      this.validateForm();

      if (!this.formIsValid) return;

      const { firstName, lastName, email, about, rate, expertise } = this;
      const formData = {
        id: Date.now(),
        slug: this.slug,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        about: about.value,
        rate: rate.value,
        expertise: expertise.value,
      };
      try {
        await this.$store.dispatch("mentors/registerMentor", formData);
      } catch (error) {
        this.showErrorMessage(error.message);
      }
    },
  },
};
</script>
