<template>
  <div class="">
    <div
    @click="navigateBack"
    class="
      tw-flex
      tw-items-center
      tw-gap-4
      tw-cursor-pointer
    ">
      <i class='
      bx bx-chevron-left
      tw-text-5xl
      '></i>
      <span class='tw-text-sm tw-cursor-pointer'>Back</span>

    </div>

    <div class="
      tw-my-8
      tw-flex
      tw-gap-8
      tw-border-b-2
      tw-border-gray-400
      tw-pb-8
      ">
      <div class="tw-relative">
        <img class="tw-rounded-full tw-w-32" src="~assets/img/user_img.png" alt="user_img">
        <i class='
        bx bxs-error-circle
        tw-absolute
        tw-right-1.5
        tw-bottom-0
        tw-text-light-green
        tw-text-4xl
        '></i>
      </div>
      <div class="tw-flex-1">
        <div class="
        tw-flex
        tw-justify-between
        tw-items-center
        tw-mb-0
        ">
          <h2 class="
          tw-text-2xl
          tw-font-bold
          ">John Doe</h2>
          <button class="
          tw-rounded-lg
          tw-bg-light-green
          tw-text-white
          tw-w-44
          tw-p-3
          tw-mr-3
          ">
            Edit
          </button>
        </div>
        <p class="tw-text-sm tw-mb-2">Admin</p>
        <p class="tw-text-sm">07005060695</p>
      </div>
    </div>



  </div>
</template>

<script>
export default {
  name: 'edit-admin',
  layout: 'adminDefault',

  methods: {
    navigateBack(){
      this.$router.push("/admin/settings")
    }
  }
}
</script>

<style scoped>


</style>
