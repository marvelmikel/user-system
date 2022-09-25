<template>
  <nav
    style="width: 83%;"
    class="
      tw-h-28
      tw-fixed
      tw-z-10
      tw-shadow-lg
      tw-py-7
      tw-px-16
      tw-flex
      tw-justify-end
    "
    :class="[isTransparent?'tw-bg-white':'']"
  >

    <div class="tw-flex tw-items-center tw-space-x-5" :class="[!isTransparent?'tw-text-white':'tw-text-black']">
      <nuxt-link to="/signin">Sign In</nuxt-link>
      <nuxt-link to="/environmental-consultants-accreditation">About Us</nuxt-link>
      <nuxt-link to="/contact-us">Contact Us</nuxt-link>

      <div class="tw-relative">
        <img class="" src="~assets/img/user_small_img.png" alt="gallery_img">
      </div>

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
