<template>
  <div>
    <div class="
    tw-mb-10
    tw-flex
    tw-justify-between
    ">
      <div class="
      tw-flex
      tw-items-center
      tw-gap-4
      "
      @click="$router.push({ path: `/admin/accreditations`})"
      >
        <i class='
        bx bx-chevron-left
        tw-text-5xl
        tw-cursor-pointer
        '></i>
        <span class='tw-text-sm tw-cursor-pointer'>Back</span>
        <!-- <span class='tw-text-2xl'>|</span>
        <span class='tw-text-sm tw-cursor-pointer'>Profile</span> -->
      </div>

      <div class="
        tw-flex
        tw-items-center
        tw-px-7
        tw-py-3
        tw-rounded-lg
        tw-bg-gray-200
        tw-w-60
      ">
        <select class="
        tw-w-full
        tw-text-sm
        tw-bg-gray-200
        tw-border-none
        focus:tw-outline-none
        ">
          <option value="">Status</option>
        </select>
      </div>
    </div>

    <div v-if="loadingAccreditation" class="tw-w-full">
      <PuSkeleton :count="9"/>
    </div>

    <div v-else>
      <div v-if="accreditation" class="
        tw-mt-8
        tw-relative
        ">

        <!-- <img class="
        tw-w-100
        tw-absolute
        tw-left-0
        tw-right-0
        tw-ml-auto
        tw-mr-auto
        "
        src="~assets/img/approved_stamp.svg" alt="expired_stamp" /> -->
        <img v-if="accreditation.status === 'PENDING'" class="tw-w-100 tw-absolute
        tw-left-0 tw-right-0
        tw-ml-auto tw-mr-auto
        " src="~assets/img/pending_stamp.svg" alt="pending_stamp" />
        <img v-if="accreditation.status === 'APPROVED'" class="tw-w-100 tw-absolute
        tw-left-0 tw-right-0
        tw-ml-auto tw-mr-auto
        " src="~assets/img/approved_stamp.svg" alt="approved_stamp" />
        <img v-if="accreditation.status === 'EXPIRED'" class="tw-w-100 tw-absolute
        tw-left-0 tw-right-0
        tw-ml-auto tw-mr-auto
        " src="~assets/img/expired_stamp.svg" alt="expired_stamp" />

        <div class="tw-mt-10 tw-absolute tw-w-full">
          <div
            class="
            tw-mb-5
            tw-pb-3
            tw-border-b
            tw-border-gray-300
            tw-flex
          ">
            <div class="tw-flex-1 tw-capitalize">
              <h1 class="tw-font-bold tw-text-2xl tw-mb-2">
                {{ accreditation.category.name || '' }}
              </h1>
              <p class="tw-text-sm">
                {{ accreditation.subcategory.name || '' }}
              </p>
            </div>
            <div class="tw-flex-1 tw-flex tw-flex-col tw-justify-evenly">
              <p class="tw-text-sm">Date Created  {{ accreditation.dateCreated }}</p>
              <p v-if="accreditation.status !== 'PENDING'" class="tw-text-sm">Date Accredited  {{ accreditation.dateAccredited }}</p>
              <p v-if="accreditation.status === 'EXPIRED'" class="tw-text-sm">Expiry Date  {{ accreditation.expiryDate }}</p>
            </div>
          </div>

          <p class="tw-mb-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper ullamcorper. Quis sit donec amet sit praesent ac. Eu augue libero lobortis convallis. Euismod ultrices non fermentum risus quisque cursus odio sed.</p>

          <div class="tw-mt-16">
            <div class="
            tw-flex
            tw-items-center
            tw-justify-between
            tw-mb-4
            ">
              <p class="tw-text-sm">Document One</p>
              <button class="
              tw-rounded-lg
              tw-bg-green-500
              tw-text-white
              tw-w-40
              tw-p-2
              tw-text-sm
              ">
                Preview
              </button>
            </div>


          </div>
        </div>

      </div>
      <NoItem v-else />

    </div>

  </div>
</template>

<script>
import GetAccreditationByAdmin from "~/apollo/queries/admin/getAccreditationByAdmin";

export default {
  name: 'admin-accreditation',
  layout: 'adminDefault',

  data() {
    return {
      accreditation: null,
      loadingAccreditation: false
    }
  },
  mounted(){
    this.getAccreditation()
  },

  methods: {
    async getAccreditation(){
      try {
        this.loadingAccreditation = true;
        const res = await this.$apollo.query({
          client: 'admin',
          query: GetAccreditationByAdmin,
          variables: {
            id: this.$route.params.id,
          },
        });
        console.log(res);
        this.accreditation = res.data.getAccreditationByAdmin[0] || null;
      } catch (err) {
        this.$throwError(err)
      }finally {
        this.loadingAccreditation = false;
      }
    },
  }


}
</script>

<style>

</style>
