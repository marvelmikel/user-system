<template>
  <div
    class="
    tw-py-5
    tw-rounded-lg
    tw-bg-gray-200
    tw-flex
    tw-justify-center
    tw-items-center
  "
  :class="width === 'half' ? 'tw-w-4/6' : 'tw-w-full' "
  >
  <i :class='icon'></i>
  </div>
</template>

<script>
export default {
  name: 'DisabledUpload',
  props: {
    width: {
      type: String,
      default: 'half'
    },
    icon: {
      type: String,
      default: 'bx bxs-hourglass-top tw-text-3xl tw-text-dark-yellow'
    }
  }
}
</script>

<style>

</style>
