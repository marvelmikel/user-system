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

    <div class="tw-flex tw-items-center tw-space-x-8" :class="[!isTransparent?'tw-text-white':'tw-text-black']">
      <nuxt-link exact class="tw-pb-1"  to="/">Home</nuxt-link>
      
      <nuxt-link exact class="tw-pb-1" to="/environmental-consultants-accreditation">About Us</nuxt-link>
      <nuxt-link exact class="tw-pb-1" to="/contact-us">Contact Us</nuxt-link>


      <div v-if="!isLoggedIn">
        <div  class="tw-pb-1 tw-bg-light-green tw-text-white tw-rounded tw-py-2 tw-px-4 tw-cursor-pointer" v-if="$route.path == '/signin'" @click.prevent="$router.push({path:'/signup'})">Sign Up</div>
        <div  class="tw-pb-1 tw-bg-light-green tw-text-white tw-rounded tw-py-2 tw-px-4 tw-cursor-pointer" v-else  @click.prevent="$router.push({path:'/signin'})">Sign In</div>
      </div>
      <a @click.prevent="logout" v-if="isLoggedIn" href="#" class="hover:tw-text-green-500">Logout</a>
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
.nuxt-link-active {
  /* color: #076476; */
  border-bottom: 3px solid yellowgreen;
  /* font-weight: bold; */

}
</style>
