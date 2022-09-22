<template>
  <div class="tw-fixed tw-w-full tw-py-3" :class="[bgColor]">
    <div
      class="
        stable-alignment
        tw-flex tw-items-center tw-justify-between tw-py-3
      "
    >
      <Logo></Logo>
      <Menu></Menu>
    </div>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  props: {
    bgColor: {
      type: String,
      default: "",
    },
  },
};
</script>