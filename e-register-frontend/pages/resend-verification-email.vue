<template>
  <div class="tw-mt-20">
    <div class="tw-flex tw-gap-8 tw-justify-center">
      <img class="tw-h-60" src="~assets/img/verify_email_img.svg" alt="verify_email_image"/>
      <div>
        <h3 class="
        tw-font-bold
        tw-text-3xl
        tw-mb-6
        ">Verify Email</h3>
        <button class="
          tw-p-3
          tw-w-full
          tw-rounded-lg
          tw-bg-light-green
          tw-text-white
          tw-text-sm
          tw-mb-7
        ">
          Resend Email
        </button>
        <button class="
          tw-p-3
          tw-w-full
          tw-rounded-lg
          tw-bg-dark-yellow
          tw-text-white
          tw-text-sm
        ">
          Contact Support
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import ResendVerificationEmail  from "~/apollo/mutations/user/resendVerificationEmail";

export default {
  name: 'resend-verification-email',
  layout: 'home',
  data() {
    return {
      loading: false,
      email: null,
    }
  },
  mounted(){
    // let params = this.$router.params ? this.$router.params.email : null;
 
    // this.resendVerificationEmail()
  },

  methods: {
    async resendVerificationEmail(){
      this.email = ''
      try {
        this.loading = true;
        const res = await this.$apollo.mutate({
          mutation: ValidateEmailToken,
          variables: { email: this.email },
        });
        this.$toast.success('Email validated successfully')

      } catch (errors) {
        this.$throwError(errors)
      }finally{
         this.loading = false;
      }
    }
  }

}
</script>

<style>

</style>
