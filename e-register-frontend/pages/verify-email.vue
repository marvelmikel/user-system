<template>
  <div>

    <div v-if="loading"
    class="
      tw-flex
      tw-flex-col
      tw-justify-center
      tw-items-center
      tw-mt-10
    ">
      <div class="tw-w-4/6">
        <PuSkeleton :duration="1.5" />
      </div>
      <div class="tw-w-3/6">
        <PuSkeleton :duration="3" />
      </div>
      <div class="tw-w-3/6">
        <PuSkeleton :duration="3" />
      </div>
      <div class="tw-w-2/6">
        <PuSkeleton  />
      </div>
    </div>

    <div v-else class="
      tw-flex
      tw-flex-col
      tw-justify-center
      tw-items-center
      tw-mt-10
    ">
      <img v-if="verified" class="tw-w-52" src="~assets/img/verified_successfully_img.png" alt="no_results_img" />
      <img v-if="!verified" class="tw-w-52" src="~assets/img/verified_unsuccessfully_img.png" alt="no_results_img" />

      <h3 v-if="!verified" class="tw-text-center tw-my-3 tw-text-2xl tw-font-bold">Verified Unsuccessfully</h3>
      <h3 v-if="verified" class="tw-text-center tw-my-3 tw-text-2xl tw-font-bold">Verified Successfully</h3>


      <button @click="navigateToLogin" class="
          tw-p-3
          tw-w-1/4
          tw-rounded-lg
          tw-bg-blue-500
          tw-text-white
          tw-text-sm
          tw-mb-7
        ">
          Proceed to login
        </button>

      <!-- <p class="tw-text-xs">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lectus quis tortor senectus lobortis ullamcorper
      </p> -->
    </div>
  </div>
</template>

<script>
import ValidateEmailToken  from "~/apollo/mutations/user/validateEmailToken";

export default {
  name: 'verify-email',
  layout: 'home',

  data() {
    return {
      token: null,
      loading: true,
      verified: false
    }
  },

  mounted(){
    this.verifyToken()
  },

  methods: {
    async verifyToken(){
      this.token = this.$route.query.token || null;

      try {
        this.loading = true;
        const res = await this.$apollo.mutate({
          mutation: ValidateEmailToken,
          variables: { token: this.token },
        });
        console.log(res);
        let data = res.data || null;
        if (data) {
          if (data.validateEmailVerification) {
            this.verified = true;
            this.$toast.success('Email validated successfully')
            return;
          }
        }

        this.$toast.success('Email validated successfully')
      } catch (errors) {
        this.$throwError(errors)
      }finally{
         this.loading = false;
      }
    },

    navigateToLogin(){
      this.$router.push({ path: 'signin' })
    }
  }
}
</script>

<style>

</style>
