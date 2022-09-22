<template>
  <div class="tw-border-b tw-border-light-green tw-py-3">
    <div
      @click="toggleBody"
      class="
        tw-flex tw-justify-between tw-items-center tw-cursor-pointer tw-mb-2
      "
    >
      <p class="tw-text-xl">
        {{ item.question }}
      </p>
      <i class="bx bx-chevron-down tw-text-3xl"></i>
    </div>
    <p v-if="open === true" class="tw-text-gray-700 tw-w-4/5">
      {{ item.answer }}
    </p>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  data() {
    return {
      open: this.item.open,
    };
  },
  props: ["item"],
  methods: {
    toggleBody() {
      this.open = !this.open;
    },
  },
};
</script>

<style>
</style>
