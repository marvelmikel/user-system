<template>
  <div>
    <Banner title='Accreditation' :showButton="true" buttonTxt="Apply" @button-event="navigateToApplication"/>

    <div v-if="loadingAccreditations" class="tw-flex tw-items-center tw-justify-center tw-mt-5">
      <div class="tw-w-1/2">
        <PuSkeleton :count="6"/>
      </div>
    </div>
    <div v-else>
      <div v-if="accreditations.length > 0" class="
        tw-w-9/12
        tw-mx-auto
        tw-mt-8
        ">

        <div v-for="item in accreditations" :key="item._id"
          class="
          tw-mb-5
          tw-pb-3
          tw-border-b
          tw-border-gray-300
          tw-flex
        ">
          <div class="tw-flex-1">
            <h1 class="tw-font-bold tw-text-2xl tw-mb-2">{{item?.category?.name}}</h1>
            <p class="tw-text-sm">{{item?.subcategory?.name}}</p>
          </div>
          <div class="tw-flex-1 tw-flex tw-justify-between tw-items-center">

            <p v-if="item.accredited" class="tw-flex tw-items-center tw-gap-3">
              <i class='bx bxs-circle tw-text-xs tw-text-bright-green'></i>
              <span class="tw-text-xs">Approved</span>
            </p>
            <p v-if="!item.accredited" class="tw-flex tw-items-center tw-gap-3">
              <i class='bx bxs-circle tw-text-xs tw-text-red-500'></i>
              <span class="tw-text-xs">Pending</span>
            </p>

            <button @click="$router.push({path: '/accreditation'})"
            class="
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
          </div>
        </div>

      </div>

      <div v-else class="
        tw-flex
        tw-flex-col
        tw-justify-center
        tw-items-center
        tw-mt-10
      ">
        <h1 class="tw-text-center tw-my-3 tw-text-2xl tw-font-bold">
          No accreditations yet
        </h1>
        <img class="tw-w-52" src="~assets/img/no_results_img.png" alt="no_results_img">
      </div>
    </div>

  </div>
</template>

<script>

import GetAccreditations from "~/apollo/queries/user/getAccreditations";

export default {
  name: 'accreditations',
  layout: 'home',
  middleware:['unauthenticated_user'],
  data() {
    return {
      accreditations: [],
      loadingAccreditations: true
    }
  },

  mounted(){
    this.getAccreditations()
  },

  methods: {
    async getAccreditations(){
      try {
        this.loadingAccreditations = true;
        const res = await this.$apollo.query({
          query: GetAccreditations
        });
        this.accreditations = res.data.getUser.accreditation || [];
      } catch (err) {
      this.$throwError(err)
      }finally {
        this.loadingAccreditations = false;
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
    /* @apply tw-opacity-30; */
    box-shadow: -4px 4px 0rem rgba(176, 176, 176, 0.88);
  }
</style>
