<template>
  <div class="">
    <Banner title='Accreditation' :showButton="isExpired" buttonTxt="Subscribe" @button-event="subscribe" :back="true"/>

    <div v-if="loadingAccreditation" class="tw-flex tw-items-center tw-justify-center tw-mt-8">
      <div class="tw-w-9/12">
        <PuSkeleton :count="9"/>
      </div>
    </div>
    <div v-else>

      <div v-if="accreditation" class="
        tw-w-9/12
        tw-mx-auto
        tw-mt-8
        tw-relative
        ">

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

        <!-- <img class="tw-w-100 tw-absolute tw-left-0 tw-right-0 tw-ml-auto tw-mr-auto"
        :src="require(`@/assets/img/${image}`)" alt="image" /> -->

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
              <p v-if="accreditation.status === 'APPROVED'" class="tw-text-sm">Date Accredited  {{ accreditation.dateAccredited }}</p>
              <p v-if="accreditation.status === 'EXPIRED'" class="tw-text-sm">Expiry Date  {{ accreditation.expiryDate }}</p>
            </div>
          </div>

          <!-- <p class="tw-mb-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper ullamcorper. Quis sit donec amet sit praesent ac. Eu augue libero lobortis convallis. Euismod ultrices non fermentum risus quisque cursus odio sed.</p>
          <p class="tw-mb-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper ullamcorper. Quis sit donec amet sit praesent ac. Eu augue libero lobortis convallis. Euismod ultrices non fermentum risus quisque cursus odio sed.</p> -->
          <button
          v-if="accreditation.status === 'APPROVED'"
          class="
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

      <NoItem v-else />
    </div>

  </div>
</template>

<script>
import GetAccreditation from "~/apollo/queries/user/getAccreditation";

export default {
  name: 'accreditation',
  layout: 'home',
  middleware:['unauthenticated_user'],
  data() {
    return {
      accreditation: null,
      loadingAccreditation: false
    }
  },
  mounted(){
    this.getAccreditation()
  },

  computed: {
    isExpired(){
      if (this.accreditation) {
        return this.accreditation.status === 'EXPIRED' ? true : false;
      }
      return false;
    },

    image(){
      if (this.accreditation) {
        if (this.accreditation.status === 'EXPIRED') {
          return 'expired_stamp.svg'
        }
        if (this.accreditation.status === 'APPROVED') {
          return 'approved_stamp.svg'
        }
        if (this.accreditation.status === 'PENDING') {
          return 'pending_stamp.svg'
        }
        return ''
      }
    }
  },

  methods: {
    async getAccreditation(){
      try {
        this.loadingAccreditation = true;
        const res = await this.$apollo.query({
          query: GetAccreditation,
          variables: {
            id: this.$route.params.id,
          },
        });
        console.log(res);
        this.accreditation = res.data.getAccreditationById[0] || null;
      } catch (err) {
        this.$throwError(err)
      }finally {
        this.loadingAccreditation = false;
      }
    },

    subscribe(){
      console.log('Subscribing');
    }
  }
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
