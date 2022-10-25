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
        placeholder="Search Admin Name"
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

      <div class="
        tw-col-start-4 tw-col-end-7
        tw-flex
        tw-items-center
        tw-px-7
        tw-py-2
        tw-rounded-lg
        tw-bg-gray-200
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
      New Invites
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
        <ToggleBtn :state="data.activated" :id="data.id" @checkedevent="deactivateAdmin"/>
      </div>

      <div class="
        tw-flex
        tw-items-center
        tw-gap-5">

        <button class="
          custom__button
          tw-w-28
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
          <i class='bx bx-right-arrow-alt tw-text-2xl tw-text-white'></i>
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
          Invite New Admin
        </h1>

        <input type="email"
        v-model="email"
        placeholder="Email Address"
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
            @click="sendInvitation"
            class="tw-bg-green-500 tw-w-1/4 tw-text-white tw-py-2 tw-px-4 tw-rounded"
          >
            Proceed
          </button>
          <button
            @click.prevent="isOpen = false"
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
import InviteAdmin  from "~/apollo/mutations/admin/inviteAdmin";

export default {
  name: 'admin-admins',
  layout: 'adminDefault',
  data() {
    return {
      results: [
        { id: 11, name: 'Adams Musa', activated: true},
        { id: 2, name: 'John Doe', activated: true},
        { id: 3, name: 'Jane Doe', activated: false},
      ],
      isOpen: false,
      loading: false,
      email: null
    }
  },

  methods: {
    deactivateAdmin(payload){
      this.results.forEach(item => {
        if (item.id === payload.id) {
          item.activated = payload.checked;
        }
      })
    },

    async sendInvitation(){
      try {
        this.loading = true;
        const res = await this.$apollo.mutate({
          client: 'admin',
          mutation: InviteAdmin,
          variables: { email: this.email },
        });
        this.email = null;
        this.$toast.success('Invitation sent')

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
.custom__button {
  box-shadow: -4px 4px 0rem rgba(176, 176, 176, 0.88);
}

</style>
