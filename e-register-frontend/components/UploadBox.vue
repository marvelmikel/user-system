<template>
  <div @click.prevent="$emit('upload-event')"
    class="
    tw-cursor-pointer
    tw-py-8
    tw-rounded-lg
    tw-bg-gray-200
    tw-flex
    tw-justify-center
    tw-items-center
  "
  :class="width === 'half' ? 'tw-w-4/6' : 'tw-w-full' "
  >
  <i v-if="hasFile" class='bx bx-check tw-text-5xl tw-text-green-400'></i>
  <i v-else class='bx bx-note tw-text-5xl'></i>
  </div>
</template>

<script>
export default {
  name: 'UploadBox',
  props: {
    hasFile: {
      type: String,
      default: null
    },
    // file: {
    //  type: Object,
    //  default: null
    // },
    width: {
      type: String,
      default: 'half'
    }
  }
}
</script>

<style>

</style>
