<template>
    <div>
    <Banner title='Accreditation' :showButton="false" buttonTxt="Apply"/>

    <div class="
      tw-w-5/12
      tw-mx-auto
      tw-mt-8
      ">
      <p class="tw-mb-1">Field</p>
      <div class="
        tw-mb-4
        tw-px-7
        tw-py-3
        tw-rounded-lg
        tw-w-full
        tw-bg-gray-200
      ">
        <select class="
        tw-w-full
        tw-bg-gray-200
        tw-border-none
        focus:tw-outline-none
        ">
          <option value="">Environmental cleaning</option>
        </select>
      </div>

      <p class="tw-mb-1">Specialty</p>
      <div class="
        tw-mb-4
        tw-px-7
        tw-py-3
        tw-rounded-lg
        tw-w-full
        tw-bg-gray-200
      ">
        <select class="
        tw-w-full
        tw-bg-gray-200
        tw-border-none
        focus:tw-outline-none
        ">
          <option value="">Baseline/impact assessment</option>
        </select>
      </div>

      <p class="tw-mb-2">Upload Proof of Payment</p>
      <div class="
        tw-mb-4
        tw-py-12
        tw-rounded-lg
        tw-w-full
        tw-bg-gray-200
        tw-flex
        tw-justify-center
        tw-items-center
      ">
      <i class='bx bx-note tw-text-2xl'></i>
      </div>

      <p class="tw-mb-2">Upload Supporting Document one</p>
      <div class="
        tw-mb-8
        tw-py-12
        tw-rounded-lg
        tw-w-full
        tw-bg-gray-200
        tw-flex
        tw-justify-center
        tw-items-center
      ">
      <i class='bx bx-note tw-text-2xl'></i>
      </div>

      <button class="
      tw-rounded-lg
      tw-bg-green-500
      tw-text-white
      tw-w-1/2
      tw-p-2
      tw-mb-10
      tw-text-sm
      ">
        Apply
      </button>

    </div>

  </div>
</template>

<script>
export default {
  name: 'accreditation-form',
  layout: 'home',
}
</script>

<style>

</style>
