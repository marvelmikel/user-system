<template>
  <nav
    class="
      tw-fixed
      tw-w-full
      
      tw-shadow-lg
      tw-py-7
      tw-px-36
      tw-flex
      tw-justify-between
      tw-border-b
    "
    :class="[isTransparent?'tw-bg-white':'']"
  >
    <Logo :isBlack="isTransparent" />

    <div class="tw-flex tw-items-center tw-space-x-5" :class="[!isTransparent?'tw-text-white':'tw-text-black']">
      <nuxt-link to="/signin">Sign In</nuxt-link>
      <a href="">About Us</a>
      <a href="">Contact Us</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Menu",
  props:{
    isTransparent:{
        type:Boolean,
        default:true
    }
  }
};
</script>

<style>
</style>
