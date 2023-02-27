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
              :is="currentAuth === 'auth-login' ? AuthLogin : AuthSignup"
              :is-loading="isLoading"
              @submit-form="submitForm"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref, reactive, watch, onMounted } from "vue";
import { useStore } from "vuex";

import AlertMessage from "@/components/AlertMessage.vue";
import AuthLogin from "@/components/forms/AuthLogin.vue";
import AuthSignup from "@/components/forms/AuthSignup.vue";

const currentAuth = ref(null);
const caption = reactive({
  header: null,
  subHeader: null,
  link: "/",
  textLink: null,
});
const isLoading = ref(false);
const errorMsg = ref(null);
const route = useRoute();
const router = useRouter();
const store = useStore();

watch(route, ({ path }) => {
  switchAuthMode(path);
});

onMounted(async () => {
  await switchAuthMode(route.path);
});

async function switchAuthMode(path) {
  if (path === "/login") {
    currentAuth.value = "auth-login";
    caption.header = "Login to your account";
    caption.subHeader = "Don't have an account?";
    caption.link = "/account/create";
    caption.textLink = "Sign Up";
  } else {
    currentAuth.value = "auth-signup";
    caption.header = "Create your free account";
    caption.subHeader = "Already have an account?";
    caption.link = "/login";
    caption.textLink = "Login";
  }
}

function showErrorMessage(error) {
  errorMsg.value = error;

  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}

async function submitForm(credentials) {
  try {
    if (currentAuth.value === "auth-signup") {
      isLoading.value = true;
      await store.dispatch("signup", credentials);
      isLoading.value = false;
      router.replace("/login");
    } else {
      isLoading.value = true;
      await store.dispatch("login", credentials);
      isLoading.value = false;
      const redirectUrl =
        route.query.mentor != undefined ? `/mentor/${route.query.mentor}` : "/";
      router.replace(redirectUrl);
    }
  } catch (error) {
    showErrorMessage(error.message);
    isLoading.value = false;
  }
}
</script>
