<template>
  <div class="tw-w-9/12 tw-mx-auto tw-pt-10 tw-space-y-10">

    <div class="tw-mt-10">
      <h1 class="tw-font-bold tw-text-3xl tw-mb-3">Company's Name</h1>
      <p class="tw-text-sm tw-mb-2">Date of Incorporation: July 20th 2021</p>
      <p class="tw-text-sm">RC Number: 6787978</p>

      <div>
        <p class="tw-text-sm tw-mt-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Lectus quis tortor senectus lobortis ullamcorper Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper
        </p>

        <p class="tw-text-sm tw-mt-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Lectus quis tortor senectus lobortis ullamcorper Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus quis tortor senectus lobortis ullamcorper
        </p>

        <div class="tw-flex tw-items-end tw-gap-1 tw-mt-10">
          <span class="tw-text-dark-yellow tw-text-sm">Category</span>
          <i class='bx bxs-star tw-text-xs tw-text-light-green'></i>
          <span class="tw-text-dark-yellow tw-text-sm">Subcategory</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'company',
  layout: 'home',
  // middleware:['unauthenticated_user'],

  data() {
    return {
      loading: false,
      company: null
    }
  },

  mounted(){
    // this.getCompany()
  },

  methods: {
    async getCompany(){
      // try {
      //   this.loading = true;
      //   const res = await this.$apollo.query({
      //     query: GetCompany,
      //     variables: {
      //       id: this.$route.params.id,
      //     },
      //   });
      //   console.log(res);
      //   this.company = res.data.getCompanyById[0] || null;
      // } catch (err) {
      //   this.$throwError(err)
      // }finally {
      //   this.loading = false;
      // }
    }
  }
}
</script>

<style scoped>

</style>
