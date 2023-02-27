<template>
  <Transition name="slide-fade">
    <div v-if="!!errorMsg" class="fixed top-7 right-7 z-10">
      <div class="p-6 border-l-4 border-red bg-lightRed">
        <div class="flex">
          <div class="flex-shrink-0">
            <Icon icon="ph:x-circle-fill" class="text-xl text-red" />
          </div>
          <div class="ml-3">
            <div class="text-sm text-red">
              <p>{{ errorMsg }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  errorMsg: {
    type: String,
    default() {
      return null;
    },
  },
});
</script>
