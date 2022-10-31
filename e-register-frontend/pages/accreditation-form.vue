<template>
  <div>
    <Banner title='Accreditation' :showButton="false" buttonTxt="Apply"/>

    <div v-if="loadingCategories" class="tw-flex tw-items-center tw-justify-center tw-mt-5">
      <div class="tw-w-1/2">
        <PuSkeleton :count="6"/>
      </div>
    </div>
    <div v-else class="
      tw-w-5/12
      tw-mx-auto
      tw-mt-8
      ">

      <div class="form-control tw-mb-3">
        <label for="Company">Field</label>
        <select required v-model="category">
          <option :value="null" disabled>Choose</option>
          <option :value="category" v-for="category in categories" :key="category._id">{{ category.name }}</option>
        </select>
      </div>

      <div class="form-control tw-mb-3">
        <label for="Company">Specialty</label>
        <select required v-model="subCategory">
          <option :value="null" disabled>Choose</option>
          <option :value="item._id" v-for="item in subCategories" :key="item._id">{{ item.name }}</option>
        </select>
      </div>

      <!-- Upload Proof of Document -->
      <div>
        <p class="tw-mb-2">Upload Proof of Document</p>
        <input
          ref="proofofDocument"
          type="file"
          class="tw-p-3 tw-rounded-sm tw-w-full tw-border tw-hidden"
          @change.prevent="setProofOfDocument"
        />

        <div @click.prevent="$refs.proofofDocument.click()"
          class="
          tw-cursor-pointer
          tw-mb-4
          tw-py-12
          tw-rounded-lg
          tw-w-full
          tw-bg-gray-200
          tw-flex
          tw-justify-center
          tw-items-center
        ">
        <i class='bx bx-note tw-text-2xl'></i>
        </div>
      </div>
      <!-- End of Proof of Document-->

      <!-- Upload Supporting Document -->
      <div>
        <p class="tw-mb-2">Upload Supporting Document</p>
        <input
          ref="supportingDocument"
          type="file"
          class="tw-p-3 tw-rounded-sm tw-w-full tw-border tw-hidden"
          @change.prevent="setSupportingDocument"
        />

        <div @click.prevent="$refs.supportingDocument.click()"
          class="
          tw-cursor-pointer
          tw-mb-4
          tw-py-12
          tw-rounded-lg
          tw-w-full
          tw-bg-gray-200
          tw-flex
          tw-justify-center
          tw-items-center
        ">
        <i class='bx bx-note tw-text-2xl'></i>
        </div>
      </div>
      <!-- End of upload supporting document-->

      <button
      @click="apply"
      :disabled="applying"
      :class=" applying ? 'tw-opacity-20' : '' "
      class="
      tw-rounded-lg
      tw-bg-green-500
      tw-text-white
      tw-w-1/2
      tw-p-2
      tw-mb-10
      tw-text-sm
      ">
        Apply
      </button>

    </div>

  </div>
</template>

<script>
import GetCategories from "~/apollo/queries/admin/getCategories";
import CreateAccreditation from "~/apollo/mutations/user/createAccreditation";

export default {
  name: 'accreditation-form',
  layout: 'home',
  middleware:['unauthenticated_user'],
  data() {
    return {
      categories: [],
      subCategories: [],
      category: null,
      subCategory: null,
      loadingCategories: false,
      proofOfDocument: null,
      supportingDocument: null,
      applying: false
    }
  },
  mounted(){
    this.getCategories()
  },
  methods: {
    async apply(){
      // if (!this.category._id) {
      //   this.$toast.error('Please choose a field')
      // }
      // if (!this.subCategory) {
      //   this.$toast.error('Please choose a specialty')
      // }

      try {
        // let data_file = new FormData();
        // data_file.append("uploadProofOfDocument", this.proofOfDocument);
        // data_file.append("uploadSupportingDocument", this.supportingDocument);

        this.applying = true;
        const res = await this.$apollo.mutate({
          mutation: CreateAccreditation,
          variables: {
            categoryId: this.category._id,
            subcategoryId: this.subCategory,
            uploadProofOfDocument: this.proofOfDocument,
            uploadSupportingDocument: this.supportingDocument
          },
        });
        console.log(res);
        this.$toast.success('Application sent')
      } catch (errors) {
        console.log(errors);
        this.$throwError(errors)
      }finally{
        this.applying = false;
      }
    },

    async getCategories(){

      try {
        this.loadingCategories = true;
        const res = await this.$apollo.query({
          query: GetCategories
        });

        this.categories = res.data.findAllCategories ?? null;
      } catch (err) {
       this.$throwError(err)
      }finally {
        this.loadingCategories = false;
      }
    },

    setProofOfDocument(e){
      this.proofOfDocument = e.target.files[0]
    },

    setSupportingDocument(e){
      this.supportingDocument = e.target.files[0]
    }
  },

  watch: {
    category(category){
      this.subCategories = category.subcategories
      this.subCategory = null
    }
  }
}
</script>

<style>

.form-control textarea,
.form-control input,
.form-control select {
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  padding: .5rem;
  background: #e5e7eb;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  color: black;
  text-indent: 1rem;
  /* margin-top: .6rem; */
  font-size: 1rem;
}
</style>
