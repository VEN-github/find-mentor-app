<template>
  <section>
    <AlertMessage :error-msg="errorMsg" />
    <div class="container mx-auto px-8">
      <div
        class="flex justify-center flex-col min-h-full py-12 sm:px-6 lg:px-8"
      >
        <div class="sm:w-full sm:max-w-md sm:mx-auto">
          <h2
            class="mt-6 text-3xl font-bold text-center tracking-tight text-primaryFg"
          >
            {{ caption.header }}
          </h2>
          <p class="mt-2 text-sm text-center text-secondaryFg">
            {{ caption.subHeader }}
            <RouterLink
              :to="caption.link"
              class="font-medium text-secondaryBg hover:text-opacity-40"
            >
              {{ caption.textLink }}
            </RouterLink>
          </p>
        </div>
        <div class="mt-8 sm:w-full sm:max-w-md sm:mx-auto">
          <div class="py-8 px-4 bg-white shadow sm:px-10 sm:rounded-lg">
            <Component
              :is="currentAuth"
              :is-loading="isLoading"
              @submit-form="submitForm"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { RouterLink } from "vue-router";

import AlertMessage from "@/components/AlertMessage.vue";
import AuthLogin from "@/components/forms/AuthLogin.vue";
import AuthSignup from "@/components/forms/AuthSignup.vue";

export default {
  components: {
    RouterLink,
    AlertMessage,
    AuthLogin,
    AuthSignup,
  },
  data() {
    return {
      currentAuth: null,
      caption: {
        header: null,
        subHeader: null,
        link: null,
        textLink: null,
      },
      isLoading: false,
      errorMsg: null,
    };
  },
  watch: {
    $route({ path }) {
      this.switchAuthMode(path);
    },
  },
  created() {
    this.switchAuthMode(this.$route.path);
  },
  methods: {
    switchAuthMode(path) {
      if (path === "/login") {
        this.currentAuth = "auth-login";
        this.caption.header = "Login to your account";
        this.caption.subHeader = "Don't have an account?";
        this.caption.link = "/account/create";
        this.caption.textLink = "Sign Up";
      } else {
        this.currentAuth = "auth-signup";
        this.caption.header = "Create your free account";
        this.caption.subHeader = "Already have an account?";
        this.caption.link = "/login";
        this.caption.textLink = "Login";
      }
    },
    showErrorMessage(error) {
      this.errorMsg = error;

      setTimeout(() => {
        this.errorMsg = null;
      }, 5000);
    },
    async submitForm(credentials) {
      try {
        if (this.currentAuth === "auth-signup") {
          this.isLoading = true;
          await this.$store.dispatch("signup", credentials);
          this.isLoading = false;
        } else {
          this.isLoading = true;
          await this.$store.dispatch("login", credentials);
          this.isLoading = false;
        }
        const redirectUrl =
          this.$route.query.mentor != undefined
            ? `/mentor/${this.$route.query.mentor}`
            : "/";
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.showErrorMessage(error.message);
        this.isLoading = false;
      }
    },
  },
};
</script>
