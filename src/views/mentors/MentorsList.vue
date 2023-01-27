<template>
  <section class="mt-8 md:mt-12 xl:mt-16">
    <div class="container mx-auto px-8">
      <h1
        class="text-3xl font-semibold text-center capitalize text-primaryFg lg:text-4xl"
      >
        our professional mentors
      </h1>
      <div class="flex justify-center mx-auto mt-6">
        <span class="inline-block w-40 h-1 bg-secondaryBg rounded-full"></span>
        <span
          class="inline-block w-3 h-1 mx-1 bg-secondaryBg rounded-full"
        ></span>
        <span class="inline-block w-1 h-1 bg-secondaryBg rounded-full"></span>
      </div>
      <p class="max-w-2xl mx-auto my-6 text-center text-secondaryFg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt
        ex placeat modi magni quia error alias, adipisci rem similique, at omnis
        eligendi optio eos harum.
      </p>
      <div>
        <h3 class="mb-4 font-semibold text-primaryFg">Categories</h3>
        <ul
          class="overflow-hidden w-full text-sm font-medium bg-white bg-opacity-40 text-primaryFg border border-lightGray rounded-lg sm:flex sm:items-center"
        >
          <MentorFilters
            v-for="filter in expertiseList"
            :key="filter.id"
            v-model="selectedFilters"
            :filter="filter"
          />
        </ul>
      </div>
      <ul
        role="list"
        class="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mt-16"
      >
        <template v-if="isLoading">
          <SkeletonLoader v-for="i in 8" :key="i" />
        </template>
        <EmptyState v-else-if="!isLoading && isError">
          <img
            src="@/assets/images/lost-data.svg"
            alt="Lost Data"
            loading="lazy"
            class="w-80 h-auto object-cover object-center mb-12"
          />
          <h1 class="mb-1 text-2xl font-semibold text-primaryFg">
            Something went wrong
          </h1>
          <p class="mb-6 text-base text-secondaryFg">
            Please refresh the page and try again.
          </p>
          <a
            href="javascript:window.location.reload()"
            role="button"
            class="py-2.5 px-5 font-medium bg-secondaryBg text-primaryFg rounded-md shadow-lg transition hover:bg-opacity-70"
          >
            Refresh Page
          </a>
        </EmptyState>
        <EmptyState v-else-if="!isLoading && !mentors.length">
          <img
            src="@/assets/images/empty-data.svg"
            alt="Empty Data"
            loading="lazy"
            class="w-80 h-auto object-cover object-center mb-12"
          />
          <h1 class="mb-1 text-2xl font-semibold text-primaryFg">No Mentors</h1>
          <p class="mb-6 text-base text-secondaryFg">
            There is no mentors. Become a mentor now.
          </p>
          <RouterLink
            to="/mentors/create"
            class="py-2.5 px-5 font-medium bg-secondaryBg text-primaryFg rounded-md shadow-lg transition hover:bg-opacity-70"
          >
            Register Now
          </RouterLink>
        </EmptyState>
        <template v-else>
          <MentorCard
            v-for="mentor in mentors"
            :key="mentor.id"
            :mentor="mentor"
          />
        </template>
      </ul>
    </div>
  </section>
</template>

<script>
import { RouterLink } from "vue-router";

import MentorFilters from "@/components/MentorFilters.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import EmptyState from "@/components/EmptyState.vue";
import MentorCard from "@/components/MentorCard.vue";

export default {
  components: {
    RouterLink,
    MentorFilters,
    SkeletonLoader,
    EmptyState,
    MentorCard,
  },
  data() {
    return {
      isLoading: false,
      isError: false,
      selectedFilters: [],
    };
  },
  computed: {
    expertiseList() {
      return this.$store.getters["mentors/getExpertiseList"];
    },
    mentors() {
      const mentors = this.$store.getters["mentors/getAllMentors"];

      if (this.selectedFilters.length === 0) return mentors;

      return mentors.filter((mentor) =>
        this.selectedFilters.some((filter) => mentor.expertise.includes(filter))
      );
    },
  },
  created() {
    this.loadMentors();
  },
  methods: {
    async loadMentors() {
      try {
        this.isLoading = true;
        await this.$store.dispatch("mentors/loadMentors");
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.isError = true;
      }
    },
  },
};
</script>
