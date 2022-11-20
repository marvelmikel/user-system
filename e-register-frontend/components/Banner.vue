<template>
  <div class="tw-bg-gray-100 tw-hidden md:tw-block">
    <div
      class="
        tw-flex
        tw-justify-between
        tw-items-end
        tw-w-9/12
        tw-mx-auto
        tw-py-10
        tw-bg-gray-100
      "
    >
      <div>
        <Back v-if="back" />
        <h1 class="tw-text-4xl tw-text-gray-500 tw-font-bold">
          {{ title }}
        </h1>
      </div>
      <button
        @click="emitBtnEvent"
        v-if="showButton"
        class="
          tw-rounded-lg tw-bg-green-500 tw-text-white tw-py-2 tw-px-4 tw-w-40
        "
      >
        {{ buttonTxt }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    title: {
      type: String,
    },
    showButton: {
      type: Boolean,
      default: false,
    },
    buttonTxt: {
      type: String,
      default: "Apply",
    },
    back: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitBtnEvent() {
      this.$emit("button-event");
    },
  },
};
</script>

<style>
</style>
