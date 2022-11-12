<template>
  <div class="tw-mb-4">
    <p class="tw-mb-2">Upload Curriculum Vitae</p>

    <button @click="curriculum_vitae_modal_is_open = true" class="tw-flex tw-mb-4 tw-item-center tw-justify-center tw-bg-red-400 tw-text-white tw-gap-2 tw-px-5 tw-py-2 tw-rounded-lg">
      <span class="tw-text-sm">Add file</span>
      <i class='bx bx-upload tw-text-sm'></i>
    </button>

    <div v-for="data in curriculumVitae" :key="data._id"
    @click="openUpdateModal(data)"
      class="tw-py-2 tw-px-5
        tw-rounded-lg tw-bg-gray-200
        tw-flex tw-justify-between
        tw-items-center tw-w-3/6
        tw-mt-2
      "
      >
      <span class="tw-text-sm">{{ data.title || 'No title' }}</span>
      <i class='bx bx-trash tw-cursor-pointer tw-text-xl tw-text-red-500'></i>
    </div>


    <Modal
      :button="false"
      :customClass="['tw-w-2/5']"
      :isOpen="update_curriculum_vitae_modal_is_open"
      @close-modal="update_curriculum_vitae_modal_is_open = false"
    >
      <div class="tw-my-5 tw-space-y-5 tw-px-2 tw-pb-3">
        <h1 class="tw-text-lg tw-text-black tw-capitalize">
          Update Curriculum Vitae
        </h1>

        <div>
          <input v-model="updateData.title" type="text"
          placeholder="Title"
          class="
          tw-mb-3
          tw-px-7
          tw-py-3
          tw-rounded-lg
          tw-w-full
          tw-bg-gray-300
          tw-text-black
          tw-border-none
          focus:tw-outline-none
          tw-placeholder-black"/>
        </div>
      </div>
    </Modal>

    <Modal
      :button="false"
      :customClass="['tw-w-3/5']"
      :isOpen="curriculum_vitae_modal_is_open"
      @close-modal="curriculum_vitae_modal_is_open = false"
    >
      <div class="tw-my-5 tw-space-y-5 tw-px-2 tw-pb-3">
        <h1 class="tw-text-lg tw-text-black tw-capitalize">
          Upload Curriculum Vitae
        </h1>

        <div>
          <input v-model="title" type="text"
          placeholder="Title"
          class="
          tw-mb-3
          tw-px-7
          tw-py-3
          tw-rounded-lg
          tw-w-full
          tw-bg-gray-300
          tw-text-black
          tw-border-none
          focus:tw-outline-none
          tw-placeholder-black"/>

          <input
            ref="curriculumVitaeInput"
            type="file"
            class="tw-p-3 tw-rounded-sm tw-w-full tw-border tw-hidden"
            @change.prevent="$emit('set-curriculum-vitae', $event)"
          />

          <UploadBox width="full" @upload-event="$refs.curriculumVitaeInput.click()"/>
          <button @click="curriculum_vitae_modal_is_open = false" class="tw-bg-red-500 tw-text-white tw-gap-2 tw-px-5 tw-py-2 tw-rounded-lg tw-mt-5">
            Cancel
          </button>
          <button
          :class="!title ? 'tw-opacity-40' : '' "
          @click="uploadCurriculumVitae"
          class="tw-bg-blue-500 tw-text-white tw-gap-2 tw-px-5 tw-py-2 tw-rounded-lg tw-mt-5">
            Upload
          </button>
        </div>

      </div>
    </Modal>
  </div>
</template>

<script>
import UploadCurriculumVitae from "~/apollo/mutations/user/uploadCurriculumVitae";

export default {
  name: 'CurriculumVitae',
  props: ['curriculumVitae','company'],
  data() {
    return {
      update_curriculum_vitae_modal_is_open: false,
      curriculum_vitae_modal_is_open: false,
      uploading: false,
      curriculumVitaeInput: null,
      title: null,
      updateData: {
        title: null
      },
    }
  },
  mounted() {
    console.log(this.curriculumVitae)
  },
  methods: {
    async uploadCurriculumVitae(){
      let curriculumVitaeInput = this.company.curriculumVitaeInput || null
      if (!curriculumVitaeInput) {
        this.$toast.error(`Curriculum Vitae file has not been selected`);
        return;
      }

      let payload = {
        file: this.company.curriculumVitaeInput,
        title: this.title
      }

      try {
        this.uploading = true;
        const res = await this.$apollo.mutate({
          mutation: UploadCurriculumVitae,
          variables: payload,
          refetchQueries: [{
            query: payload
          }],
          awaitRefetchQueries: true
        });
        console.log(res);
        // this.userVerification()
        // this.$toast.success('Company Updated')
        this.$nuxt.refresh()

      } catch (errors) {
        this.$throwError(errors)
      }finally{
        this.uploading = false;
      }
    },

    openUpdateModal(data){
      this.updateData = data;
      this.update_curriculum_vitae_modal_is_open = true
    }
  }
}
</script>

<style>

</style>
