<template>
  <div class="
    tw-flex
    tw-flex-col
    tw-justify-center
    tw-items-center
    tw-mt-10
  ">
    <h1 class="tw-text-center tw-my-3 tw-text-2xl tw-font-bold">
      {{ text }}
    </h1>
    <img class="tw-w-52" src="~assets/img/no_results_img.png" alt="no_results_img">
  </div>
</template>

<script>
export default {
  name: 'NoItem',
  props: {
    text: {
      type: String,
      default: 'No data'
    }
  }
}
</script>

<style>

</style>
