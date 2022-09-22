<template>
  <div class="tw-flex tw-items-center tw-gap-3 tw-cursor-pointer" @click="$router.push({path:'/'})">
    <div>
      <img v-if="isBlack" src="~/assets/images/black.svg" alt="black logo" />
      <img v-else src="~/assets/images/white.svg" alt="black logo" />
    </div>
    <div :class="[isBlack?'tw-text-black':'tw-text-white']">
      <h4 class="tw-text-2xl">Federal Ministry of Environment</h4>
      <p>Department of Pollution Control & Environmental Health</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Logo",
  props: {
    isBlack: {
      type: Boolean,
      default: true,
    },
  },
};
</script>