<template>
  <div>
    <div class="tw-bg-gray-200">
      <div class="
      tw-w-9/12
      tw-mx-auto
      tw-bg-gray-200
      tw-py-10
      tw-flex
      tw-justify-between
      ">
        <h1 class="
        tw-text-4xl
        tw-text-gray-500
        tw-font-bold
        ">
        Company
        </h1>
        <button class="
        tw-rounded-lg
        tw-bg-light-green
        tw-text-white
        tw-w-32
        ">
          Edit
        </button>
      </div>
    </div>

    <div>

      <div class="
      tw-w-9/12
      tw-mx-auto
      tw-mt-8
      tw-flex
      tw-gap-16
      ">
        <div class="tw-relative">
          <img class="tw-rounded-full tw-w-40" src="~assets/img/user_img.png" alt="user_img">
          <i class='
          bx bxs-error-circle
          tw-absolute
          tw-right-1.5
          tw-top-0
          tw-text-light-green
          tw-text-4xl
          '></i>
        </div>
        <div class="tw-flex-1">
          <InputItem :label="'Name'" :value="'John Doe'"/>
          <InputItem :label="'Location'" :value="'Abuja'"/>
          <InputItem :label="'Address'" :value="'plot 238, shehu shagri way, CBD'"/>
          <InputItem :label="'RC Number'" :value="'562736'"/>
          <InputItem :label="'Date Of Inc'" :value="'6th July 2021'"/>
          <InputItem :label="'TIN'" :value="'67432'"/>
          <InputItem :label="'Phone'" :value="'johndoe@gmail.com'"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'company',
  layout: 'home',
  middleware:'unauthenticated_user',


}
</script>

<style>

</style>
