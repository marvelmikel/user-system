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
        placeholder="Search Category"
        class="
        tw-col-start-1 tw-col-end-4
        tw-px-7
        tw-py-2
        tw-rounded-lg
        tw-text-sm
        tw-bg-gray-200
        tw-border-none
        focus:tw-outline-none"
        />



      <!-- <button class="
        tw-col-span-3
        tw-p-3
        tw-rounded-lg
        tw-bg-dark-green
        tw-text-white
        tw-text-sm
      ">
        Search
      </button> -->

      <button class="
        tw-col-start-11 tw-col-end-13
        tw-flex
        tw-justify-center
        tw-items-center
        tw-p-2
        tw-rounded-lg
        tw-bg-dark-green
        tw-text-white
        tw-text-sm
      "
      @click="isOpen = true"
      >
      <i class='bx bx-plus tw-text-2xl'></i>
      New Category
      </button>
    </div>

    <div
      v-for="(data) in results" :key="data.id"
      class="
        tw-mb-5
        tw-pb-3
        tw-border-b
        tw-border-gray-300
        tw-flex
        tw-justify-between
      ">

      <p class="tw-flex tw-items-center">{{ data.name }}</p>

      <div class="tw-flex tw-items-center">
        <!-- <ToggleBtn :state="data.activated" :id="data.id" @checkedevent="deactivateAdmin"/> -->
      </div>

      <div class="
        tw-flex
        tw-items-center
        tw-gap-5">

        <button class="
          custom__button
          tw-w-32
          tw-h-8
          tw-rounded-2xl
          tw-bg-dark-green
          tw-text-white
          tw-p-2
          tw-flex
          tw-items-center
          tw-justify-center
          tw-cursor-pointer
        ">
          <!-- <i class='bx bx-right-arrow-alt tw-text-2xl tw-text-white'></i> -->
          <span class="tw-text-xs">Add Subcategory</span>
        </button>

        <i class='
        bx bxs-x-circle
        tw-text-4xl
        tw-cursor-pointer
        tw-text-red-600
        '></i>
      </div>

    </div>




    <Modal
    :button="false"
      :customClass="['tw-w-2/5']"
      :isOpen="isOpen"
      @close-modal="isOpen = false"
    >
      <div class="tw-my-5 tw-space-y-5 tw-px-4 tw-pb-3">
        <h1 class="tw-text-lg tw-text-black">
          Create Category
        </h1>

        <input type="text"
        v-model="category"
        placeholder="Category"
        class="
        tw-px-7
        tw-py-3
        tw-rounded-lg
        tw-text-sm
        tw-bg-gray-200
        tw-border-none
        focus:tw-outline-none
        tw-w-full
        "
        />

        <div class="tw-flex tw-gap-3">
          <button
            :disabled="disabledCategoryBtn"
            @click="createCategory"
            :class=" disabledCategoryBtn ? 'tw-opacity-30' : '' "
            class="tw-bg-green-500 tw-w-1/4 tw-text-white tw-py-2 tw-px-4 tw-rounded"
          >
            Proceed
          </button>
          <button
            :disabled="loading"
            @click.prevent="isOpen = false"
            class="tw-bg-red-600 tw-w-1/4 tw-text-white tw-py-2 tw-px-4 tw-rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>

    <Modal
    :button="false"
      :customClass="['tw-w-2/5']"
      :isOpen="subcategory_modal_open"
      @close-modal="subcategory_modal_open = false"
    >
      <div class="tw-my-5 tw-space-y-5 tw-px-4 tw-pb-3">
        <h1 class="tw-text-lg tw-text-black">
          Create Subcategory
        </h1>

        <input type="text"
        v-model="subcategory"
        placeholder="Category"
        class="
        tw-px-7
        tw-py-3
        tw-rounded-lg
        tw-text-sm
        tw-bg-gray-200
        tw-border-none
        focus:tw-outline-none
        tw-w-full
        "
        />

        <div class="tw-flex tw-gap-3">
          <button
            :disabled="disabledSubcategoryBtn"
            @click="createSubcategory"
            :class=" disabledSubcategoryBtn ? 'tw-opacity-30' : '' "
            class="tw-bg-green-500 tw-w-1/4 tw-text-white tw-py-2 tw-px-4 tw-rounded"
          >
            Proceed
          </button>
          <button
            :disabled="loading"
            @click.prevent="subcategory_modal_open = false"
            class="tw-bg-red-600 tw-w-1/4 tw-text-white tw-py-2 tw-px-4 tw-rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>

  </div>
</template>

<script>
import CreateCategory  from "~/apollo/mutations/admin/CreateCategory";
import GetCategories  from "~/apollo/queries/admin/getCategories";

export default {
  name: 'admin-categories',
  layout: 'adminDefault',
  data() {
    return {
      results: [
        { id: 11, name: 'Science'},
        { id: 2, name: 'Marketing'},
        { id: 3, name: 'Philosophy'},
      ],
      isOpen: false,
      subcategory_modal_open: false,
      loading: false,
      category: null,
      subcategory: null
    }
  },

  computed: {
    disabledCategoryBtn() {
      return this.loading || !this.category
    },
    disabledSubcategoryBtn() {
      return this.loading || !this.subcategory
    }
  },

  mounted(){
    this.getCategories()
  },

  // apollo: {
  //   $client: 'admin',
  //   categories: {
  //     query: GetCategories,
  //     prefetch: true,
  //   }
  // },

  methods: {
    deactivateAdmin(payload){
      this.results.forEach(item => {
        if (item.id === payload.id) {
          item.activated = payload.checked;
        }
      })
    },

    async getCategories(){

      try {
        const res = await this.$apollo.query({
          client: 'admin',
          query: GetCategories,
          // variables: {
          //   name: this.searchText,
          // },
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },

    async createCategory(){
      try {
        this.loading = true;
        const res = await this.$apollo.mutate({
          client: 'admin',
          mutation: CreateCategory,
          variables: { name: this.category },
        });
        console.log(res);
        this.category = null;
        this.$toast.success('Category created')

      } catch (errors) {
        this.$throwError(errors)
      }finally{
        this.loading = false;
      }
    },

    async createSubcategory(){
      try {
        this.loading = true;
        const res = await this.$apollo.mutate({
          client: 'admin',
          mutation: CreateCategory,
          variables: { name: this.category },
        });
        console.log(res);
        this.category = null;
        this.$toast.success('Category created')

      } catch (errors) {
        this.$throwError(errors)
      }finally{
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
/* .custom__button {
  box-shadow: -4px 4px 0rem rgba(176, 176, 176, 0.88);
} */

</style>
