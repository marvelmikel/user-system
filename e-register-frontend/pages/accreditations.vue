<template>
  <div>
    <Banner title='Accreditation' :showButton="true" buttonTxt="Apply"/>

    <div class="
      tw-w-9/12
      tw-mx-auto
      tw-mt-8
      ">

      <div v-for="i in 3" :key="i"
        class="
        tw-mb-5
        tw-pb-3
        tw-border-b
        tw-border-gray-300
        tw-flex
      ">
        <div class="tw-flex-1">
          <h1 class="tw-font-bold tw-text-2xl tw-mb-2">Environmental cleaning</h1>
          <p class="tw-text-sm">baseline/impact assessment</p>
        </div>
        <div class="tw-flex-1 tw-flex tw-justify-between tw-items-center">
          <p class="tw-flex tw-items-center tw-gap-3">
            <i class='bx bxs-circle tw-text-xs tw-text-bright-green'></i>
            <span class="tw-text-xs">Approved</span>
          </p>
          <button class="
            custom__button
            tw-w-28
            tw-h-9
            tw-rounded-2xl
            tw-bg-bright-green
            tw-text-white
            tw-p-2
            tw-flex
            tw-items-center
            tw-justify-center
            tw-cursor-pointer
          ">
            <i class='bx bx-right-arrow-alt tw-text-2xl tw-text-white'></i>
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'accreditations',
  layout: 'home',
  middleware:['unauthenticated_user'],

}
</script>

<style scoped>
.custom__button {
    /* @apply tw-opacity-30; */
    box-shadow: -4px 4px 0rem rgba(176, 176, 176, 0.88);
  }
</style>
