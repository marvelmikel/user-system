<template>
  <div class="tw-p-48">
    <Banner title='Accreditation' :showButton="false" buttonTxt="Apply"/>

    <div class="
      tw-w-9/12
      tw-mx-auto
      tw-mt-8
      tw-relative
      ">

      <img class="
      tw-w-96
      tw-absolute
      tw-left-0
      tw-right-0
      tw-ml-auto
      tw-mr-auto
      "
      src="~assets/img/pending_stamp.svg" alt="expired_stamp" />

      <div class="tw-mt-10 tw-absolute tw-w-full">
        <div
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
          <div class="tw-flex-1 tw-flex tw-flex-col tw-justify-evenly">
            <p class="tw-text-sm">Date Accredited  30th August 2021</p>
            <p class="tw-text-sm">Expiry Date  30th August 2022</p>
          </div>
        </div>

        <p class="tw-mb-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper ullamcorper. Quis sit donec amet sit praesent ac. Eu augue libero lobortis convallis. Euismod ultrices non fermentum risus quisque cursus odio sed.</p>
        <p class="tw-mb-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper ullamcorper. Quis sit donec amet sit praesent ac. Eu augue libero lobortis convallis. Euismod ultrices non fermentum risus quisque cursus odio sed.</p>
        <button class="
        tw-rounded-lg
        tw-bg-green-500
        tw-text-white
        tw-w-40
        tw-p-2
        tw-text-sm
        ">
          Download Pdf
        </button>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'accreditation',
  layout: 'home',

}
</script>

<style scoped>
.content {
  /* position: absolute; */
  /* left: 0; */
  /* right: 0; */
  /* margin-left: auto; */
  /* margin-right: auto; */
  /* width: 28rem; */
}
</style>
