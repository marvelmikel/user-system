<template>
  <div class="">
    <div class="
    tw-grid
    tw-grid-cols-12
    tw-gap-5
    tw-text-sm
    tw-mb-14
    ">
      <input @keyup="getCategories(true)"
        v-model="searchText"
       type="text"
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

    <div v-if="loadingCategories" class="tw-w-full">
      <PuSkeleton :count="9"/>
    </div>
    <div v-else>

      <div v-if="categories.length">
        <div
          v-for="(data) in categories" :key="data._id"
          class="
            tw-mb-5
            tw-pb-3
            tw-border-b
            tw-border-gray-300
            tw-flex
            tw-justify-between
          ">

          <p class="tw-flex tw-items-center tw-capitalize">{{ data.name }}</p>

          <div class="tw-flex tw-items-center">
            <!-- <ToggleBtn :state="data.activated" :id="data.id" @checkedevent="deactivateAdmin"/> -->
          </div>

          <div class="
            tw-flex
            tw-items-center
            tw-gap-5">

            <button
            @click="openSubcategoryModal(data)"
            class="
              custom__button
              tw-w-32
              tw-h-8
              tw-rounded-2xl
              tw-bg-bright-green
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

            <i @click="openDeleteModal(data)"
            class='
            bx bxs-x-circle
            tw-text-4xl
            tw-cursor-pointer
            tw-text-red-600
            '></i>
          </div>

        </div>
      </div>
      <div v-else class="tw-w-full tw-flex tw-items-center tw-justify-center tw-flex-col">
        <i class='bx bx-error tw-text-6xl tw-text-gray-300'></i>
        <h3 class="tw-text-gray-300 tw-font-bold tw-text-center tw-text-2xl">
          No Category Data
        </h3>
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
      :customClass="['tw-w-3/5']"
      :isOpen="add_subcategory_modal_is_open"
      @close-modal="add_subcategory_modal_is_open = false"
    >
      <div class="tw-my-5 tw-space-y-5 tw-px-4 tw-pb-3">
        <h1 class="tw-text-lg tw-text-black tw-capitalize">
          create {{ category_name }} subcategory
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
            @click.prevent="add_subcategory_modal_is_open = false"
            class="tw-bg-red-600 tw-w-1/4 tw-text-white tw-py-2 tw-px-4 tw-rounded"
          >
            Cancel
          </button>
        </div>

        <div class="tw-my-2" v-for="(item, index) in subcategory_data" :key="index">
          <input type="text"
            :value="item.name"
            disabled
            placeholder=""
            class="
            tw-w-full tw-px-7 tw-py-2 tw-text-sm tw-border-gray-400 tw-border-b focus:tw-outline-none tw-capitalize"
          />
        </div>
      </div>
    </Modal>

    <Modal
    :button="false"
      :customClass="['tw-w-2/5']"
      :isOpen="delete_modal_open"
      @close-modal="delete_modal_open = false"
    >
      <div class="tw-my-5 tw-space-y-5 tw-px-2 tw-pb-1">
        <h1 class="tw-text-lg tw-text-black">
          Are you sure?
        </h1>


        <div class="tw-flex tw-gap-3">
          <button
            @click="removeCategory"
            :disabled="deleting"
            :class=" deleting ? 'tw-opacity-40' : '' "
            class="tw-bg-green-500 tw-w-1/4 tw-text-white tw-py-2 tw-px-4 tw-rounded"
          >
            Proceed
          </button>
          <button
            :disabled="deleting"
            :class=" deleting ? 'tw-opacity-40' : '' "
            @click="closeDeleteModal"
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
import CreateCategory from "~/apollo/mutations/admin/createCategory";
import CreateSubcategory from "~/apollo/mutations/admin/createSubcategory";
import GetCategories from "~/apollo/queries/admin/getCategories";
import RemoveCategory from "~/apollo/mutations/admin/removeCategory";

export default {
  name: 'admin-categories',
  layout: 'adminDefault',
  data() {
    return {
      isOpen: false,
      add_subcategory_modal_is_open: false,
      delete_modal_open: false,
      loading: false,
      loadingCategories: false,
      category: null,
      category_id: null,
      subcategory_data: null,
      category_id: null,
      category_name: '',
      subcategory: null,
      categories: [],
      deleting: false,
      searchText: null
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

    async getCategories(search = false){

      try {
        this.loadingCategories = true;
        const res = await this.$apollo.query({
          client: 'admin',
          query: GetCategories,
          // variables: {
          //   name: this.searchText,
          // },
        });

        this.categories = res.data.findAllCategories ?? null;
      } catch (err) {
       this.$throwError(err)
      }finally {
        this.loadingCategories = false;
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
        this.getCategories()
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
          mutation: CreateSubcategory,
          variables: { name: this.subcategory, categoryId: this.category_id },
        });
        this.subcategory = null;
        this.$toast.success('Subcategory created')
        this.getCategories()

      } catch (errors) {
        this.$throwError(errors)
      }finally{
        this.loading = false;
      }
    },

    async removeCategory(){
      try {
        this.deleting = true;
        const res = await this.$apollo.mutate({
          client: 'admin',
          mutation: RemoveCategory,
          variables: { id: this.category_id },
        });
        console.log(res);
        this.getCategories()
        // this.$toast.success('Category deleted')

      } catch (errors) {
        this.$throwError(errors)
      }finally{
        this.deleting = false;
      }
    },

    openSubcategoryModal(data){
      this.add_subcategory_modal_is_open = true
      this.category_id = data._id
      this.category_name = data.name
      this.subcategory_data = data.subcategories
    },
    closeDeleteModal(){
      this.delete_modal_open = false
      this.category_id = null
    },
    openDeleteModal(category){
      this.category_id = category._id
      this.delete_modal_open = true
    }
  }
}
</script>

<style scoped>
/* .custom__button {
  box-shadow: -4px 4px 0rem rgba(176, 176, 176, 0.88);
} */

</style>
