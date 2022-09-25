<template>
  <div class="">

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

    <div>
      <h2 class="tw-font-bold tw-text-xl tw-my-3">Change Password</h2>

      <div class="
      tw-grid
      tw-grid-cols-4
      tw-gap-3
      tw-mb-14
      tw-text-sm
      ">
        <input type="text"
          placeholder="Old Password"
          class="
          tw-col-span-1
          tw-px-7
          tw-py-2
          tw-rounded-lg
          tw-bg-gray-200
          tw-border-none
          focus:tw-outline-none"
          />
          <input type="text"
          placeholder="Current Password"
          class="
          tw-col-span-1
          tw-px-7
          tw-py-2
          tw-rounded-lg
          tw-bg-gray-200
          tw-border-none
          focus:tw-outline-none"
          />
          <input type="text"
          placeholder="Confirm Password"
          class="
          tw-col-span-1
          tw-px-7
          tw-py-2
          tw-rounded-lg
          tw-bg-gray-200
          tw-border-none
          focus:tw-outline-none"
          />
          <button class="
            tw-col-span-1
            tw-p-3
            tw-rounded-lg
            tw-bg-light-green
            tw-text-white
          ">
            Update
          </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'change-password',
  layout: 'admin-default',
}
</script>

<style scoped>


</style>
