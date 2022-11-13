<template>
  <!-- <Tutorial/> -->
  <div>

    <section class="
      custom__gradient
      "
      >
      <div class="
      tw-w-9/12
      tw-mx-auto
      tw-pt-16
      tw-pb-12
      tw-text-white
      ">
        <h1 class="tw-font-bold tw-text-4xl tw-mb-10">Contact Us</h1>

        <form @submit.prevent="addContactUs">

          <div class="
            tw-grid
            tw-grid-cols-3
            tw-gap-6
            tw-mb-5
            ">
            <div class="tw-col-span-1">
              <input v-model="subject" type="text"
                placeholder="Full Name"
                class="
                tw-px-7
                tw-py-3
                tw-rounded-lg
                tw-w-full
                tw-bg-dark-green
                tw-text-white
                tw-border-none
                focus:tw-outline-none
                tw-placeholder-white"/>
            </div>
            <div class="tw-col-span-1">
              <input v-model="email" type="text"
                placeholder="Email Address"
                class="tw-px-7
                tw-py-3
                tw-rounded-lg
                tw-w-full
                tw-bg-dark-green
                tw-text-white
                tw-border-none
                focus:tw-outline-none
                tw-placeholder-white"/>
            </div>
            <div class="tw-col-span-1">
              <input type="text"
                placeholder="Phone"
                class="
                tw-px-7
                tw-py-3
                tw-rounded-lg
                tw-w-full
                tw-bg-dark-green
                tw-text-white
                tw-border-none
                focus:tw-outline-none
                tw-placeholder-white"/>
            </div>
          </div>

          <div class="
          tw-mb-5
          ">
            <textarea v-model="message" class="
            tw-p-8
            tw-rounded-lg
            tw-w-full
            tw-bg-dark-green
            tw-text-white
            tw-border-none
            focus:tw-outline-none
            tw-placeholder-white
            "
            placeholder="Message"
            cols="30"
            rows="6"></textarea>
          </div>

          <button type="submit"
          :disabled="loading"
          :class=" loading ? 'tw-opacity-40' : '' "
          class="
          tw-rounded-lg
          tw-bg-light-green
          tw-text-white
          tw-w-40
          tw-p-2
          ">
            Apply
          </button>
        </form>



      </div>
    </section>


 

  </div>
</template>

<script>
import AddContactUs from "~/apollo/mutations/user/addContactUs";

export default {
  name: "contact-us",
  data() {
    return {
      email: null,
      subject: null,
      message: null,
      loading: false
    };
  },
  methods: {
    async addContactUs(){
      try {
        this.loading = true;
        const res = await this.$apollo.mutate({
          mutation: AddContactUs,
          variables: {
            email: this.email,
            message: this.message,
            subject: this.subject,
          }
        });
        console.log(res);
        this.email = null
        this.message = null
        this.subject = null
        this.$toast.success('Successfully sent')

      } catch (errors) {
        this.$throwError(errors)
      }finally{
        this.loading = false;
      }
    }
  }
};
</script>


<style scoped>
.custom__gradient {
  background: linear-gradient(279.92deg, #097388 78.36%, #50c18d 112.5%);
}
</style>
