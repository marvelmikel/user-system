<template>
  <div class="">
    <div class="
    tw-grid
    tw-grid-cols-12
    tw-gap-5
    tw-text-sm
    tw-mb-14
    ">
      <input type="text"
        placeholder="Search Company Name"
        class="
        tw-px-7
        tw-py-3
        tw-rounded-lg
        tw-text-sm
        tw-col-span-4
        tw-bg-gray-200
        tw-border-none
        focus:tw-outline-none"
        />

      <div class="
        tw-col-span-2
        tw-flex
        tw-items-center
        tw-px-7
        tw-py-3
        tw-rounded-lg
        tw-bg-gray-200
      ">
        <select class="
        tw-w-full
        tw-text-sm
        tw-bg-gray-200
        tw-border-none
        focus:tw-outline-none
        ">
          <option value="">Category</option>
        </select>
      </div>

      <div class="
        tw-col-span-2
        tw-flex
        tw-items-center
        tw-px-7
        tw-py-3
        tw-rounded-lg
        tw-bg-gray-200
      ">
        <select class="
        tw-w-full
        tw-text-sm
        tw-bg-gray-200
        tw-border-none
        focus:tw-outline-none
        ">
          <option value="">Status</option>
        </select>
      </div>

      <button class="
        tw-col-span-3
        tw-p-3
        tw-rounded-lg
        tw-bg-dark-green
        tw-text-white
        tw-text-sm
      ">
        Search
      </button>

      <button class="
        tw-col-span-1
        tw-p-3
        tw-rounded-lg
        tw-bg-dark-green
        tw-text-white
        tw-text-sm
      ">
      <i class='bx bx-plus tw-text-2xl'></i>
      </button>
    </div>

    <div class="
        tw-mb-5
        tw-pb-3
        tw-border-b
        tw-border-gray-300
        tw-flex
        tw-justify-between
      ">
        <div class="">
          <h1 class="tw-font-bold tw-text-2xl tw-mb-2">Company's Name</h1>
          <p class="tw-text-sm">baseline/impact assessment</p>
        </div>

        <div class="
        tw-flex
        tw-justify-between
        tw-items-center">
          <p class="tw-flex tw-items-center tw-gap-3">
            <i class='bx bxs-circle tw-text-xs tw-text-bright-green'></i>
            <span class="tw-text-xs">Approved</span>
          </p>
        </div>

        <div class="
          tw-flex
          tw-items-center
          tw-gap-5">

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

          <i class='
          bx bxs-x-circle
          tw-text-5xl
          tw-cursor-pointer
          tw-text-red-600
          '></i>
        </div>

      </div>

  </div>
</template>

<script>
export default {
  name: 'admin-accreditation-two',
  layout: 'admin-default',
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
  box-shadow: -4px 4px 0rem rgba(176, 176, 176, 0.88);
}

</style>
