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
    :class="[isTransparent ? 'tw-bg-white' : '']"
  >
    <Logo :isBlack="isTransparent" />

    <div
      class="tw-flex tw-items-center tw-space-x-8"
      :class="[!isTransparent ? 'tw-text-white' : 'tw-text-black']"
    >
      <nuxt-link exact class="tw-pb-1" to="/"><i class='bx tw-text-yellow-500 bxs-home tw-text-2xl'></i></nuxt-link>

      <!-- <nuxt-link
        exact
        class="tw-pb-1"
        to="/environmental-consultants-accreditation"
        >About Us</nuxt-link
      > -->
      <nuxt-link exact class="tw-pb-1" to="/contact-us">Contact Us</nuxt-link>

      <div v-if="!isLoggedIn">
        <div
          class="
            tw-pb-1
            tw-bg-light-green
            tw-text-white
            tw-rounded
            tw-py-2
            tw-px-4
            tw-cursor-pointer
          "
          v-if="$route.path == '/signin'"
          @click.prevent="$router.push({ path: '/signup' })"
        >
          Sign Up
        </div>
        <div
          class="
            tw-pb-1
            tw-bg-light-green
            tw-text-white
            tw-rounded
            tw-py-2
            tw-px-4
            tw-cursor-pointer
          "
          v-else
          @click.prevent="$router.push({ path: '/signin' })"
        >
          Sign In
        </div>
      </div>
      <div class="tw-flex tw-items-center tw-gap-8" v-else>
        <div class="tw-relative">
         <div class="tw-cursor-pointer" @click="showMenu = true">
           <div
            v-if="!userDetails?.profilePic"
            class="
              tw-overflow-hidden
              tw-relative
              tw-w-10
              tw-h-10
              tw-p-1
              tw-ring-2
              tw-ring-gray-300
              tw-bg-gray-100
              tw-rounded-full
              dark:tw-bg-gray-600
            "
          >
            <svg
              class="tw-absolute tw--left-1 tw-w-12 tw-h-12 tw-text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <img
            v-else
            class="tw-rounded-full tw-w-10 tw-p-1 tw-ring-2 tw-ring-gray-300"
            src="~assets/img/user_img.png"
            alt="user_img"
          />
         </div>
          <i
            class="
              bx
              bxs-error-circle
              tw-absolute
              tw--right-1.5
              tw--top-1.5
              tw-text-light-green
              tw-text-xl
            "
          ></i>
          <div v-if="showMenu" @mouseleave="showMenu = false"
            class="
              tw-w-44 tw-bg-gray-100 tw-divide-y-2 tw-flex tw-px-3 tw-flex-col tw-absolute tw-mt-2 tw-rounded tw-py-3
            "
          >
            <div @click.prevent="$router.push({path:'/company'})" class="tw-flex tw-gap-3 tw-items-center tw-cursor-pointer"> <i class="bx bx-user tw-text-xl"></i>Profile</div>
            <div @click.prevent="logout" class="tw-flex tw-gap-3 tw-items-center tw-cursor-pointer"> <i class="bx bx-log-in tw-text-xl"></i>Logout</div>

          </div>
        </div>

        <i @click.prevent="$router.push({path:'/accreditations'})" class="bx bx-layer-plus tw-text-3xl tw-cursor-pointer"></i>
        <!-- <a @click.prevent="logout"  href="#" class="hover:tw-text-green-500">Logout</a> -->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Menu",
  props: {
    isTransparent: {
      type: Boolean,
      default: true,
    },
    signinUrl: {
      type: String,
      default: "/admin/signin",
    },
  },
  data(){
return {
  showMenu: false
}
  },
  computed: {
    userDetails() {
      return this.$store.getters.userDetails;
    },
    isLoggedIn() {
      return this.$cookies.get("USER-LOGIN-STATE") ? true : false;
    },
  },
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push("/signin");
    },
  },
};
</script>

<style>
/* .nuxt-link-active { */
  /* color: #076476; */
  /* border-bottom: 3px solid yellowgreen; */
  /* font-weight: bold; */
/* } */
</style>
