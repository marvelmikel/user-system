<template>
  <!-- The Modal -->
  <div v-if="isOpen" class="modal" @click.self="$emit('close-modal')">
    <!-- Modal content -->
    <div data-aos="zoom-in" :class="customClass" class="modal-content">
     <div class="tw-space-y-2">
       <div class="tw-flex tw-items-center tw-justify-between">
        <div>
          <h1 class="tw-text-xl tw-font-bold">{{title}}</h1>
        </div>
        <i v-if="button" class="close bx bx-x"  @click.self="$emit('close-modal')"></i>
      </div>
      <slot></slot>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customClass: {
      type: Array,
      default: () => {
        return ["tw-w-3/5"];
      },
    },
    isOpen:{
      type: Boolean,
      default: false
    },
    title:{
      type: String,
      default:''
    },
    button:{
       type: Boolean,
      default:true
    }
  },
  methods: {},
};
</script>

<style scoped>
.modal {
  @apply tw-fixed tw-z-50  tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-w-full tw-h-full tw-overflow-auto tw-bg-black;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  @apply tw-bg-white tw-p-5 ;
  margin: 100px 0;
}

/* The Close Button */
.close {
  @apply tw-text-gray-500 tw-float-right tw-text-3xl tw-font-bold;
}

.close:hover,
.close:focus {
  @apply tw-text-black tw-no-underline tw-cursor-pointer;
}
</style>
