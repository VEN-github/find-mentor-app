<template>
  <section class="mt-8 md:mt-12">
    <div class="container mx-auto px-8">
      <div
        class="mx-auto md:flex md:justify-between md:space-x-5 md:items-center"
      >
        <div class="flex space-x-5 items-center">
          <div>
            <h1 class="text-2xl font-bold text-primaryFg">{{ fullName }}</h1>
            <p class="text-sm font-medium text-secondaryFg">
              <span v-for="expert in mentor.expertise" :key="expert">
                {{ expert
                }}<span
                  v-if="
                    expert !== mentor.expertise[mentor.expertise.length - 1]
                  "
                >
                  /
                </span>
              </span>
            </p>
          </div>
        </div>
        <div
          class="flex justify-stretch space-y-4 space-y-reverse flex-col-reverse mt-6 sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse sm:flex-row-reverse md:space-x-3 md:flex-row md:mt-0"
        >
          <BaseButton v-if="isAuthenticated" mode="outline-primary">
            Add to favorites
          </BaseButton>
          <BaseButton
            v-else
            is-link
            :link="`/login?mentor=${slug}`"
            mode="outline-primary"
          >
            Add to favorites
          </BaseButton>
          <BaseButton v-if="isAuthenticated" mode="primary">
            Contact
          </BaseButton>
          <BaseButton
            v-else
            is-link
            :link="`/login?mentor=${slug}`"
            mode="primary"
          >
            Contact
          </BaseButton>
        </div>
      </div>
      <div class="mx-auto mt-8">
        <div class="space-y-6 lg:col-span-2 lg:col-start-1">
          <section aria-labelledby="mentor-information-title">
            <div class="bg-white shadow-lg sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <h2 class="text-lg font-medium leading-6 text-primaryFg">
                  Mentor Information
                </h2>
                <p class="mt-1 max-w-2xl text-sm text-secondaryFg">
                  Personal details and application.
                </p>
              </div>
              <div class="px-4 py-5 border-t border-lightGray sm:px-6">
                <dl class="grid grid-cols-1 gap-y-8">
                  <div>
                    <dt class="text-sm font-medium text-primaryFg">
                      Email address
                    </dt>
                    <dd class="mt-1 text-sm text-secondaryFg">
                      {{ mentor.email }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-primaryFg">
                      Hourly rate
                    </dt>
                    <dd class="mt-1 text-sm text-secondaryFg">
                      {{ formattedRate }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-primaryFg">About</dt>
                    <dd class="mt-1 text-sm text-secondaryFg">
                      {{ mentor.about }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    slug: {
      type: String,
      default() {
        return null;
      },
    },
  },
  computed: {
    mentor() {
      return this.$store.getters["mentors/getMentor"] ?? {};
    },
    fullName() {
      return `${this.mentor?.firstName} ${this.mentor?.lastName}`;
    },
    formattedRate() {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(this.mentor.rate);
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  created() {
    this.$store.dispatch("mentors/loadMentor", this.slug);
  },
};
</script>
