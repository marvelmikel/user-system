<template>
  <div>
    <div class="tw-bg-gray-200">
      <div
        class="
          tw-w-9/12
          tw-mx-auto
          tw-bg-gray-200
          tw-py-10
          tw-flex
          tw-justify-between
        "
      >
        <h1 class="tw-text-4xl tw-text-gray-500 tw-font-bold">Company</h1>
        <!-- <button @click="updateCompany"
        :disabled="editing"
        class="
        tw-rounded-lg
        tw-bg-light-green
        tw-text-white
        tw-w-32
        "
        :class=" editing ? 'tw-opacity-40' : '' "
        >
          Save
        </button> -->
      </div>
    </div>

    <div
      v-if="loadingCompany"
      class="tw-flex tw-items-center tw-justify-center tw-mt-5"
    >
      <div class="tw-w-1/2">
        <PuSkeleton :count="6" />
      </div>
    </div>

    <div v-else>
      <div class="tw-grid tw-grid-cols-7 tw-gap-10 tw-p-10">
        <div class="tw-col-span-2 tw-py-10 tw-flex tw-justify-end">
          <div class="tw-relative tw-w-40">
            <img
              v-if="company.profilePic"
              class="tw-rounded-full tw-w-full"
              src="~assets/img/user_img.png"
              alt="user_img"
            />
            <i v-else class="bx bx-user-circle profile__img tw-text-gray-600"></i>
            <i
              class="
                bx
                bxs-error-circle
                tw-absolute
                tw-right-1.5
                tw-top-0
                tw-text-light-green
                tw-text-4xl
              "
            ></i>
          </div>
        </div>
        <div class="tw-col-span-3">
          <p class="tw-text-center tw-py-10 tw-text-gray-400">
            Fill all form field to go to next step
          </p>
          <ul id="progressbar">
            <li
              ref="step_1"
              :class="step_one_complete ? 'completed' : ''"
              class="tw-cursor-pointer"
              id="step_one"
            ></li>
            <li
              ref="step_2"
              :class="step_two_complete ? 'completed' : ''"
              class="tw-cursor-pointer"
              id="step_two"
            ></li>
            <li
              ref="step_3"
              :class="step_three_complete ? 'completed' : ''"
              class="tw-cursor-pointer"
              id="step_three"
            ></li>
            <li
              ref="step_4"
              :class="step_four_complete ? 'completed' : ''"
              class="tw-cursor-pointer"
              id="step_four"
            ></li>
            <li
              ref="step_5"
              :class="step_five_complete ? 'completed' : ''"
              class="tw-cursor-pointer"
              id="step_five"
            ></li>
          </ul>
          <div class="tw-w-full">
            <div v-show="step === 1">
              <div class="tw-flex tw-items-center tw-mb-3">
                <span class="tw-w-2/6">Name</span>
                <input
                  type="text"
                  v-model="company.nameOfCompany"
                  placeholder="Company Name"
                  class="
                    tw-px-7
                    tw-py-3
                    tw-text-sm
                    tw-rounded-lg
                    tw-w-full
                    tw-bg-gray-200
                    tw-border-none
                    focus:tw-outline-none
                  "
                />
              </div>

              <div class="tw-flex tw-items-center tw-mb-3">
                <span class="tw-w-2/6">Location</span>
                <input
                  type="text"
                  v-model="company.location"
                  placeholder="Abuja"
                  class="
                    tw-px-7
                    tw-py-3
                    tw-text-sm
                    tw-rounded-lg
                    tw-w-full
                    tw-bg-gray-200
                    tw-border-none
                    focus:tw-outline-none
                  "
                />
              </div>

              <div class="tw-flex tw-items-center tw-mb-3">
                <span class="tw-w-2/6">Address</span>
                <input
                  type="text"
                  v-model="company.address"
                  placeholder="plot 238, shehu shagri way, CBD"
                  class="
                    tw-px-7
                    tw-py-3
                    tw-text-sm
                    tw-rounded-lg
                    tw-w-full
                    tw-bg-gray-200
                    tw-border-none
                    focus:tw-outline-none
                  "
                />
              </div>

              <div class="tw-flex tw-items-center tw-mb-3">
                <span class="tw-w-2/6">RC Number</span>
                <input
                  type="text"
                  v-model="company.rcNumber"
                  placeholder="562736"
                  class="
                    tw-px-7
                    tw-py-3
                    tw-text-sm
                    tw-rounded-lg
                    tw-w-full
                    tw-bg-gray-200
                    tw-border-none
                    focus:tw-outline-none
                  "
                />
              </div>

              <div class="tw-flex tw-items-center tw-mb-3">
                <span class="tw-w-2/6">Date Of Inc</span>
                <input
                  type="date"
                  v-model="company.dateOfIncorporation"
                  class="
                    tw-px-7
                    tw-py-3
                    tw-text-sm
                    tw-rounded-lg
                    tw-w-full
                    tw-bg-gray-200
                    tw-border-none
                    focus:tw-outline-none
                  "
                />
              </div>

              <div class="tw-flex tw-items-center tw-mb-3">
                <span class="tw-w-2/6">TIN</span>
                <input
                  type="text"
                  v-model="company.tin"
                  placeholder="67432"
                  class="
                    tw-px-7
                    tw-py-3
                    tw-text-sm
                    tw-rounded-lg
                    tw-w-full
                    tw-bg-gray-200
                    tw-border-none
                    focus:tw-outline-none
                  "
                />
              </div>

              <div class="tw-flex tw-items-center tw-mb-3">
                <span class="tw-w-2/6">Phone</span>
                <input
                  type="text"
                  v-model="company.phoneNumber"
                  placeholder="67432"
                  class="
                    tw-px-7
                    tw-py-3
                    tw-text-sm
                    tw-rounded-lg
                    tw-w-full
                    tw-bg-gray-200
                    tw-border-none
                    focus:tw-outline-none
                  "
                />
              </div>
            </div>

            <div v-show="step === 2">
              <!-- Certificate Of Incorporation -->
              <div class="tw-mb-4">
                <p class="tw-mb-2">Certificate Of Incorporation</p>
                <input
                  ref="certificateOfIncorporation"
                  type="file"
                  class="tw-p-3 tw-rounded-sm tw-w-full tw-border tw-hidden"
                  @change.prevent="setCertificateOfIncorporation"
                />
                <UploadBox
                  :hasFile="certificateOfIncorporation"
                  :approved="company.isCertificateOfIncorporation"
                  @upload-event="$refs.certificateOfIncorporation.click()"
                />

                <div
                  v-if="certificateOfIncorporation"
                  @click="openDeleteDocumentModal('certificateOfIncorporation')"
                  class="
                    tw-flex tw-items-center tw-mt-1 tw-gap-1 tw-cursor-pointer
                  "
                >
                  <span class="tw-text-xs tw-text-red-600">Remove</span>
                  <i class="bx bx-trash tw-text-red-600"></i>
                </div>
              </div>
              <!-- Certificate Of Incorporation End -->

              <!-- Certificate Of Tax Clearance -->
              <div class="tw-mb-4">
                <p class="tw-mb-2">Certificate Of Tax Clearance</p>
                <input
                  ref="certificateOfTaxClearance"
                  type="file"
                  class="tw-p-3 tw-rounded-sm tw-w-full tw-border tw-hidden"
                  @change.prevent="setCertificateOfTaxClearance"
                />
                <UploadBox
                  :hasFile="certificateOfTaxClearance"
                  :file="company.certificateOfTaxClearance || null"
                  :approved="company.isCertificateOfTaxClearance"
                  @upload-event="$refs.certificateOfTaxClearance.click()"
                />

                <div
                  @click="openDeleteDocumentModal('certificateOfTaxClearance')"
                  v-if="certificateOfTaxClearance"
                  class="
                    tw-flex tw-items-center tw-mt-1 tw-gap-1 tw-cursor-pointer
                  "
                >
                  <!-- <span class="tw-text-xs tw-text-gray-500">
                  {{ company.certificateOfTaxClearance.name || 'certificateOfTaxClearance' }}
                </span> -->
                  <span class="tw-text-xs tw-text-red-600">Remove</span>
                  <i class="bx bx-trash tw-text-red-600"></i>
                </div>
              </div>
              <!-- Certificate Of Tax Clearance End -->

              <!-- Application Letter -->
              <div class="tw-mb-4">
                <p class="tw-mb-2">Application Letter</p>
                <input
                  ref="applicationLetter"
                  type="file"
                  class="tw-p-3 tw-rounded-sm tw-w-full tw-border tw-hidden"
                  @change.prevent="setApplicationLetter"
                />
                <UploadBox
                  :hasFile="applicationLetter"
                  :file="company.applicationLetter || null"
                  :approved="company.isApplicationLetter"
                  @upload-event="$refs.applicationLetter.click()"
                />

                <div
                  @click="openDeleteDocumentModal('applicationLetter')"
                  v-if="applicationLetter"
                  class="
                    tw-flex tw-items-center tw-mt-1 tw-gap-1 tw-cursor-pointer
                  "
                >
                  <!-- <span class="tw-text-xs tw-text-gray-500">
                  {{ company.applicationLetter.name || 'applicationLetter' }}
                </span> -->
                  <span class="tw-text-xs tw-text-red-600">Remove</span>
                  <i class="bx bx-trash tw-text-red-600"></i>
                </div>
              </div>
              <!-- Application Letter End -->
            </div>

            <div v-show="step === 3">
              <!-- Evidence Of Payment -->
              <div class="tw-mb-4">
                <p class="tw-mb-2">Evidence Of Payment</p>
                <input
                  ref="evidenceOfPayment"
                  type="file"
                  class="tw-p-3 tw-rounded-sm tw-w-full tw-border tw-hidden"
                  @change.prevent="setEvidenceOfPayment"
                />
                <UploadBox
                  :hasFile="evidenceOfPayment"
                  :approved="company.isEvidenceOfPayment"
                  @upload-event="$refs.evidenceOfPayment.click()"
                />

                <div
                  v-if="evidenceOfPayment"
                  @click="openDeleteDocumentModal('evidenceOfPayment')"
                  class="
                    tw-flex tw-items-center tw-mt-1 tw-gap-1 tw-cursor-pointer
                  "
                >
                  <span class="tw-text-xs tw-text-red-600">Remove</span>
                  <i class="bx bx-trash tw-text-red-600"></i>
                </div>
              </div>
              <!-- Evidence Of Payment End -->

              <!-- Letter Of Credibility From Banks -->
              <div class="tw-mb-4">
                <p class="tw-mb-2">Letter Of Credibility From Banks</p>
                <input
                  ref="letterOfCredibilityFromBanks"
                  type="file"
                  class="tw-p-3 tw-rounded-sm tw-w-full tw-border tw-hidden"
                  @change.prevent="setLetterOfCredibilityFromBanks"
                />
                <UploadBox
                  :hasFile="letterOfCredibilityFromBanks"
                  :approved="company.isLetterOfCredibilityFromBanks"
                  @upload-event="$refs.letterOfCredibilityFromBanks.click()"
                />

                <div
                  v-if="letterOfCredibilityFromBanks"
                  @click="
                    openDeleteDocumentModal('letterOfCredibilityFromBanks')
                  "
                  class="
                    tw-flex tw-items-center tw-mt-1 tw-cursor-pointer tw-gap-1
                  "
                >
                  <span class="tw-text-xs tw-text-red-600">Remove</span>
                  <i class="bx bx-trash tw-text-red-600"></i>
                </div>
              </div>
              <!-- Letter Of Credibility From Banks End -->

              <!-- Collaboration Certificate With Foreign Partners -->
              <div class="tw-mb-4">
                <p class="tw-mb-2">
                  Collaboration Certificate With Foreign Partners
                </p>
                <input
                  ref="collaborationCertificateWithForeignPartners"
                  type="file"
                  class="tw-p-3 tw-rounded-sm tw-w-full tw-border tw-hidden"
                  @change.prevent="
                    setCollaborationCertificateWithForeignPartners
                  "
                />

                <UploadBox
                  :hasFile="collaborationCertificateWithForeignPartners"
                  :approved="
                    company.isCollaborationCertificateWithForeignPartners
                  "
                  @upload-event="
                    $refs.collaborationCertificateWithForeignPartners.click()
                  "
                />

                <div
                  v-if="collaborationCertificateWithForeignPartners"
                  @click="
                    openDeleteDocumentModal(
                      'collaborationCertificateWithForeignPartners'
                    )
                  "
                  class="
                    tw-flex tw-items-center tw-mt-1 tw-gap-1 tw-cursor-pointer
                  "
                >
                  <span class="tw-text-xs tw-text-red-600">Remove</span>
                  <i class="bx bx-trash tw-text-red-600"></i>
                </div>
              </div>
              <!-- Collaboration Certificate With Foreign Partners End -->
            </div>

            <div v-show="step === 4">
              <!-- Curriculum Vitae Input -->
              <CurriculumVitae
                :curriculumVitae="curriculumVitaeInput"
                :company="company"
                @set-curriculum-vitae="setCurriculumVitaeInput"
                @refresh-cv="refreshCv"
                @refresh="refresh"
              />
              <!-- Curriculum Vitae Input End -->
            </div>

            <div v-show="step === 5">
              <!-- Board Of Directors -->

              <BoardOfDirectors
                :boardOfDirectors="boardOfDirectorsInput"
                :company="company"
                @set-board-of-directors="setBoardOfDirectorsInput"
                @refresh="refresh"
                @refresh-data="refreshBoardOfDirectors"
              />

              <!-- Board Of Directors End -->
            </div>

            <div class="tw-flex tw-justify-start tw-my-10 tw-gap-4">
              <button
                v-if="step > 1"
                @click="previous"
                class="tw-bg-gray-600 tw-text-white tw-w-1/6 tw-p-3 tw-text-sm tw-rounded"
              >
                Back
              </button>

              <button
                v-if="step < 4"
                :disabled="editing"
                @click="updateCompany"
                :class="editing ? 'tw-opacity-40' : ''"
                class="tw-bg-dark-green tw-text-white tw-w-1/6 tw-p-3 tw-text-sm tw-rounded"
              >
                Save
              </button>

              <button
                :disabled="!step_is_complete"
                v-if="step <= 4"
                :class="!step_is_complete ? 'tw-opacity-30' : ''"
                @click="next"
                class="
                  tw-bg-light-green tw-text-white tw-w-1/6 tw-p-3 tw-text-sm tw-rounded
                "
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div class="tw-col-span-2"></div>
      </div>
    </div>

    <Modal
      :button="false"
      :customClass="['tw-w-2/5']"
      :isOpen="delete_modal_open"
      @close-modal="delete_modal_open = false"
    >
      <div class="tw-my-5 tw-space-y-5 tw-px-2 tw-pb-1">
        <h1 class="tw-text-lg tw-text-black">Are you sure?</h1>

        <div class="tw-flex tw-gap-3">
          <button
            @click="deleteDocument"
            :disabled="deleting"
            :class="deleting ? 'tw-opacity-20' : ''"
            class="
              tw-bg-green-500 tw-w-1/4 tw-text-white tw-py-2 tw-px-4 tw-rounded
            "
          >
            Proceed
          </button>
          <button
            :disabled="deleting"
            :class="deleting ? 'tw-opacity-20' : ''"
            @click="closeDeleteModal"
            class="
              tw-bg-red-600 tw-w-1/4 tw-text-white tw-py-2 tw-px-4 tw-rounded
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import GetCompany from "~/apollo/queries/user/getCompany";
// import UpdateCompany from "~/apollo/mutations/user/updateCompany";
import RemoveDocument from "~/apollo/mutations/user/removeDocument";
import UpdatePhoto from "~/apollo/mutations/user/updatePhoto";

