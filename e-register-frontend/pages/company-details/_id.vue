<template>
  <div class="tw-w-9/12 tw-mx-auto tw-pt-10 tw-space-y-10">
    <div
      v-if="loading"
      class="tw-flex tw-items-center tw-justify-center tw-mt-5"
    >
      <div class="tw-w-full">
        <PuSkeleton :count="9" />
      </div>
    </div>
    <div v-else>
      <div v-if="company" class="tw-mt-10">
        <Back />
        <h1 class="tw-font-bold tw-text-3xl tw-mb-3">
          {{ company.nameOfCompany }}
        </h1>
        <p class="tw-text-sm tw-mb-2">
          Date of Incorporation: {{ company.dateOfIncorporation || "None" }}
        </p>
        <p class="tw-text-sm">RC Number: {{ company.rcNumber || "None" }}</p>

        <div>
          <p class="tw-text-sm tw-mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis
            tortor senectus lobortis ullamcorper Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Lectus quis tortor senectus lobortis
            ullamcorper Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lectus quis tortor senectus lobortis ullamcorper Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Lectus quis tortor senectus
            lobortis ullamcorper
          </p>

          <p class="tw-text-sm tw-mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis
            tortor senectus lobortis ullamcorper Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Lectus quis tortor senectus lobortis
            ullamcorper Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lectus quis tortor senectus lobortis ullamcorper Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Lectus quis tortor senectus
            lobortis ullamcorper
          </p>

          <div class="tw-flex tw-items-end tw-gap-1 tw-mt-10">
            <span class="tw-text-dark-yellow tw-text-sm">{{
              company.phoneNumber
            }}</span>
            <i class="bx bxs-star tw-text-xs tw-text-light-green"></i>
            <span class="tw-text-dark-yellow tw-text-sm">{{
              company.email
            }}</span>
          </div>
        </div>
      </div>

      <NoItem v-else text="No accreditations yet" />
    </div>
  </div>
</template>

<script>
import GetUser from "~/apollo/queries/user/getUser";

export default {
  name: "company",
  layout: "home",
  // middleware:['unauthenticated_user'],

  data() {
    return {
      loading: false,
      company: null,
    };
  },

  mounted() {
    this.getCompany();
  },

  methods: {
    async getCompany() {
      try {
        this.loading = true;
        const res = await this.$apollo.query({
          query: GetUser,
          variables: {
            id: this.$route.params.id,
          },
        });
        console.log(res);
        this.company = res.data.getUserById || null;
      } catch (err) {
        this.$throwError(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
</style>
