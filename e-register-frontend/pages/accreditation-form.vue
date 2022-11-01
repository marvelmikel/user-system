<template>
  <div>
    <Banner title="Accreditation" :showButton="false" buttonTxt="Apply" />

    <div
      v-if="loadingCategories"
      class="tw-flex tw-items-center tw-justify-center tw-mt-5"
    >
      <div class="tw-w-1/2">
        <PuSkeleton :count="6" />
      </div>
    </div>
    <div v-else class="tw-w-5/12 tw-mx-auto tw-mt-8">
      <div class="form-control tw-mb-3">
        <label for="Company">Field</label>
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

      <div class="form-control tw-mb-3">
        <label for="Company">Specialty</label>
        <select required v-model="subCategory">
          <option :value="null" disabled>Choose</option>
          <option
            :value="item._id"
            v-for="item in subCategories"
            :key="item._id"
          >
            {{ item.name }}
          </option>
        </select>
      </div>

      <!-- Upload Proof of Document -->
      <div class="tw-mb-4">
        <p class="tw-mb-2">Upload Proof of Document</p>
        <input
          ref="proofofDocument"
          type="file"
          class="tw-p-3 tw-rounded-sm tw-w-full tw-border tw-hidden"
          @change.prevent="setProofOfDocument"
        />

        <div
          @click.prevent="$refs.proofofDocument.click()"
          class="
            tw-cursor-pointer
            tw-py-12
            tw-rounded-lg
            tw-w-full
            tw-bg-gray-200
            tw-flex
            tw-justify-center
            tw-items-center
          "
        >
          <i class="bx bx-note tw-text-2xl"></i>
        </div>

        <div
          v-if="proofOfDocument"
          class="tw-flex tw-items-center tw-mt-1 tw-gap-1"
        >
          <span class="tw-text-xs tw-text-gray-500">
            {{ proofOfDocument.name || "" }}
          </span>
          <i
            @click="removeProofOfDocument"
            class="bx bx-trash tw-text-red-600 tw-cursor-pointer"
          ></i>
        </div>
      </div>
      <!-- End of Proof of Document-->

      <!-- Upload Supporting Document -->
      <div class="tw-mb-4">
        <p class="tw-mb-2">Upload Supporting Document</p>
        <input
          ref="supportingDocument"
          type="file"
          class="tw-p-3 tw-rounded-sm tw-w-full tw-border tw-hidden"
          @change.prevent="setSupportingDocument"
        />

        <div
          @click.prevent="$refs.supportingDocument.click()"
          class="
            tw-cursor-pointer
            tw-py-12
            tw-rounded-lg
            tw-w-full
            tw-bg-gray-200
            tw-flex
            tw-justify-center
            tw-items-center
          "
        >
          <i class="bx bx-note tw-text-2xl"></i>
        </div>

        <div
          v-if="supportingDocument"
          class="tw-flex tw-items-center tw-mt-1 tw-gap-1"
        >
          <span class="tw-text-xs tw-text-gray-500">
            {{ supportingDocument.name || "" }}
          </span>
          <i
            @click="removeSupportingDocument"
            class="bx bx-trash tw-text-red-600 tw-cursor-pointer"
          ></i>
        </div>
      </div>
      <!-- End of upload supporting document-->

      <button
        @click="apply"
        :disabled="applying"
        :class="applying ? 'tw-opacity-20' : ''"
        class="
          tw-rounded-lg
          tw-bg-green-500
          tw-text-white
          tw-w-1/2
          tw-p-2
          tw-mb-10
          tw-text-sm
        "
      >
        Apply
      </button>
    </div>
  </div>
</template>

<script>
import GetCategories from "~/apollo/queries/admin/getCategories";
import CreateAccreditation from "~/apollo/mutations/user/createAccreditation";

export default {
  name: "accreditation-form",
  layout: "home",
  middleware: ["unauthenticated_user"],
  data() {
    return {
      categories: [],
      subCategories: [],
      categoryId: null,
      subCategory: null,
      loadingCategories: false,
      proofOfDocument: null,
      supportingDocument: null,
      applying: false,
      step: 1,
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    async apply() {
      let validate = this.validateInputs();

      if (!validate) {
        return this.$toast.error("All fields are required");
      }
      console.log(
        this.proofOfDocument,
        this.categoryId,
        this.subCategory,
        this.supportingDocument
      );
      try {
        this.applying = true;
        const res = await this.$apollo.mutate({
          mutation: CreateAccreditation,
          variables: {
            categoryId: this.categoryId,
            subcategoryId: this.subCategory,
            uploadProofOfDocument: this.proofOfDocument,
            uploadSupportingDocument: this.supportingDocument,
          },
          context: {
            hasUpload: true,
          },
        });
        console.log(res);
        this.$toast.success("Application sent");
      } catch (errors) {
        console.log(errors);
        this.$throwError(errors);
      } finally {
        this.applying = false;
      }
    },

    validateInputs() {
      if (!this.categoryId) {
        return false;
      }
      if (!this.subCategory) {
        return false;
      }
      if (!this.proofOfDocument) {
        return false;
      }
      if (!this.supportingDocument) {
        return false;
      }
      return true;
    },

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

    setProofOfDocument(e) {
      this.proofOfDocument = e.target.files[0];
    },

    setSupportingDocument(e) {
      this.supportingDocument = e.target.files[0];
    },

    removeProofOfDocument() {
      this.proofOfDocument = null;
    },

    removeSupportingDocument() {
      this.supportingDocument = null;
    },
  },

  watch: {
    categoryId(categoryId) {
      this.categories.filter((category) => {
        if (category._id === categoryId) {
          this.subCategories = category.subcategories;
        }
      });
      this.subCategory = null;
    },
  },
};
</script>

<style scoped>
</style>
