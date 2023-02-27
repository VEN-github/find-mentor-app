<template>
  <ul class="hidden space-x-1 items-center text-primaryFg lg:flex">
    <li>
      <RouterLink
        to="/mentors"
        class="py-2.5 px-4 font-medium hover:opacity-70"
      >
        Find Mentors
      </RouterLink>
    </li>
    <li>
      <RouterLink
        to="/mentors/create"
        class="py-2.5 px-4 font-medium hover:opacity-70"
      >
        Become a Mentor
      </RouterLink>
    </li>
    <li v-if="isAuthenticated">
      <RouterLink
        to="/requests"
        class="py-2.5 px-4 font-semibold hover:opacity-70"
      >
        Request
      </RouterLink>
    </li>
    <li v-if="isAuthenticated">
      <div class="relative profile">
        <button
          type="button"
          class="flex items-center gap-2 pl-4 text-sm font-semibold text-primaryFg border-l-2 border-l-lightGray hover:opacity-70 md:text-base"
          @click="toggleUserMenu"
        >
          {{ fullName }}
          <Icon icon="material-symbols:arrow-drop-down" class="md:text-lg" />
        </button>
        <div
          class="absolute z-50 w-40 my-4 text-base bg-white rounded-lg shadow-lg"
          :class="{ hidden: !isOpen }"
        >
          <ul>
            <li>
              <a
                href="#"
                class="block px-4 py-2 text-sm font-medium text-secondaryFg hover:text-primaryFg"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 text-sm font-medium text-secondaryFg hover:text-primaryFg"
              >
                Favorites
              </a>
            </li>
            <li class="border-t border-t-lightGray border-opacity-40">
              <button
                type="button"
                class="block px-4 py-2 text-sm font-medium text-secondaryFg hover:text-primaryFg"
                @click="logout"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </li>
    <template v-else>
      <li>
        <RouterLink
          to="/login"
          class="py-2.5 px-4 font-medium rounded transition-all hover:bg-primaryFg hover:text-primaryBg hover:shadow hover:opacity-70"
        >
          Login
        </RouterLink>
      </li>
      <li>
        <BaseButton
          is-link
          link="/account/create"
          mode="primary"
          size="lg"
          exact-active-class="exact-active"
        >
          Sign Up
        </BaseButton>
      </li>
    </template>
  </ul>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

const isOpen = ref(false);
const store = useStore();

// const loggedUser = computed(() => {
//   return store.getters.getLoggedUser;
// });

const fullName = computed(() => {
  const user = store.getters.getLoggedUser;
  return `${user.firstName} ${user.lastName}`;
});

const isAuthenticated = computed(() => {
  return store.getters.isAuthenticated;
});

watch(isOpen, (value) => {
  if (value) document.addEventListener("click", detectClickOutside);
});

function toggleUserMenu() {
  isOpen.value = !isOpen.value;
}

function detectClickOutside(event) {
  if (!event.target.closest(".profile")) isOpen.value = false;
}

function logout() {
  store.dispatch("logout");
}
</script>
