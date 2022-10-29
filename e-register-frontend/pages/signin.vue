<template>
  <div>
    <Menu :isTransparent="true" :signinUrl="'/signin'" />
    <div class="color tw-h-screen tw-flex tw-items-center">
      <div class="tw-w-1/3 tw-mx-auto">
        <form @submit.prevent="authenticate">
          <h3 class="tw-text-white tw-mb-5 tw-text-3xl ">
            Sign In
          </h3>

          <div>
            <input
              type="text"
              required
              placeholder="Email Address"
              v-model="email"
              class="
                tw-mb-4
                tw-px-7
                tw-py-3
                tw-rounded-lg
                tw-w-full
                tw-bg-dark-green
                tw-text-white
                tw-border-none
                focus:tw-outline-none
                tw-placeholder-white
              "
            />

            <input
              type="password"
              required
              placeholder="Password"
              v-model="credential"
              class="
                tw-mb-4
                tw-px-7
                tw-py-3
                tw-rounded-lg
                tw-w-full
                tw-bg-dark-green
                tw-text-white
                tw-border-none
                focus:tw-outline-none
                tw-placeholder-white
              "
            />
          </div>

          <p class="tw-text-sm tw-text-right tw-mb-4 tw-text-white">
            Forgetten Password?
          </p>

          <input
          type="submit"
          value="Login"
            :disabled="incompleForm || authenticating"
            class="
              tw-p-3
              tw-mb-14
              tw-rounded-lg
              tw-bg-green-500
              tw-text-white
              tw-w-full
            "
            :class=" authenticating ? 'tw-opacity-40' : '' "
          >
            <!-- <i class="bx bx-loader-circle bx-spin" v-if="authenticating"></i> -->


          <nuxt-link
            to="/signup"
            class="tw-text-sm tw-text-white tw-text-center tw-block"
          >
            Have an account? <span class="tw-text-dark-yellow"> Sign Up</span>
          </nuxt-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LoginUser from "~/apollo/mutations/user/signinUser";

export default {
  name: "signin",
  data() {
    return {
      email: null,
      credential: null,
      authenticating: false,
    };
  },
  middleware:['authenticated_user'],

  // apollo: {
  //   $client: 'otherClient',
  //   allcars: {
  //     prefetch: true,
  //     query: allcars
  //   }
  // },

  computed: {
    incompleForm() {
      return !this.email || !this.credential ? true : false;
    },
  },

  methods: {
    async authenticate() {
      try {
        this.authenticating = true;
        const res = await this.$apollo.mutate({
          mutation: LoginUser,
          variables: { email: this.email, credential: this.credential },
        });
        if (res.data) {
          const token = res.data.loginUser.token || null;
          if (token) {
            this.$store.dispatch('login', token)
            // this.$router.push({ path: '/company' })
            // this.$router.push ({name: 'resend-verification-email', params: {email: this.email}})
            this.$toast.success('Successfully authenticated')
          }else{
            this.$toast.error('Something went wrong')
          }
        }

      } catch (errors) {
        this.$throwError(errors)
      }finally{
         this.authenticating = false;
      }

    },
  },
};
</script>


<!-- <script>
import categoriesQuery from "~/apollo/queries/category/categories";

export default {
  data() {
    return {
      categories: {
        data: [],
      },
    };
  },
  apollo: {
    categories: {
      prefetch: true,
      query: categoriesQuery,
    },
  },
};
</script> -->

<style>
</style>
