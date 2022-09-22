<template>
  <div class="tw-mt-20">
    <div class="tw-flex tw-gap-8 tw-justify-center">
      <img class="tw-h-96" src="~assets/img/forgotten_password.svg" alt="verify_email_image"/>
      <div>
        <h3 class="
        tw-font-bold
        tw-text-3xl
        tw-mb-6
        ">
        <span>Forgetten</span><br/>
        <span>Password</span>
        </h3>

        <input type="text"
          placeholder="Email Address"
          class="
          tw-px-7
          tw-py-3
          tw-mb-6
          tw-rounded-lg
          tw-w-full
          tw-bg-gray-200
          tw-text-sm
          tw-border-none
          focus:tw-outline-none
          tw-placeholder-gray-400
          "
        />
        <button class="
          tw-p-3
          tw-w-full
          tw-rounded-lg
          tw-bg-light-green
          tw-text-white
          tw-text-sm
        ">
          Send
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'forgotten-password',
  layout: 'home',

}
</script>

<style>

</style>
