<template>
  <div>
    <div class="
      login__left
      tw-flex
      tw-absolute
      tw-inset-y-0
      tw-left-0
      tw-right-1/3
      tw-px-32
      tw-items-center
    ">
      <div class="
      tw-w-full
      tw-space-y-8
      ">
        <img class="tw-mt-4" src="~assets/img/coat_of_arms_of_nigeria_white.svg" alt="coat_of_arms_of_nigeria"/>
        <div class="

          tw-text-6xl
          tw-text-white
          tw-font-bold
        ">
          <span>Environmental</span><br/>
          <span>Consultants</span><br/>
          <span>Accreditation</span>
        </div>

        <p class="tw-text-sm tw-text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Lectus quis tortor senectus lobortis ullamcorper
          ullamcorper. Quis sit donec amet sit praesent ac.
          Eu augue libero lobortis convallis. Euismod ultrices
          non fermentum risus quisque cursus odio sed.
        </p>

        <img class="tw-mt-10" src="~assets/img/signup_page_icon.svg" alt="signup_page_icon"/>

      </div>
    </div>

    <div class="
    login__right
    tw-absolute
    tw-inset-y-0
    tw-right-0
    tw-left-2/3
    tw-px-20
    tw-flex
    tw-items-center
    ">
      <div>
        <h3 class="
        tw-font-bold
        tw-text-4xl
        ">Sign Up</h3>
        <form >

          <input
            v-model="email"
            type="text"
            placeholder="Email Address"
            class="
            tw-px-7
            tw-py-3
            tw-mt-8
            tw-rounded-lg
            tw-w-full
            tw-bg-gray-200
            tw-text-sm
            tw-border-none
            focus:tw-outline-none
            tw-placeholder-gray-400
            "
          />
          <input
            v-model="credential"
            type="password"
            placeholder="Password"
            class="
            tw-px-7
            tw-py-3
            tw-rounded-lg
            tw-w-full
            tw-bg-gray-200
            tw-border-none
            focus:tw-outline-none
            tw-placeholder-gray-400
            tw-mt-6
            tw-text-sm
            "
          />
        </form>
        <div class="tw-flex tw-justify-end tw-my-5">
          <nuxt-link to="/forgotten-password" class="tw-text-xs tw-cursor-pointer">Forgetten Password?</nuxt-link>
        </div>
        <button @click="signup" class="
          tw-p-3
          tw-w-full
          tw-rounded-lg
          tw-bg-light-green
          tw-text-white
          tw-text-sm
        ">
          Create Account
        </button>

        <div class="tw-mt-10 tw-text-sm">
          <p class="tw-text-center">Have an account? <nuxt-link to="/signin" class="tw-text-dark-yellow">Sign In</nuxt-link>
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import CreateUser  from "~/apollo/mutations/user/createUser";

export default {
  name: "signup",
  data() {
    return {
      loading: false,
      email: null,
      credential: null
    }
  },
  // layout: 'home',
  mounted(){
  },

  methods: {
    async signup(){
      try {
        this.loading = true;
        const res = await this.$apollo.mutate({
          mutation: CreateUser,
          variables: {
            email: this.email,
            credential: this.credential
          },
        });
        if (res.data) {
          const user = res.data.createUser || null;
          if (user) {
            // this.$store.dispatch('saveAdmin', user)
            this.$router.push({ path: 'verify-your-email' })
            this.$toast.success('Verify your email')
          }else{
            this.$toast.success('Something went wrong')
          }
        }

      } catch (errors) {
        this.$throwError(errors)
      }finally{
         this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.login__left {
  background: linear-gradient(217.92deg, #076476 61.49%, #3DAC8C 117.81%);
}
.login__right {
  /* text-align: left; */
}
</style>
