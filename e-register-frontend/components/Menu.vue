<template>
  <nav
    class="
      tw-h-32
      tw-fixed
      tw-w-full
      tw-z-10
      tw-shadow-lg
      tw-py-7
      tw-px-36
      tw-flex
      tw-justify-between
    "
    :class="[isTransparent?'tw-bg-white':'']"
  >
    <Logo :isBlack="isTransparent" />

    <div class="tw-flex tw-items-center tw-space-x-5" :class="[!isTransparent?'tw-text-white':'tw-text-black']">
      <nuxt-link :to="signinUrl">Sign In</nuxt-link>
      <nuxt-link to="/environmental-consultants-accreditation">About Us</nuxt-link>
      <nuxt-link to="/contact-us">Contact Us</nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Menu",
  props:{
    isTransparent:{
        type:Boolean,
        default:true,
    },
    signinUrl:{
        type:String,
        default: '/admin/signin',
    }
  }
};
</script>

<style>
</style>
