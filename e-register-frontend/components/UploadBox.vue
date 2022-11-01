<template>
  <div @click.prevent="$emit('upload-event')"
    class="
    tw-cursor-pointer
    tw-py-12
    tw-rounded-lg
    tw-w-4/6
    tw-bg-gray-200
    tw-flex
    tw-justify-center
    tw-items-center
  ">
  <i class='bx bx-note tw-text-2xl'></i>

  </div>
</template>

<script>
export default {
  name: 'UploadBox',
}
</script>

<style>

</style>
