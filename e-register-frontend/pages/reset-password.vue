<template>
  <div class="
    tw-h-screen
  ">

    <div class="tw-w-1/3 tw-mx-auto tw-mt-14">
      <h3 class="
      tw-text-center
      tw-mb-5
      tw-text-3xl
      tw-font-bold">
        Reset Password
      </h3>

      <div>
        <input type="password"
          placeholder="Password"
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

        <input type="password"
          placeholder="Confirm Password"
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
      </div>

      <button class="
        tw-p-3
        tw-mb-14
        tw-rounded-lg
        tw-bg-green-500
        tw-text-white
        tw-w-full
      ">
        Reset
      </button>

      <a href="" class="
      tw-text-sm
      tw-text-white
      tw-text-center
      tw-block">
        Have an account? Sign Up
      </a>

    </div>
  </div>
</template>

<script>
export default {
  name: 'reset-password',
  layout: 'home',
}
</script>

<style>

</style>
