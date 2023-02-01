<template>
  <li class="col-span-1 bg-white bg-opacity-75 rounded-lg shadow-lg">
    <div class="flex justify-between items-center w-full p-6">
      <div class="flex-1 truncate">
        <div class="flex space-x-3 items-center">
          <h3 class="truncate text-sm font-medium text-primaryFg">
            <RouterLink :to="`/mentor/${mentor.slug}`">
              {{ fullName }}
            </RouterLink>
          </h3>
        </div>
        <p class="mt-1 text-sm text-secondaryFg">
          <span v-for="expert in mentor.expertise" :key="expert">
            {{ expert
            }}<span
              v-if="expert !== mentor.expertise[mentor.expertise.length - 1]"
            >
              /
            </span>
          </span>
        </p>
      </div>
      <p class="px-2.5 py-1.5 text-sm bg-secondaryBg text-white rounded-full">
        {{ formattedRate }}/hr
      </p>
    </div>
    <div>
      <div class="flex -mt-px">
        <div class="flex flex-1 w-0">
          <a
            href="mailto:janecooper@example.com"
            class="relative inline-flex justify-center items-center flex-1 w-0 -mr-px py-4 text-sm font-medium text-secondaryFg border border-secondaryFg border-opacity-30 rounded-bl-lg hover:text-primaryFg"
          >
            <Icon icon="ic:baseline-email" class="text-lg" />
            <span class="ml-3">Contact</span>
          </a>
        </div>
        <div class="flex flex-1 w-0">
          <RouterLink
            :to="`/mentor/${mentor.slug}`"
            class="relative inline-flex justify-center items-center flex-1 w-0 -mr-px py-4 text-sm font-medium text-secondaryFg border border-l-0 border-secondaryFg border-opacity-30 rounded-br-lg hover:text-primaryFg"
          >
            <Icon icon="zondicons:view-show" class="text-lg" />
            <span class="ml-3">Profile</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
  props: {
    mentor: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    fullName() {
      return `${this.mentor.firstName} ${this.mentor.lastName}`;
    },
    formattedRate() {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(this.mentor.rate);
    },
  },
};
</script>