import UserVerification from "~/apollo/queries/user/userVerification";
import StepOne from "~/apollo/mutations/user/stepOne";
import StepTwo from "~/apollo/mutations/user/stepTwo";
import StepThree from "~/apollo/mutations/user/stepThree";

export default {
  name: "company",
  layout: "home",
  middleware: "unauthenticated_user",
  data() {
    return {
      company: {
        nameOfCompany: null,
        location: null,
        address: null,
        rcNumber: null,
        dateOfIncorporation: null,
        tin: null,
        phoneNumber: null,

        isCertificateOfIncorporation: null,
        isCertificateOfTaxClearance: null,
        isApplicationLetter: null,
        isEvidenceOfPayment: null,
        isLetterOfCredibilityFromBanks: null,
        isCollaborationCertificateWithForeignPartners: null,
        isCurriculumVitae: null,
        isBoardOfDirectorsInput: null,

        certificateOfIncorporation: null,
        certificateOfTaxClearance: null,
        applicationLetter: null,

        evidenceOfPayment: null,
        letterOfCredibilityFromBanks: null,
        collaborationCertificateWithForeignPartners: null,

        curriculumVitaeInput: null,
        boardOfDirectorsInput: null,
        profilePic: null,
      },

      // STEP 1
      nameOfCompany: null,
      location: null,
      address: null,
      rcNumber: null,
      dateOfIncorporation: null,
      tin: null,
      phoneNumber: null,

      // STEP 2
      certificateOfIncorporation: null,
      certificateOfTaxClearance: null,
      applicationLetter: null,

      // STEP 3
      evidenceOfPayment: null,
      letterOfCredibilityFromBanks: null,
      collaborationCertificateWithForeignPartners: null,

      // STEP 4
      curriculumVitaeInput: [],

      // STEP 5
      boardOfDirectorsInput: [],
      profilePic: null,

      loadingCompany: false,
      editing: false,
      step: 1,
      mutation: null,
      delete_modal_open: false,
      deleting: false,
    };
  },

  mounted() {
    this.getCompany();
    this.userVerification();
  },

  computed: {
    step_one_complete() {
      return this.nameOfCompany &&
        this.location &&
        this.address &&
        this.rcNumber &&
        this.dateOfIncorporation &&
        this.tin &&
        this.phoneNumber
        ? true
        : false;
    },
    step_two_complete() {
      return this.certificateOfIncorporation &&
        this.certificateOfTaxClearance &&
        this.applicationLetter
        ? true
        : false;
    },
    step_three_complete() {
      return this.evidenceOfPayment &&
        this.letterOfCredibilityFromBanks &&
        this.collaborationCertificateWithForeignPartners
        ? true
        : false;
    },
    step_four_complete() {
      return this.curriculumVitaeInput.length > 1 ? true : false;
    },
    step_five_complete() {
      return this.boardOfDirectorsInput.length > 1 ? true : false;
    },
    step_is_complete() {
      if (this.step === 1 && this.step_one_complete) {
        return true;
      }
      if (this.step === 2 && this.step_two_complete) {
        return true;
      }
      if (this.step === 3 && this.step_three_complete) {
        return true;
      }
      if (this.step === 4 && this.step_four_complete) {
        return true;
      }
      if (this.step === 5 && this.step_five_complete) {
        return true;
      }
      return false;
    },

    hasCertificateOfIncorporation() {
      return this.certificateOfIncorporation ? true : false;
    },

    hasCertificateOfTaxClearance() {
      return this.certificateOfTaxClearance ? true : false;
    },
    hasApplicationLetter() {
      return this.applicationLetter ? true : false;
    },
  },

  methods: {
    async getCompany() {
      try {
        this.loadingCompany = true;
        const res = await this.$apollo.query({
          query: GetCompany,
          // variables: {
          //   name: this.searchText,
          // },
        });
        console.log(res);
        this.company = res.data.getUser ?? null;
      } catch (err) {
        this.$throwError(err);
      } finally {
        this.loadingCompany = false;
      }
    },

    async userVerification() {
      try {
        this.loadingCompany = true;
        const res = await this.$apollo.query({
          query: UserVerification,
        });
        let { userVerification } = res.data;
        let stepOne = userVerification.stepOne || null;
        let stepTwo = userVerification.stepTwo || null;
        let stepThree = userVerification.stepThree || null;
        let stepFour = userVerification.stepFour || null;
        let stepFive = userVerification.stepFive || null;

        if (stepOne) {
          this.nameOfCompany = stepOne.nameOfCompany;
          this.location = stepOne.location;
          this.address = stepOne.address;
          this.rcNumber = stepOne.rcNumber;
          this.dateOfIncorporation = stepOne.dateOfIncorporation;
          this.tin = stepOne.tin;
          this.phoneNumber = stepOne.phoneNumber;
        }
        if (stepTwo) {
          this.certificateOfIncorporation = stepTwo.certificateOfIncorporation;
          this.certificateOfTaxClearance = stepTwo.certificateOfTaxClearance;
          this.applicationLetter = stepTwo.applicationLetter;
        }
        if (stepThree) {
          this.evidenceOfPayment = stepThree.evidenceOfPayment;
          this.letterOfCredibilityFromBanks =
            stepThree.letterOfCredibilityFromBanks;
          this.collaborationCertificateWithForeignPartners =
            stepThree.collaborationCertificateWithForeignPartners;
        }
        if (stepFour) {
          this.curriculumVitaeInput = stepFour || [];
        }
        if (stepFive) {
          this.boardOfDirectorsInput = stepFive || [];
        }
      } catch (err) {
        this.$throwError(err);
      } finally {
        this.loadingCompany = false;
      }
    },

    async uploadDocuments(payload) {
      if (this.step === 2) {
        this.mutation = StepTwo;
      }
      if (this.step === 3) {
        this.mutation = StepThree;
      }

      try {
        this.editing = true;
        const res = await this.$apollo.mutate({
          mutation: this.mutation,
          variables: payload,
          refetchQueries: [{ query: UserVerification }, { query: GetCompany }],
          awaitRefetchQueries: true,
        });

        if (res.data) {
          this.updateDocument(res.data.updateUser);
        }

        console.log(res);

        // this.userVerification()
        this.$toast.success("Company document updated");
        // this.$nuxt.refresh()
      } catch (errors) {
        this.$throwError(errors);
      } finally {
        this.editing = false;
      }
    },

    async uploadPhoto() {
      try {
        this.editing = true;
        const res = await this.$apollo.mutate({
          mutation: this.mutation,
          variables: UpdatePhoto,
          // awaitRefetchQueries: true
        });

        // if (res.data) {
        //   this.updateDocument(res.data.updateUser)
        // }

        console.log(res);

        this.refresh();
        this.$toast.success("Company photo updated");
        // this.$nuxt.refresh()
      } catch (errors) {
        this.$throwError(errors);
      } finally {
        this.editing = false;
      }
    },

    updateDocument(data) {
      if (this.step === 2) {
        this.certificateOfIncorporation = data.certificateOfIncorporation;
        this.certificateOfTaxClearance = data.certificateOfTaxClearance;
        this.applicationLetter = data.applicationLetter;
      }
      if (this.step === 3) {
        this.evidenceOfPayment = data.evidenceOfPayment;
        this.letterOfCredibilityFromBanks = data.letterOfCredibilityFromBanks;
        this.collaborationCertificateWithForeignPartners =
          data.collaborationCertificateWithForeignPartners;
      }
    },

    async updateCompany() {
      let payload = this.getPayload();

      if (!payload) {
        this.$toast.error(`Step ${this.step} is incomplete`);
        return;
      }
      if (this.step > 1) {
        this.uploadDocuments(payload);
        return;
      }

      try {
        this.editing = true;
        const res = await this.$apollo.mutate({
          mutation: StepOne,
          variables: this.company,
          refetchQueries: [{ query: GetCompany }],
        });
        console.log(res);
        this.userVerification();
        this.$toast.success("Company Updated");
      } catch (errors) {
        this.$throwError(errors);
      } finally {
        this.editing = false;
      }
    },

    openDeleteDocumentModal(type) {
      this.deleteType = type;
      this.delete_modal_open = true;
    },

    closeDeleteModal() {
      this.deleteType = null;
      this.delete_modal_open = false;
    },

    async deleteDocument() {
      try {
        this.deleting = true;
        const res = await this.$apollo.mutate({
          mutation: RemoveDocument,
          variables: {
            type: this.deleteType,
          },
          // refetchQueries: [
          //   { query: UserVerification },
          //   { query: GetCompany },
          // ],
        });
        if (res.data) {
          this.updateDocument(res.data.removeUploadedDocument);
          this.delete_modal_open = false;
        }

        console.log(res);
      } catch (errors) {
        this.$throwError(errors);
      } finally {
        this.deleting = false;
      }
    },

    getPayload() {
      let files = {};
      if (this.step === 1) {
        let {
          nameOfCompany,
          location,
          address,
          rcNumber,
          dateOfIncorporation,
          tin,
          phoneNumber,
        } = this.company;
        return {
          nameOfCompany,
          location,
          address,
          rcNumber,
          dateOfIncorporation,
          tin,
          phoneNumber,
        };
      }
      if (this.step === 2) {
        let {
          certificateOfIncorporation,
          certificateOfTaxClearance,
          applicationLetter,
        } = this.company;
        if (typeof certificateOfIncorporation === "object") {
          files.certificateOfIncorporation = certificateOfIncorporation;
        }
        if (typeof certificateOfTaxClearance === "object") {
          files.certificateOfTaxClearance = certificateOfTaxClearance;
        }
        if (typeof applicationLetter === "object") {
          files.applicationLetter = applicationLetter;
        }
        return files;
      }
      if (this.step === 3) {
        let {
          evidenceOfPayment,
          letterOfCredibilityFromBanks,
          collaborationCertificateWithForeignPartners,
        } = this.company;
        if (typeof evidenceOfPayment === "object") {
          files.evidenceOfPayment = evidenceOfPayment;
        }
        if (typeof letterOfCredibilityFromBanks === "object") {
          files.letterOfCredibilityFromBanks = letterOfCredibilityFromBanks;
        }
        if (typeof collaborationCertificateWithForeignPartners === "object") {
          files.collaborationCertificateWithForeignPartners =
            collaborationCertificateWithForeignPartners;
        }
        return files;
      }

      if (this.step > 3) {
        return true;
      }
      return false;
    },

    refresh() {
      this.getCompany();
      this.userVerification();
    },

    refreshCv() {
      this.company.curriculumVitaeInput = null;
    },

    refreshBoardOfDirectors() {
      this.company.boardOfDirectorsInput = null;
    },

    next() {
      if (this.step_is_complete) {
        this.step += 1;
        return;
      }
      return this.$toast.error(`Step ${this.step} is incomplete`);
    },
    previous() {
      this.step -= 1;
    },

    navigate_step(no) {
      this.step = no;
    },

    setCertificateOfIncorporation(e) {
      this.company.certificateOfIncorporation = e.target.files[0];
    },
    setCertificateOfTaxClearance(e) {
      this.company.certificateOfTaxClearance = e.target.files[0];
    },
    setApplicationLetter(e) {
      this.company.applicationLetter = e.target.files[0];
    },
    setEvidenceOfPayment(e) {
      this.company.evidenceOfPayment = e.target.files[0];
    },
    setLetterOfCredibilityFromBanks(e) {
      this.company.letterOfCredibilityFromBanks = e.target.files[0];
    },
    setCollaborationCertificateWithForeignPartners(e) {
      this.company.collaborationCertificateWithForeignPartners =
        e.target.files[0];
    },
    setCurriculumVitaeInput(e) {
      console.log(e);
      this.company.curriculumVitaeInput = e.target.files[0];
    },
    setBoardOfDirectorsInput(e) {
      this.company.boardOfDirectorsInput = e.target.files[0];
    },

    removeCertificateOfIncorporation() {
      this.company.certificateOfIncorporation = null;
      delete this.company.certificateOfIncorporation;
      // this.certificateOfIncorporation = null;
    },
    removeCertificateOfTaxClearance() {
      this.company.certificateOfTaxClearance = null;
      delete this.company.certificateOfTaxClearance;
      // this.certificateOfTaxClearance = null;
    },
    removeApplicationLetter() {
      this.company.applicationLetter = null;
      delete this.company.applicationLetter;
      // this.applicationLetter = null;
    },
    removeEvidenceOfPayment() {
      this.company.evidenceOfPayment = null;
      // this.evidenceOfPayment = null;
    },
    removeLetterOfCredibilityFromBanks() {
      this.company.letterOfCredibilityFromBanks = null;
      // this.letterOfCredibilityFromBanks = null;
    },
    removeCollaborationCertificateWithForeignPartners() {
      this.company.collaborationCertificateWithForeignPartners = null;
      // this.collaborationCertificateWithForeignPartners = null;
    },
    removeCurriculumVitaeInput() {
      this.company.curriculumVitaeInput = null;
      // this.curriculumVitaeInput = null;
    },
    removeBoardOfDirectorsInput() {
      this.company.boardOfDirectorsInput = null;
      // this.boardOfDirectorsInput = null;
    },
  },

  watch: {
    step(value) {
      //   let navicons = document.querySelectorAll('.compliance_navicon');
      //   navicons.forEach(element => {
      //     element.classList.remove('active');
      //   });

      for (let i = 1; i < value; i++) {
        if (i < 6) {
          this.$refs[`step_${i}`].classList.add("completed");
        }
      }
    },
  },
};
</script>

