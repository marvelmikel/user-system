<template>
  <div>
    <Menu :isTransparent="true" />
    <div class="color tw-h-screen tw-flex tw-items-center">
      <div class="tw-w-1/3 tw-mx-auto">
        <h3
          class="tw-text-white tw-mb-5 tw-text-3xl tw-font-bold"
        >
          Sign In
        </h3>

        <div>
          <input
            type="text"
            placeholder="Email Address"
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
            type="text"
            placeholder="Password"
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

        <p class="tw-text-sm tw-text-right tw-mb-4 tw-text-gray-400">
          Forgetten Password?
        </p>

        <button
          class="
            tw-p-3
            tw-mb-14
            tw-rounded-lg
            tw-bg-green-500
            tw-text-white
            tw-w-full
          "
        >
          Create Account
        </button>

        <a href="" class="tw-text-sm tw-text-white tw-text-center tw-block">
          Have an account? Sign Up
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "signin",
};
</script>

<style>
</style>
