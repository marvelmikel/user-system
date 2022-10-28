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
      <nuxt-link v-if="!isLoggedIn" :to="signinUrl">Sign In</nuxt-link>
      <a @click.prevent="logout" v-if="isLoggedIn" href="#" class="hover:tw-text-green-500">Logout</a>
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
  },
  computed: {
    isLoggedIn() {
      return this.$cookies.get('USER-LOGIN-STATE') ? true : false;
    },
  },
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push("/signin");
    },
  }
};
</script>

<style>
</style>
