<template>
  <div>
    <div class="tw-bg-gray-200">
      <div class="
      tw-w-9/12
      tw-mx-auto
      tw-bg-gray-200
      tw-py-10
      tw-flex
      tw-justify-between
      ">
        <h1 class="
        tw-text-4xl
        tw-text-gray-500
        tw-font-bold
        ">
        Company
        </h1>
        <button @click="createCompany"
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
        </button>
      </div>
    </div>

    <div v-if="loadingCompany" class="tw-flex tw-items-center tw-justify-center tw-mt-5">
      <div class="tw-w-1/2">
        <PuSkeleton :count="6"/>
      </div>
    </div>

    <div v-else>
      <p class="tw-text-center tw-pt-5 tw-text-gray-400">Fill all form field to go to next step</p>
      <div class="
      tw-w-5/12
      tw-mx-auto
      tw-mt-8
      ">
        <ul id="progressbar">
            <li ref="step_1" :class="step_one_complete ? 'completed' : '' " class="tw-cursor-pointer" id="step_one"></li>
            <li ref="step_2" :class="step_two_complete ? 'completed' : '' " class="tw-cursor-pointer" id="step_two"></li>
            <li ref="step_3" class="tw-cursor-pointer" id="step_three"></li>
            <li ref="step_4" class="tw-cursor-pointer" id="step_four"></li>
        </ul>
      </div>

      <!-- <div class="tw-w-5/12 tw-mx-auto tw-mt-8">
        <div class="tw-flex tw-justify-between tw-text-2xl tw-font-bold">
          <div ref="step_1" @click="navigate_step(1)" class="tw-flex tw-items-center tw-justify-center compliance_navicon active">
            <span>1</span>
          </div>
          <div ref="step_2" @click="navigate_step(2)" class="tw-flex tw-items-center tw-justify-center compliance_navicon">
            <span>2</span>
          </div>
          <div ref="step_3" @click="navigate_step(3)" class="tw-flex tw-items-center tw-justify-center compliance_navicon">
            <span>3</span>
          </div>
          <div ref="step_4" @click="navigate_step(4)" class="tw-flex tw-items-center tw-justify-center compliance_navicon">
            <span>4</span>
          </div>
        </div>
      </div> -->

      <div class="
      tw-w-9/12
      tw-mx-auto
      tw-mt-8
      tw-flex
      tw-gap-16
      ">

        <div class="tw-relative">
          <img v-if="company.profilePic" class="tw-rounded-full tw-w-40" src="~assets/img/user_img.png" alt="user_img">
          <i v-else class='bx bx-user-circle profile__img'></i>
          <i class='
          bx bxs-error-circle
          tw-absolute
          tw-right-1.5
          tw-top-0
          tw-text-light-green
          tw-text-4xl
          '></i>
        </div>
        <div class="tw-flex-1">

          <div v-show="step === 1">
            <div class="tw-flex tw-items-center tw-mb-3">
              <span class="tw-w-1/5">Name</span>
              <input type="text" v-model="company.nameOfCompany" placeholder="Company Name" class="tw-px-7 tw-py-3 tw-text-sm tw-rounded-lg tw-w-1/2 tw-bg-gray-200 tw-border-none focus:tw-outline-none" />
            </div>

            <div class="tw-flex tw-items-center tw-mb-3">
              <span class="tw-w-1/5">Location</span>
              <input type="text" v-model="company.location" placeholder="Abuja" class="tw-px-7 tw-py-3 tw-text-sm tw-rounded-lg tw-w-1/2 tw-bg-gray-200 tw-border-none focus:tw-outline-none" />
            </div>

            <div class="tw-flex tw-items-center tw-mb-3">
              <span class="tw-w-1/5">Address</span>
              <input type="text" v-model="company.address" placeholder="plot 238, shehu shagri way, CBD" class="tw-px-7 tw-py-3 tw-text-sm tw-rounded-lg tw-w-1/2 tw-bg-gray-200 tw-border-none focus:tw-outline-none" />
            </div>

            <div class="tw-flex tw-items-center tw-mb-3">
              <span class="tw-w-1/5">RC Number</span>
              <input type="text" v-model="company.rcNumber" placeholder="562736" class="tw-px-7 tw-py-3 tw-text-sm tw-rounded-lg tw-w-1/2 tw-bg-gray-200 tw-border-none focus:tw-outline-none" />
            </div>

            <div class="tw-flex tw-items-center tw-mb-3">
              <span class="tw-w-1/5">Date Of Inc</span>
              <input type="date" v-model="company.dateOfIncorporation" class="tw-px-7 tw-py-3 tw-text-sm tw-rounded-lg tw-w-1/2 tw-bg-gray-200 tw-border-none focus:tw-outline-none" />
            </div>

            <div class="tw-flex tw-items-center tw-mb-3">
              <span class="tw-w-1/5">TIN</span>
              <input type="text" v-model="company.tin" placeholder="67432" class="tw-px-7 tw-py-3 tw-text-sm tw-rounded-lg tw-w-1/2 tw-bg-gray-200 tw-border-none focus:tw-outline-none" />
            </div>

            <div class="tw-flex tw-items-center tw-mb-3">
              <span class="tw-w-1/5">Phone</span>
              <input type="text" v-model="company.phoneNumber" placeholder="67432" class="tw-px-7 tw-py-3 tw-text-sm tw-rounded-lg tw-w-1/2 tw-bg-gray-200 tw-border-none focus:tw-outline-none" />
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
              <UploadBox @upload-event="$refs.certificateOfIncorporation.click()"/>

              <div v-if="company.certificateOfIncorporation" class="tw-flex tw-items-center tw-mt-1 tw-gap-1">
                <span class="tw-text-xs tw-text-gray-500">
                  {{ company.certificateOfIncorporation.name || 'certificateOfIncorporation' }}
                </span>
                <i @click="removeCertificateOfIncorporation" class='bx bx-trash tw-text-red-600 tw-cursor-pointer'></i>
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
              <UploadBox @upload-event="$refs.certificateOfTaxClearance.click()"/>

              <div v-if="company.certificateOfTaxClearance" class="tw-flex tw-items-center tw-mt-1 tw-gap-1">
                <span class="tw-text-xs tw-text-gray-500">
                  {{ company.certificateOfTaxClearance.name || 'certificateOfTaxClearance' }}
                </span>
                <i @click="removeCertificateOfTaxClearance" class='bx bx-trash tw-text-red-600 tw-cursor-pointer'></i>
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
              <UploadBox @upload-event="$refs.applicationLetter.click()"/>

              <div v-if="company.applicationLetter" class="tw-flex tw-items-center tw-mt-1 tw-gap-1">
                <span class="tw-text-xs tw-text-gray-500">
                  {{ company.applicationLetter.name || 'applicationLetter' }}
                </span>
                <i @click="removeApplicationLetter" class='bx bx-trash tw-text-red-600 tw-cursor-pointer'></i>
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
              <UploadBox @upload-event="$refs.evidenceOfPayment.click()"/>

              <div v-if="company.evidenceOfPayment" class="tw-flex tw-items-center tw-mt-1 tw-gap-1">
                <span class="tw-text-xs tw-text-gray-500">
                  {{ company.evidenceOfPayment.name || 'evidenceOfPayment' }}
                </span>
                <i @click="removeEvidenceOfPayment" class='bx bx-trash tw-text-red-600 tw-cursor-pointer'></i>
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
              <UploadBox @upload-event="$refs.letterOfCredibilityFromBanks.click()"/>

              <div v-if="company.letterOfCredibilityFromBanks" class="tw-flex tw-items-center tw-mt-1 tw-gap-1">
                <span class="tw-text-xs tw-text-gray-500">{{ company.letterOfCredibilityFromBanks.name || 'letterOfCredibilityFromBanks' }}</span>
                <i @click="removeLetterOfCredibilityFromBanks" class='bx bx-trash tw-text-red-600 tw-cursor-pointer'></i>
              </div>
            </div>
            <!-- Letter Of Credibility From Banks End -->

            <!-- Collaboration Certificate With Foreign Partners -->
            <div class="tw-mb-4">
              <p class="tw-mb-2">Collaboration Certificate With Foreign Partners</p>
              <input
                ref="collaborationCertificateWithForeignPartners"
                type="file"
                class="tw-p-3 tw-rounded-sm tw-w-full tw-border tw-hidden"
                @change.prevent="setCollaborationCertificateWithForeignPartners"
              />

              <UploadBox @upload-event="$refs.collaborationCertificateWithForeignPartners.click()"/>

              <div v-if="company.collaborationCertificateWithForeignPartners" class="tw-flex tw-items-center tw-mt-1 tw-gap-1">
                <span class="tw-text-xs tw-text-gray-500">{{ company.collaborationCertificateWithForeignPartners.name || 'collaboration-certificate-with-foreign-partners' }}</span>
                <i @click="removeCollaborationCertificateWithForeignPartners" class='bx bx-trash tw-text-red-600 tw-cursor-pointer'></i>
              </div>
            </div>
            <!-- Collaboration Certificate With Foreign Partners End -->
          </div>

          <div v-show="step === 4">
            <!-- Curriculum Vitae Input -->
            <div class="tw-mb-4">
              <p class="tw-mb-2">Curriculum Vitae</p>
              <input
                ref="curriculumVitaeInput"
                type="file"
                class="tw-p-3 tw-rounded-sm tw-w-full tw-border tw-hidden"
                @change.prevent="setCurriculumVitaeInput"
              />

              <UploadBox @upload-event="$refs.curriculumVitaeInput.click()"/>

              <div v-if="company.curriculumVitaeInput" class="tw-flex tw-items-center tw-mt-1 tw-gap-1">
                <span class="tw-text-xs tw-text-gray-500">
                  {{ company.curriculumVitaeInput.name || 'curriculumVitae' }}
                </span>
                <i @click="removeCurriculumVitaeInput" class='bx bx-trash tw-text-red-600 tw-cursor-pointer'></i>
              </div>
            </div>
            <!-- Curriculum Vitae Input End -->

            <!-- Board Of Directors -->
            <div class="tw-mb-4">
              <p class="tw-mb-2">Board Of Directors</p>
              <input
                ref="boardOfDirectorsInput"
                type="file"
                class="tw-p-3 tw-rounded-sm tw-w-full tw-border tw-hidden"
                @change.prevent="setBoardOfDirectorsInput"
              />

              <UploadBox @upload-event="$refs.boardOfDirectorsInput.click()"/>

              <div v-if="company.boardOfDirectorsInput" class="tw-flex tw-items-center tw-mt-1 tw-gap-1">
                <span class="tw-text-xs tw-text-gray-500">
                  {{ company.boardOfDirectorsInput.name || 'boardOfDirectors' }}
                </span>
                <i @click="removeBoardOfDirectorsInput" class='bx bx-trash tw-text-red-600 tw-cursor-pointer'></i>
              </div>
            </div>
            <!-- Board Of Directors End -->



          </div>

          <div class="tw-flex tw-justify-start tw-my-10 tw-gap-4">
            <button v-if="step > 1" @click="previous"
            class="
            tw-bg-gray-600
            tw-text-white
            tw-w-1/6
            tw-p-3
            tw-text-sm
            ">
              Back
            </button>
            <button @click="next"
            v-if="step <= 3"
            class="
            tw-bg-light-green
            tw-text-white
            tw-w-1/6
            tw-p-3
            tw-text-sm
            ">
              Next
            </button>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import GetCompany from "~/apollo/queries/user/getCompany";
