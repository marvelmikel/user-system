<template>
  <!-- <Tutorial/> -->
  <div>
    <section class="custom__gradient">
      <div
        class="
          tw-w-9/12
          tw-mx-auto
          tw-py-32
          tw-text-white
          tw-grid
          tw-grid-cols-2
          tw-items-center
          tw-gap-16
        "
      >
      
        <div>
          <h1 class="tw-font-bold tw-text-6xl tw-mb-10 tw-text-left">
            About Us
          </h1>
          <div class="tw-flex tw-gap-4">
            <!-- <i class="bx bxl-facebook-circle"></i>
            <i class="bx bxl-instagram-alt"></i>
            <i class="bx bxl-whatsapp"></i>
            <i class="bx bxl-twitter"></i> -->
            <p>
              The accreditation of Environmental Consultants was initiated in
              1992 by the Federal Environmental Protection Agency (FEPA) which
              was later subsumed into the Federal Ministry of Environment in
              1999. The primary objective of the exercise is to identify
              technically sound private and public organizations capable of
              rendering consultancy services to address the various
              environmental challenges/issues in Nigeria in accordance with
              existing environmental laws, regulations, standards and global
              best practices.
            </p>
          </div>
        </div>
          <form @submit.prevent="addContactUs">
          <div class="tw-grid tw-grid-cols-2 tw-gap-6 tw-mb-5">
            <div class="tw-col-span-2">
              <input
                v-model="subject"
                type="text"
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
                  tw-placeholder-white
                "
              />
            </div>
            <div class="tw-col-span-1">
              <input
                v-model="email"
                type="text"
                placeholder="Email Address"
                class="
                  tw-px-7
                  tw-py-3
                  tw-rounded-lg
                  tw-w-full
                  tw-bg-dark-green
                  tw-text-white
                  tw-border-none
                  focus:tw-outline-none
                  tw-placeholder-white
                "
              />
            </div>
            <div class="tw-col-span-1">
              <input
                type="text"
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
                  tw-placeholder-white
                "
              />
            </div>
          </div>

          <div class="tw-mb-5">
            <textarea
              v-model="message"
              class="
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
              rows="2"
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="loading"
            :class="loading ? 'tw-opacity-40' : ''"
            class="tw-rounded tw-bg-light-green tw-text-white tw-w-full tw-p-3"
          >
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
      loading: false,
    };
  },
  methods: {
    async addContactUs() {
      try {
        this.loading = true;
        const res = await this.$apollo.mutate({
          mutation: AddContactUs,
          variables: {
            email: this.email,
            message: this.message,
            subject: this.subject,
          },
        });
        console.log(res);
        this.email = null;
        this.message = null;
        this.subject = null;
        this.$toast.success("Successfully sent");
      } catch (errors) {
        this.$throwError(errors);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>


<style scoped>
.custom__gradient {
  background: linear-gradient(279.92deg, #097388 78.36%, #50c18d 112.5%);
}
</style>
