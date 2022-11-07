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
        placeholder="Search Name"
        class="
        tw-px-7
        tw-rounded-lg
        tw-text-sm
        tw-col-span-4
        tw-bg-gray-200
        tw-border-none
        focus:tw-outline-none"
        />

      <div class="form-control tw-col-span-2">
        <select required>
          <option disabled>Category</option>
          <option value="1">Category</option>
          <option value="1">Category</option>
        </select>
      </div>

      <div class="form-control tw-col-span-2">
        <select required>
          <option disabled>Subcategory</option>
          <option value="1">Status</option>
          <option value="1">Status</option>
        </select>
      </div>

      <button class="
        tw-col-span-3
        tw-rounded-lg
        tw-bg-dark-green
        tw-text-white
        tw-text-sm
      ">
        Search
      </button>

      <button class="
        tw-col-span-1
        tw-rounded-lg
        tw-bg-dark-green
        tw-text-white
        tw-text-sm
      ">
      <i class='bx bx-plus tw-text-2xl'></i>
      </button>
    </div>

    <div v-if="loadingAccreditations" class="tw-w-full">
      <PuSkeleton :count="9"/>
    </div>
    <div v-else>
      <div v-if="accreditations.length > 0">
        <div v-for="accreditation in accreditations" :key="accreditation._id"
        class="
          tw-mb-5
          tw-pb-3
          tw-border-b
          tw-border-gray-300
          tw-flex
          tw-justify-between
        ">
          <div class="">
            <h1 class="tw-font-bold tw-text-2xl tw-mb-2 tw-capitalize">
              {{accreditation?.category?.name}} / <span class="tw-font-normal tw-text-xs">{{accreditation?.subcategory?.name}}</span>
            </h1>
            <!-- <p class="tw-text-sm">baseline/impact assessment</p> -->
          </div>

          <div class="tw-flex tw-justify-between tw-items-center">
            <p v-if="accreditation.status === 'APPROVED'" class="tw-flex tw-items-center tw-gap-3">
              <i class='bx bxs-circle tw-text-xs tw-text-bright-green'></i>
              <span class="tw-text-xs">Approved</span>
            </p>
            <p v-if="accreditation.status === 'PENDING'" class="tw-flex tw-items-center tw-gap-3">
              <i class='bx bxs-circle tw-text-xs tw-text-yellow-500'></i>
              <span class="tw-text-xs">Pending</span>
            </p>
            <p v-if="accreditation.status === 'EXPIRED'" class="tw-flex tw-items-center tw-gap-3">
              <i class='bx bxs-circle tw-text-xs tw-text-red-600'></i>
              <span class="tw-text-xs">Expired</span>
            </p>
          </div>

          <div class="
            tw-flex
            tw-items-center
            tw-gap-5">

            <!-- <button class="
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
            </button> -->
            <i @click="$router.push(`/admin/accreditation/${accreditation._id}`)"
              class='bx bx-right-arrow-alt
              tw-text-4xl
              tw-cursor-pointer
              hover:tw-text-gray-500
              '></i>

            <i class='
            bx bxs-x-circle
            tw-text-5xl
            tw-cursor-pointer
            tw-text-red-600
            '></i>
          </div>

        </div>
      </div>

      <NoItem v-else text="No accreditations yet" />
    </div>

  </div>
</template>

<script>
import GetAccreditationsByAdmin from "~/apollo/queries/admin/getAccreditationsByAdmin";

export default {
  name: 'company-accreditations',
  layout: 'adminDefault',
  data() {
    return {
      accreditations: [],
      loadingAccreditations: false
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
          client: 'admin',
          query: GetAccreditationsByAdmin,
          variables: {
            userId: this.$route.params.id
          },
        });
        if (res.data) {
          if (res.data.getAccreditationsByAdmin) {
            this.accreditations = res.data.getAccreditationsByAdmin || [];
          }
        }
      } catch (err) {
      this.$throwError(err)
      }finally {
        this.loadingAccreditations = false;
      }
    },
  }
}
</script>

<style scoped>
.custom__button {
  box-shadow: -4px 4px 0rem rgba(176, 176, 176, 0.88);
}

</style>
