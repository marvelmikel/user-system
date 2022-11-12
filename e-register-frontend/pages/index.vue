<template>
  <!-- <Tutorial/> -->
  <div>
    <section class="custom__gradient">
      <div class="tw-w-9/12 tw-mx-auto tw-mb-24 tw-grid tw-grid-cols-2 tw-gap-5 tw-items-end">
        <div class="tw-text-white  tw-mt-8 tw-space-y-3">
          <h1 class="tw-text-6xl">Environmental Consultants Accreditation</h1>
          <!-- <p>
            The accreditation of Environmental Consultants was initiated in 1992
            by the Federal Environmental Protection Agency (FEPA) which was
            later subsumed into the Federal Ministry of Environment in 1999. The
            primary objective of the exercise is to identify technically sound
            private and public organizations capable of rendering consultancy
            services to address the various environmental challenges/issues in
            Nigeria in accordance with existing environmental laws, regulations,
            standards and global best practices.
          </p> -->
        </div>

        <div>
          <div class="tw-flex tw-justify-center">
            <img
              class=""
              src="~assets/img/clarity_angle-double-line.svg"
              alt="double_line"
            />
          </div>

          <div class="tw-mt-14 tw-space-y-5">
            <input
              type="text"
              placeholder="Search Company Name"
              class="
                tw-px-7
                tw-py-3
                tw-rounded-lg
                tw-w-full
                tw-bg-dark-green
                tw-text-white
                tw-border-none
                focus:tw-outline-none
                tw-placeholder-white
              "
            />
            <div
              class="tw-px-7 tw-py-3 tw-rounded-lg tw-w-full tw-bg-dark-green"
            >
              <select
                class="
                  tw-w-full tw-bg-dark-green tw-text-white tw-border-none
                  focus:tw-outline-none
                  tw-placeholder-white
                "
              >
                <option value="">Category</option>
              </select>
            </div>
            <button
              class="
                tw-p-3 tw-rounded-lg tw-bg-green-500 tw-text-white tw-w-full
              "
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="tw-py-14">
      <div class="tw-w-9/12 tw-mx-auto">
        <h1 class="tw-text-4xl tw-font-extrabold tw-mb-8 tw-text-yellow-400">
          <span class="tw-text-black">Frequently Asked Questions.</span>
        </h1>

        <ListItem
          :item="question"
          v-for="(question, index) in $allFaqs"
          :key="index"
        />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "index",
  layout: "home",
  data() {
    return {};
  },
};
</script>


<style scoped>
.custom__gradient {
  background: linear-gradient(279.92deg, #097388 78.36%, #50c18d 112.5%);
  height: calc(100vh - 250px);
  display: flex;
  align-items: center;
}
</style>
