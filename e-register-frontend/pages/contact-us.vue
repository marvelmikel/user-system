<template>
  <!-- <Tutorial/> -->
  <div>

    <section class="
      custom__gradient
      "
      >
      <div class="
      tw-w-9/12
      tw-mx-auto
      tw-pt-16
      tw-pb-12
      tw-text-white
      ">
        <h1 class="tw-font-bold tw-text-4xl tw-mb-10">Contact Us</h1>

        <div class="
          tw-grid
          tw-grid-cols-3
          tw-gap-6
          tw-mb-5
          ">
          <div class="tw-col-span-1">
            <input type="text"
              placeholder="Full Name"
              class="
              tw-px-7
              tw-py-3
              tw-rounded-lg
              tw-w-full
              tw-bg-dark-green
              tw-text-white
              tw-border-none
              focus:tw-outline-none
              tw-placeholder-white"/>
          </div>
          <div class="tw-col-span-1">
            <input type="text"
              placeholder="Email Address"
              class="tw-px-7
              tw-py-3
              tw-rounded-lg
              tw-w-full
              tw-bg-dark-green
              tw-text-white
              tw-border-none
              focus:tw-outline-none
              tw-placeholder-white"/>
          </div>
          <div class="tw-col-span-1">
            <input type="text"
              placeholder="Phone"
              class="
              tw-px-7
              tw-py-3
              tw-rounded-lg
              tw-w-full
              tw-bg-dark-green
              tw-text-white
              tw-border-none
              focus:tw-outline-none
              tw-placeholder-white"/>
          </div>
        </div>

        <div class="
        tw-mb-5
        ">
          <textarea class="
          tw-p-8
          tw-rounded-lg
          tw-w-full
          tw-bg-dark-green
          tw-text-white
          tw-border-none
          focus:tw-outline-none
          tw-placeholder-white
          "
          placeholder="Message"
          cols="30"
          rows="6"></textarea>
        </div>

        <button class="
        tw-rounded-lg
        tw-bg-light-green
        tw-text-white
        tw-w-40
        tw-p-2
        ">
          Apply
        </button>



      </div>
    </section>

  
    <section class="custom__gradie tw-py-5 tw-text-whit">
      <div class="
      tw-w-9/12
      tw-mx-auto
      tw-flex
      tw-gap-32
      tw-justify-between
      tw-items-center
      ">
      <div class="tw-flex tw-items-center tw-gap-2">
         <im class="tw-w-16" src="~/assets/images/black.svg" alt="coat_of_arms_of_nigeria"/>
         <p>Lorem ipsum dolor  beatae id dicta sed cupiditate, nesciunt repellendus libero dolorem modi nulla, odio ipsum fuga laborum. amet</p>
      </div>
        <div class="
        tw-flex
        tw-text-2xl
        tw-gap-4
        ">
          <i class='bx bxl-facebook-circle'></i>
          <i class='bx bxl-instagram-alt'></i>
          <i class='bx bxl-twitter' ></i>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: "contact-us",
  layout: "home",
  data() {
    return {};
  },
};
</script>


<style scoped>
.custom__gradient {
  background: linear-gradient(279.92deg, #097388 78.36%, #50c18d 112.5%);
}
</style>
