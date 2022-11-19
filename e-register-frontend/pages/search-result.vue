<template>
  <div class="tw-w-9/12 tw-mx-auto tw-pt-10 tw-space-y-10">
    <div class="tw-flex tw-gap-5">
      <input v-model="search" type="text"
        placeholder="Search Company Name"
        class="
        tw-px-7
        tw-py-3
        tw-rounded-lg
        tw-w-1/2
        tw-bg-gray-200
        tw-border-none
        focus:tw-outline-none"/>

        <!-- tw-py-3 -->
        <!-- tw-px-7 -->
      <div class="
        tw-rounded-lg
        tw-w-1/4
        tw-bg-gray-200
      ">

        <div class="form-control">
          <!-- <label for="Company">Field</label> -->
          <select required v-model="categoryId">
            <option :value="null" disabled>Choose</option>
            <option
              :value="category._id"
              v-for="category in categories"
              :key="category._id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <!-- <select class="
        tw-w-full
        tw-bg-gray-200
        tw-border-none
        focus:tw-outline-none
        ">
          <option value="">Category</option>
        </select> -->
      </div>

      <button @click.prevent="getCompanies"
      class="
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
          tw-py-3
          tw-border-b
          tw-border-gray-300
          tw-flex
          tw-justify-between
          tw-items-end
        ">
         <div class="tw-space-y-2">
           <p class="tw-font-bold tw-text-2xl">{{ company.nameOfCompany }} / <span class="tw-text-sm tw-w-1/2">
              {{ company.rcNumber }}
            </span></p>
          
          <div class="tw-flex tw-items-end tw-gap-1">
            <span class="tw-text-dark-yellow tw-text-sm">{{ company.phoneNumber }}</span>
            <i class='bx bxs-star tw-text-xs tw-text-light-green'></i>
            <span class="tw-text-dark-yellow tw-text-sm">{{ company.tin }}</span>
          </div>
         </div>
         <p class="hover:tw-underline tw-text-green-500 tw-cursor-pointer"  @click="$router.push(`/company-details/${company._id}`)">View</p>
         
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
import GetCategories from "~/apollo/queries/admin/getCategories";

export default {
  name: 'search-result',
  layout: 'home',
  data() {
    return {
      companies: [],
      categoryId: null,
      categories: [],
      search: null,
      loading: false,
      loadingCategories: false,
    }
  },
  mounted() {
    let { categoryId, search } = this.$route.query
    this.categoryId = categoryId
    this.search = search

    this.getCompanies()
    this.getCategories();
  },

  methods: {
    async getCategories() {
      try {
        this.loadingCategories = true;
        const res = await this.$apollo.query({
          query: GetCategories,
        });

        this.categories = res.data.findAllCategories ?? null;
      } catch (err) {
        this.$throwError(err);
      } finally {
        this.loadingCategories = false;
      }
    },
    async getCompanies(){

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
