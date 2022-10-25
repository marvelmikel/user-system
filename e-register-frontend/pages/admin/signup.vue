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
          <span>Sign Up</span><br/>
          <span>as Superadmin</span>
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
        tw-mt-10
        tw-text-4xl
        ">Sign Up</h3>
        <form @submit.prevent="signup">

          <input type="text"
            placeholder="First Name"
            v-model="firstname"
            class="
            tw-px-7
            tw-py-3
            tw-mt-4
            tw-rounded-lg
            tw-w-full
            tw-bg-gray-200
            tw-text-sm
            tw-border-none
            focus:tw-outline-none
            tw-placeholder-gray-400
            "
          />
          <input type="text"
            placeholder="Middle Name"
            v-model="middlename"
            class="
            tw-px-7
            tw-py-3
            tw-mt-4
            tw-rounded-lg
            tw-w-full
            tw-bg-gray-200
            tw-text-sm
            tw-border-none
            focus:tw-outline-none
            tw-placeholder-gray-400
            "
          />
          <input type="text"
            placeholder="Last Name"
            v-model="lastname"
            class="
            tw-px-7
            tw-py-3
            tw-mt-4
            tw-rounded-lg
            tw-w-full
            tw-bg-gray-200
            tw-text-sm
            tw-border-none
            focus:tw-outline-none
            tw-placeholder-gray-400
            "
          />
          <input type="text"
            placeholder="Phone Number"
            v-model="phone"
            class="
            tw-px-7
            tw-py-3
            tw-mt-4
            tw-rounded-lg
            tw-w-full
            tw-bg-gray-200
            tw-text-sm
            tw-border-none
            focus:tw-outline-none
            tw-placeholder-gray-400
            "
          />
          <input type="password"
            placeholder="Password"
            v-model="password"
            class="
            tw-px-7
            tw-py-3
            tw-rounded-lg
            tw-w-full
            tw-bg-gray-200
            tw-border-none
            focus:tw-outline-none
            tw-placeholder-gray-400
            tw-mt-4
            tw-text-sm
            "
          />
          <input type="password"
            placeholder="Confirm Password"
            v-model="confirm_password"
            class="
            tw-px-7
            tw-py-3
            tw-rounded-lg
            tw-w-full
            tw-bg-gray-200
            tw-border-none
            focus:tw-outline-none
            tw-placeholder-gray-400
            tw-mt-4
            tw-text-sm
            "
          />
        </form>

        <button
        :disabled="disableBtn"
        class="
          tw-p-3
          tw-w-full
          tw-rounded-lg
          tw-bg-light-green
          tw-text-white
          tw-text-sm
          tw-mt-4
        "
        type="submit"
        >
          Create Account
        </button>

        <div class="tw-mt-10 tw-text-sm">
          <p class="tw-text-center">Have an account? <nuxt-link to="/admin/signin" class="tw-text-dark-yellow">Sign In</nuxt-link></p>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import CreateAdmin  from "~/apollo/mutations/admin/createAdmin";

export default {
  name: "admin-signup",
  data() {
    return {
      firstname: null,
      middlename: null,
      lastname: null,
      phone: null,
      password: null,
      confirm_password: null,
      loading: false,
    }
  },
  computed: {
    disableBtn() {
      let match_password = this.confirm_password === this.password ? true : false;
      return !this.fullname || !this.phone || !match_password ? true : false;
    },
  },

  mounted(){
    console.log(this.$route.query.token);
  },

  apollo: {

  },

  // layout: 'home',
  methods: {
    async signup(){
      try {
        this.loading = true;
        // const res = await this.$apollo.mutate({
        //   client: 'admin',
        //   mutation: LoginAdmin,
        //   variables: { email: this.email, credential: this.credential },
        // });
        // if (res.data) {
        //   const admin_token = res.data.loginAdmin || null;
        //   if (admin_token) {
        //     this.$store.dispatch('adminLogin', admin_token)
        //     this.$router.push({path: '/admin'})
        //     this.$toast.success('Welcome Admin')
        //   }else{
        //     this.$toast.success('Something went wrong')
        //   }
        // }

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
</style>
