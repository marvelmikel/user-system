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
          Edit
        </button>
      </div>
    </div>

    <div v-if="loadingCompany" class="tw-flex tw-items-center tw-justify-center tw-mt-5">
      <div class="tw-w-1/2">
        <PuSkeleton :count="6"/>
      </div>
    </div>

    <div v-else>

      <div class="
      tw-w-5/12
      tw-mx-auto
      tw-mt-8
      ">
        <div class="tw-flex tw-justify-between tw-text-2xl tw-font-bold">
          <div ref="step_1" @click="navigate_step(1)" class="tw-flex tw-items-center tw-justify-center compliance_navicon active">
            <span>1</span>
            <!-- <i class='bx bx-check complete_compliance'></i> -->
          </div>
          <div ref="step_2" @click="navigate_step(2)" class="tw-flex tw-items-center tw-justify-center compliance_navicon">
            <span>2</span>
            <!-- <span class="incomplete_compliance">!</span> -->
          </div>
          <div ref="step_3" @click="navigate_step(3)" class="tw-flex tw-items-center tw-justify-center compliance_navicon">
            <span>3</span>
            <!-- <span class="incomplete_compliance">!</span> -->
          </div>
          <div ref="step_4" @click="navigate_step(4)" class="tw-flex tw-items-center tw-justify-center compliance_navicon">
            <span>4</span>
            <!-- <span class="incomplete_compliance">!</span> -->
          </div>
        </div>
      </div>

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
          <!-- <InputItem :label="'Name'" :value="'John Doe'"/>
          <InputItem :label="'Location'" :value="'Abuja'"/>
          <InputItem :label="'Address'" :value="'plot 238, shehu shagri way, CBD'"/>
          <InputItem :label="'RC Number'" :value="'562736'"/>
          <InputItem :label="'Date Of Inc'" :value="'6th July 2021'"/>
          <InputItem :label="'TIN'" :value="'67432'"/>
          <InputItem :label="'Phone'" :value="'johndoe@gmail.com'"/> -->
          <div>
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
        profilePic: null
      },
      loadingCompany: false,
      editing: false,
      step: 1
    }
  },


  mounted(){
    this.getCompany()
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
        console.log(errors);
        this.$throwError(errors)
      }finally{
        this.editing = false;
      }
    },

    next() {
      this.step += 1;
    },
    previous() {
      this.step -= 1;
    },

    navigate_step(no){
      this.step = no;
    }
  },

  watch: {
    step(value){
      let navicons = document.querySelectorAll('.compliance_navicon');
      navicons.forEach(element => {
        element.classList.remove('active');
      });

      this.$refs[`step_${value}`].classList.add('active')
    }
  }

}
</script>

<style scoped>
.profile__img {
  font-size: 9rem;
}





.active_step {
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
  width: 80px;
  height: 80px;
  color: #c4c4c4;
}

.compliance_navicon.active .complete_compliance, .compliance_navicon.active .incomplete_compliance {
  color: #fff;
}
</style>
