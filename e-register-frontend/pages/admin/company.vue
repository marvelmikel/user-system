<template>
  <div class="">

    <div class="
    tw-mb-10
    tw-flex
    tw-justify-between
    ">
      <div class="
      tw-flex
      tw-items-center
      tw-gap-4
      ">
        <i class='
        bx bx-chevron-left
        tw-text-5xl
        tw-cursor-pointer
        '></i>
        <span class='tw-text-sm tw-cursor-pointer'>Back</span>
        <span class='tw-text-2xl'>|</span>
        <span class='tw-text-sm tw-cursor-pointer'>Profile</span>
      </div>
      <div class="tw-text-sm">
        <button class="
        tw-rounded-lg
        tw-bg-dark-green
        tw-text-white
        tw-w-44
        tw-p-3
        tw-mr-3
        ">
          Accreditations
        </button>
        <button class="
        tw-rounded-lg
        tw-bg-light-green
        tw-text-white
        tw-w-44
        tw-p-3
        ">
          Edit
        </button>
      </div>
    </div>

    <div class="
      tw-mt-8
      tw-flex
      tw-gap-8
      ">
      <div class="tw-relative">
        <img class="tw-rounded-full tw-w-40" src="~assets/img/user_img.png" alt="user_img">
        <i class='
        bx bxs-error-circle
        tw-absolute
        tw-right-1.5
        tw-bottom-44
        tw-text-light-green
        tw-text-4xl
        '></i>
      </div>
      <div class="tw-flex-1">

        <div class="">
          <h1 class="tw-font-bold tw-text-3xl tw-mb-3">Company's Name</h1>
          <p class="tw-text-sm tw-mb-2">Date of Incorporation: July 20th 2021</p>
          <p class="tw-text-sm">RC Number: 6787978</p>

          <div>
            <p class="tw-text-sm tw-mt-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lectus quis tortor senectus lobortis ullamcorper Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper
            </p>

            <p class="tw-text-sm tw-mt-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lectus quis tortor senectus lobortis ullamcorper Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper
            </p>

            <div class="tw-flex tw-items-end tw-gap-1 tw-mt-10">
              <span class="tw-text-dark-yellow tw-text-sm">Category</span>
              <i class='bx bxs-star tw-text-xs tw-text-light-green'></i>
              <span class="tw-text-dark-yellow tw-text-sm">Subcategory</span>
            </div>

          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'admin-company',
  layout: 'admin-default',
}
</script>

<style scoped>


</style>