import UpdateCompany from "~/apollo/mutations/user/editCompany";

export default {
  name: 'company',
  layout: 'home',
  middleware:'unauthenticated_user',
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
      loadingCompany: false,
      editing: false,
      step: 1
    }
  },


  mounted(){
    this.getCompany()
  },

  computed: {
    step_one_complete() {
      return this.company.nameOfCompany && this.company.location && this.company.address && this.company.rcNumber && this.company.dateOfIncorporation && this.company.tin && this.company.phoneNumber ? true : false
    },
    step_two_complete(){
      return this.company.certificateOfIncorporation && this.company.certificateOfTaxClearance && this.company.applicationLetter ? true : false
    },
    step_three_complete(){
      return this.company.evidenceOfPayment && this.company.letterOfCredibilityFromBanks && this.company.collaborationCertificateWithForeignPartners ? true : false
    },
    step_four_complete(){
      return this.company.curriculumVitaeInput && this.company.boardOfDirectorsInput ? true : false
    },

  },

  methods: {
    async getCompany(){

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
      this.$throwError(err)
      }finally {
        this.loadingCompany = false;
      }
    },

    async createCompany(){

      try {
        this.editing = true;
        const res = await this.$apollo.mutate({
          mutation: UpdateCompany,
          variables: this.company
        });
        console.log(res);
        this.getCompany()
        this.$toast.success('Company Updated')

      } catch (errors) {
        this.$throwError(errors)
      }finally{
        this.editing = false;
      }
    },

    next() {
      if (this.step === 1) {
        if (this.step_one_complete) {
          this.step += 1;
          return;
        }
      }
      if (this.step === 2) {
        if (this.step_two_complete) {
          this.step += 1;
          return;
        }
      }
      if (this.step === 3) {
        if (this.step_three_complete) {
          this.step += 1;
          return;
        }
      }
      if (this.step === 4) {
        if (this.step_four_complete) {
          this.step += 1;
          return;
        }
      }

      return this.$toast.error(`Step ${this.step} is incomplete`)

    },
    previous() {
      this.step -= 1;
    },

    navigate_step(no){
      this.step = no;
    },

    setCertificateOfIncorporation(e){
      this.company.certificateOfIncorporation = e.target.files[0];
    },
    setCertificateOfTaxClearance(e){
      this.company.certificateOfTaxClearance = e.target.files[0];
    },
    setApplicationLetter(e){
      this.company.applicationLetter = e.target.files[0];
    },
    setEvidenceOfPayment(e){
      this.company.evidenceOfPayment = e.target.files[0];
    },
    setLetterOfCredibilityFromBanks(e){
      this.company.letterOfCredibilityFromBanks = e.target.files[0];
    },
    setCollaborationCertificateWithForeignPartners(e){
      this.company.collaborationCertificateWithForeignPartners = e.target.files[0];
    },
    setCurriculumVitaeInput(e){
      this.company.curriculumVitaeInput = e.target.files[0];
    },
    setBoardOfDirectorsInput(e){
      this.company.boardOfDirectorsInput = e.target.files[0];
    },

    removeCertificateOfIncorporation(){
      this.company.certificateOfIncorporation = null;
    },
    removeCertificateOfTaxClearance(){
      this.company.certificateOfTaxClearance = null;
    },
    removeApplicationLetter(){
      this.company.applicationLetter = null;
    },
    removeEvidenceOfPayment(){
      this.company.evidenceOfPayment = null;
    },
    removeLetterOfCredibilityFromBanks(){
      this.company.letterOfCredibilityFromBanks = null;
    },
    removeCollaborationCertificateWithForeignPartners(){
      this.company.collaborationCertificateWithForeignPartners = null;
    },
    removeCurriculumVitaeInput(){
      this.company.curriculumVitaeInput = null;
    },
    removeBoardOfDirectorsInput(){
      this.company.boardOfDirectorsInput = null;
    },

  },

  watch: {
    step(value){
    //   let navicons = document.querySelectorAll('.compliance_navicon');
    //   navicons.forEach(element => {
    //     element.classList.remove('active');
    //   });

      for (let i = 1; i < value; i++) {
        if (i < 5) {
          this.$refs[`step_${i}`].classList.add('completed')
        }
      }
    }
  }

}
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
  color: lightgrey
}

#progressbar .completed {
    /* color: #673AB7 */
    @apply tw-text-dark-green;
}

#progressbar li {
  /* list-style-type: none; */
  /* font-size: 15px; */
  width: 25%;
  float: left;
  position: relative;
  font-weight: 400;
}

#progressbar #step_one:before {
    content: "1"
}

#progressbar #step_two:before {
    content: "2"
}

#progressbar #step_three:before {
    content: "3"
}

#progressbar #step_four:before {
    content: "4"
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
    content: '';
    width: 100%;
    height: 2px;
    background: lightgray;
    position: absolute;
    left: 0;
    top: 25px;
    z-index: -1
}

#progressbar li.completed:before,
#progressbar li.completed:after {
  /* background: #673AB7 */
  @apply tw-bg-dark-green;
}

.progress {
    height: 20px
}

.progress-bar {
  /* background-color: #673AB7; */
  @apply tw-bg-dark-green;
}

.fit-image {
    width: 100%;
    object-fit: cover
}
</style>
