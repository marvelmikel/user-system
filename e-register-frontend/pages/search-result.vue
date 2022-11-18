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
        tw-bg-light-green
        tw-text-white
        tw-w-1/4
      ">
        Search
      </button>
    </div>

    <div v-if="loading" class="tw-flex tw-items-center tw-justify-center tw-mt-5">
      <div class="tw-w-full">
        <PuSkeleton :count="7"/>
      </div>
    </div>

    <div v-else>
      <div v-if="companies.length > 0">
        <div v-for="company in companies" :key="company._id"
          class="
          tw-mb-5
          tw-pb-5
          tw-border-b
          tw-border-gray-300
        ">
          <h1 class="tw-font-bold tw-text-2xl">{{ company.nameOfCompany }}</h1>
          <div class="
            tw-flex
            tw-justify-between
            tw-items-center
            tw-mt-2
          ">
            <p class="tw-text-sm tw-w-1/2">
              {{ company.rcNumber }}
            </p>
            <button @click="$router.push(`/company-details/${company._id}`)"
            class="
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
            <span class="tw-text-dark-yellow tw-text-sm">{{ company.phoneNumber }}</span>
            <i class='bx bxs-star tw-text-xs tw-text-light-green'></i>
            <span class="tw-text-dark-yellow tw-text-sm">{{ company.tin }}</span>
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

  </div>
</template>

<script>
import GetCompanies from "~/apollo/queries/user/getCompanies";

export default {
  name: 'search-result',
  layout: 'home',
  data() {
    return {
      companies: [],
      categoryId: null,
      search: null,
      loading: false
    }
  },
  mounted() {
    this.getCompanies()
  },

  methods: {

    async getCompanies(){
      let { categoryId, search } = this.$route.query
      this.categoryId = categoryId
      this.search = search

      try {
        this.loading = true;
        const res = await this.$apollo.query({
          query: GetCompanies,
          variables: {
            categoryId: this.categoryId,
            search: this.search,
            size: 15,
          },
        });
        console.log(res);

        this.companies = res.data.getAllUsers ?? [];

      } catch (err) {
      this.$throwError(err)
      }finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
  .custom__button {
    /* @apply tw-opacity-30; */

    box-shadow: -4px 4px 0rem rgb(215 163 0 / 88%);
  }
</style>
