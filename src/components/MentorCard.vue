<template>
  <li
    class="col-span-1 flex flex-col text-center bg-white bg-opacity-75 rounded-lg shadow-lg"
  >
    <div class="flex flex-1 flex-col p-8">
      <h3 class="mt-6 text-2xl font-semibold capitalize text-primaryFg">
        <RouterLink :to="`/mentor/${mentor.slug}`">
          {{ fullName }}
        </RouterLink>
      </h3>
      <dl class="flex justify-between flex-grow flex-col mt-1">
        <dt class="sr-only">Title</dt>
        <dd class="text-sm text-secondaryFg">
          <span v-for="expert in mentor.expertise" :key="expert">
            {{ expert
            }}<span
              v-if="expert !== mentor.expertise[mentor.expertise.length - 1]"
            >
              /
            </span>
          </span>
        </dd>
        <dt class="sr-only">Role</dt>
        <dd class="mt-3">
          <span
            class="px-2.5 py-1.5 text-lg font-medium bg-secondaryBg text-white rounded-full"
          >
            {{ formattedRate }}/hr
          </span>
        </dd>
      </dl>
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

<script setup>
import { RouterLink } from "vue-router";
import { computed } from "vue";

const props = defineProps({
  mentor: {
    type: Object,
    default() {
      return {};
    },
  },
});

const fullName = computed(() => {
  return `${props.mentor.firstName} ${props.mentor.lastName}`;
});

const formattedRate = computed(() => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(props.mentor.rate);
});
</script>
