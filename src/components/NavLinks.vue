<template>
  <ul class="hidden space-x-1 items-center text-primaryFg lg:flex">
    <li>
      <RouterLink
        to="/mentors"
        class="py-2.5 px-4 font-semibold hover:opacity-70"
      >
        Find Mentors
      </RouterLink>
    </li>
    <li>
      <RouterLink
        to="/mentors/create"
        class="py-2.5 px-4 font-semibold hover:opacity-70"
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
          <ul class="divide-y divide-lightGray divide-opacity-40">
            <li>
              <a
                href="#"
                class="block px-4 py-2 text-sm font-medium text-secondaryFg hover:text-primaryFg"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 text-sm font-medium text-secondaryFg hover:text-primaryFg"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 text-sm font-medium text-secondaryFg hover:text-primaryFg"
              >
                Dashboard
              </a>
            </li>
            <li>
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
          class="py-2.5 px-4 font-semibold rounded transition-all hover:bg-primaryFg hover:text-primaryBg hover:shadow hover:opacity-70"
        >
          Login
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/account/create"
          exact-active-class="exact-active"
          class="py-2.5 px-4 font-semibold bg-secondaryBg rounded shadow transition-opacity hover:opacity-80"
        >
          Sign Up
        </RouterLink>
      </li>
    </template>
  </ul>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    loggedUser() {
      return this.$store.getters.getLoggedUser;
    },
    fullName() {
      const user = this.$store.getters.getLoggedUser;
      return `${user.firstName} ${user.lastName}`;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  watch: {
    isOpen(value) {
      if (value) document.addEventListener("click", this.detectClickOutside);
    },
  },
  methods: {
    toggleUserMenu() {
      this.isOpen = !this.isOpen;
    },
    detectClickOutside(event) {
      if (!event.target.closest(".profile")) this.isOpen = false;
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
