<template>
  <div class="tw-flex tw-items-center tw-justify-center tw-w-full">

    <label :for="`dot__holder__${id}`" class="tw-flex tw-items-center tw-cursor-pointer">
      <!-- toggle -->
      <div class="tw-relative">
        <!-- input -->
        <input type="checkbox" :checked="state ? true : false" :id="`dot__holder__${id}`" class="tw-sr-only" @change="test">

        <!-- line -->
        <div :id="`dot__holder__${id}`"
        :class="state ? 'tw-bg-lighter-green' : 'tw-bg-gray-300' "
        class="tw-block tw-w-14 tw-h-8 tw-rounded-full dot__holder"></div>

        <!-- dot -->
        <div :id="`dot__${id}`"
        :class="state ? 'on' : 'off' "
        class="dot tw-absolute tw-left-1 tw-top-1  tw-w-6 tw-h-6 tw-rounded-full tw-transition"></div>
      </div>

      <!-- label -->
      <!-- <div class="tw-ml-3 tw-text-gray-700 tw-font-medium">
        Toggle Me!
      </div> -->
    </label>

  </div>
</template>

<script>
export default {
  name: 'ToggleBtn',
  props: {
    state:{
        type:Boolean,
        // default: false,
    },
    id: {
      type: Number
    }
  },
  methods: {
    test(e){
      this.$emit('checkedevent', {checked: e.target.checked, id: this.id});
    }

  }
}
</script>

<style scoped>
.off {
  transform: translateX(0%);
  @apply tw-bg-gray-500;
}

.on{
  transform: translateX(100%);
  @apply tw-bg-bright-green;
}


</style>
