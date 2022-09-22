<template>
  <div class="tw-w-9/12 tw-mx-auto tw-pt-10 tw-space-y-10">
    <div class="tw-flex tw-gap-5">
      <input type="text"
        placeholder="Search Company Name"
        class="
        tw-px-7
        tw-py-3
        tw-rounded-lg
        tw-w-1/2
        tw-bg-gray-200
        tw-border-none
        focus:tw-outline-none"/>

      <div class="
        tw-px-7
        tw-py-3
        tw-rounded-lg
        tw-w-1/4
        tw-bg-gray-200
      ">
        <select class="
        tw-w-full
        tw-bg-gray-200
        tw-border-none
        focus:tw-outline-none
        ">
          <option value="">Category</option>
        </select>
      </div>

      <button class="
        tw-p-3
        tw-rounded-lg
        tw-bg-green-500
        tw-text-white
        tw-w-1/4
      ">
        Search
      </button>
    </div>

    <div v-if="results.length > 0">
      <div v-for="i in 6" :key="i"
        class="
        tw-mb-5
        tw-pb-5
        tw-border-b
        tw-border-gray-300
      ">
        <h1 class="tw-font-bold tw-text-2xl">Company's Name</h1>
        <div class="
          tw-flex
          tw-justify-between
          tw-items-center
          tw-mt-2
        ">
          <p class="tw-text-sm tw-w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lectus quis tortor senectus lobortis ullamcorper.
          </p>
          <button class="
            custom__button
            tw-w-28
            tw-h-9
            tw-rounded-2xl
            tw-bg-green-500
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
        <div class="tw-flex tw-items-end tw-gap-1 tw-mt-4">
          <span class="tw-text-dark-yellow tw-text-sm">Category</span>
          <i class='bx bxs-star tw-text-xs tw-text-light-green'></i>
          <span class="tw-text-dark-yellow tw-text-sm">Subcategory</span>
        </div>
      </div>
    </div>
    <div v-else class="
      tw-flex
      tw-flex-col
      tw-justify-center
      tw-items-center
    ">
      <p class="tw-text-center tw-mb-3">No Result found for search</p>
      <img class="tw-w-52" src="~assets/img/no_results_img.png" alt="no_results_img">

    </div>

  </div>
</template>

<script>
export default {
  name: 'search-result',
  layout: 'home',
  data() {
    return {
      results: [
        { name: 'no_results'}
      ]
    }
  },
}
</script>

<style scoped>
  .custom__button {
    /* @apply tw-opacity-30; */

    box-shadow: -4px 4px 0rem rgb(215 163 0 / 88%);
  }
</style>