<style scoped>
.profile__img {
  font-size: 9rem;
}

/* .active_step {
  color: #641eff !important;
}

.complete_compliance {
  color: #6dfc68;
}

.incomplete_compliance {
  color: #fd5757;
}

.compliance_navicon.active{
  color: #fff;
  background: #641eff;
  border: 1px solid #641eff;
}

.compliance_navicon{
  border: 1px solid #b1b1b1;
  border-radius: 100%;
  cursor: pointer;
  width: 50px;
  height: 50px;
  color: #c4c4c4;
}

.compliance_navicon.active .complete_compliance, .compliance_navicon.active .incomplete_compliance {
  color: #fff;
} */

#progressbar {
  margin-bottom: 30px;
  overflow: hidden;
  color: lightgrey;
}

#progressbar .completed {
  /* color: #673AB7 */
  @apply tw-text-dark-green;
}

#progressbar li {
  /* list-style-type: none; */
  /* font-size: 15px; */
  width: 20%;
  float: left;
  position: relative;
  font-weight: 400;
}

#progressbar #step_one:before {
  content: "1";
}

#progressbar #step_two:before {
  content: "2";
}

#progressbar #step_three:before {
  content: "3";
}

#progressbar #step_four:before {
  content: "4";
}

#progressbar #step_five:before {
  content: "5";
}

#progressbar li:before {
  width: 50px;
  height: 50px;
  line-height: 45px;
  display: block;
  font-size: 20px;
  color: #ffffff;
  background: lightgray;
  border-radius: 50%;
  margin: 0 auto 10px auto;
  padding: 2px;
  text-align: center;
}

#progressbar li:after {
  content: "";
  width: 100%;
  height: 2px;
  background: lightgray;
  position: absolute;
  left: 0;
  top: 25px;
  z-index: -1;
}

#progressbar li.completed:before,
#progressbar li.completed:after {
  /* background: #673AB7 */
  @apply tw-bg-dark-green;
}

.progress {
  height: 20px;
}

.progress-bar {
  /* background-color: #673AB7; */
  @apply tw-bg-dark-green;
}

.fit-image {
  width: 100%;
  object-fit: cover;
}
</style>
