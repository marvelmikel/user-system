<template>
  <div class="tw-border-b tw-border-light-green tw-py-3">
    <div
      @click="toggleBody"
      class="
        tw-flex tw-justify-between tw-items-center tw-cursor-pointer tw-mb-2
      "
    >
      <p class="tw-text-xl tw-font-bold">
        {{ item.question }}
      </p>
      <i class="bx bx-chevron-down tw-text-3xl"></i>
    </div>
    <div v-if="open === true" class="tw-text-gray-700 tw-w-4/5">
      <p v-if="item.answer.header" class="tw-mb-5">
        {{ item.answer.header }}
      </p>
      <ul class="tw-list-disc tw-pl-10">
        <li v-for="(list, index) in item.answer.list" :key="index" class="tw-text-sm">
          {{ list }}
        </li>
      </ul>
      <p v-if="item.answer.footer" class="tw-mt-5">
        {{ item.answer.footer }}
      </p>

    </div>
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
