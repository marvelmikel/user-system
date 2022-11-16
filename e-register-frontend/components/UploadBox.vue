<template>
  <div>
    <DisabledUpload v-if="approved" icon="bx bx-check tw-text-3xl tw-text-green-400" />

    <!-- <div v-if="approved"
      class="
      tw-py-8
      tw-rounded-lg
      tw-bg-gray-200
      tw-flex
      tw-justify-center
      tw-items-center
    "
    :class="width === 'half' ? 'tw-w-4/6' : 'tw-w-full' "
    >
    <i class='bx bx-check tw-text-5xl tw-text-green-400'></i>
    </div> -->
    <!-- bx bxs-hourglass-top -->
    <div v-else>
      <div v-if="!hasFile" @click.prevent="$emit('upload-event')"
        class="
        tw-cursor-pointer
        tw-py-5
        tw-rounded-lg
        tw-bg-gray-200
        tw-flex
        tw-justify-center
        tw-items-center
      "
      :class="width === 'half' ? 'tw-w-4/6' : 'tw-w-full' "
      >
        <!-- <i v-if="hasFile" class='bx bx-check tw-text-5xl tw-text-green-400'></i> -->
        <i class='bx bx-note tw-text-3xl'></i>
      </div>
      <DisabledUpload v-else/>

    </div>
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
    approved: {
      type: Boolean,
      default: false
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
