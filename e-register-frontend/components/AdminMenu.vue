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
      <nuxt-link v-if="!isLoggedIn" to="/signin" class="hover:tw-text-green-500">Sign In</nuxt-link>
      <a @click="logout" v-if="isLoggedIn" href="#" class="hover:tw-text-green-500">Logout</a>
      <nuxt-link to="/environmental-consultants-accreditation" class="hover:tw-text-green-500">About Us</nuxt-link>
      <nuxt-link to="/contact-us" class="hover:tw-text-green-500">Contact Us</nuxt-link>

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
  },
  computed: {
    isLoggedIn() {
      return this.$cookies.get('ADMIN-LOGIN-STATE') ? true : false;
    },
  },
  methods: {
    logout(e) {
      e.preventDefault();
      this.$store.commit("ADMIN_LOGOUT");
      this.$router.push("/admin/signin");
    },
  }
};
</script>

<style>
</style>
