<template>
  <div class="tw-cursor-pointer" @click="$router.go(-1)">
    <i class='bx tw-bg-gray-200 tw-rounded tw-mb-5 tw-mr-4 tw-p-3 bx-chevron-left'></i> Back
  </div>
</template>
<script>
export default {
  name: "back",
};
</script>