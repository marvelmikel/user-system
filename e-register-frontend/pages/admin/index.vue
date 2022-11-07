<template>
  <div class="">
    <div class="tw-flex tw-gap-5 tw-text-sm">
      <input type="text"
        placeholder="Search Company Name"
        class="
        tw-px-7
        tw-py-3
        tw-rounded-lg
        tw-text-sm
        tw-w-1/2
        tw-bg-gray-200
        tw-border-none
        focus:tw-outline-none"
        />

      <div class="
        tw-px-7
        tw-py-3
        tw-rounded-lg
        tw-w-1/4
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

      <button class="
        tw-p-3
        tw-rounded-lg
        tw-bg-dark-green
        tw-text-white
        tw-w-1/4
        tw-text-sm
      ">
        Search
      </button>
    </div>

    <div v-if="loading" class="tw-flex tw-items-center tw-justify-center tw-mt-5">
      <div class="tw-w-full">
        <PuSkeleton :count="9"/>
      </div>
    </div>
    <div class="tw-mt-12" v-else>
      <div v-if="companies.length > 0">
        <div v-for="company in companies" :key="company._id"
          class="
          tw-mb-5
          tw-pb-5
          tw-border-b
          tw-border-gray-300
        ">
          <!-- <h1 class="tw-font-bold tw-text-2xl">{{ company.nameOfCompany || 'No name provided' }}</h1> -->
          <div class="
            tw-flex
            tw-justify-between
            tw-items-center
            tw-mt-2
          ">
            <p class="tw-font-bold tw-text-2xl tw-w-1/2">
              {{ company.nameOfCompany || 'No name provided' }}
            </p>
            <!-- <button class="
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
            </button> -->

            <i @click="$router.push(`admin/company/${company._id}`)"
            class='bx bx-right-arrow-alt
            tw-text-4xl
            tw-cursor-pointer
            hover:tw-text-gray-500
            '></i>

          </div>
          <!-- <div class="tw-flex tw-items-end tw-gap-1 tw-mt-4">
            <span class="tw-text-gray-400 tw-text-sm">Category</span>
            <i class='bx bxs-star tw-text-xs tw-text-light-green'></i>
            <span class="tw-text-gray-400 tw-text-sm">Subcategory</span>
          </div> -->
        </div>
      </div>

      <NoItem v-else />
    </div>

  </div>
</template>

<script>
import GetAllUsers from "~/apollo/queries/admin/getAllUsers";

export default {
  name: 'admin-index',
  layout: 'adminDefault',
  middleware:['unauthenticated_admin'],
  data() {
    return {
      loading: false,
      companies: []
    }
  },

  mounted(){
    this.getAllUsers()
  },

  methods: {
    async getAllUsers(){
      try {
        this.loading = true;
        const res = await this.$apollo.query({
          client: 'admin',
          query: GetAllUsers,
          variables: {
            size: 25
          },

        });
        console.log(res);
        this.companies = res.data.getAllUsersByAdmin || [];
      } catch (err) {
      this.$throwError(err)
      }finally {
        this.loading = false;
      }
    },

    navigateToApplication(){
      this.$router.push({ path: '/accreditation-form' })
    }
  }
}
</script>

<style scoped>
.custom__button {
  box-shadow: -4px 4px 0rem rgba(176, 176, 176, 0.88);
}

</style>
