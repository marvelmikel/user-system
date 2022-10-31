<template>
  <div class="tw-flex tw-items-center tw-mb-3">
    <span class="tw-w-1/5">{{ label }}</span>
    <input type="text" :placeholder="value" class="tw-px-7 tw-py-3 tw-text-sm tw-rounded-lg tw-w-1/2 tw-bg-gray-200 tw-border-none focus:tw-outline-none" />
  </div>
</template>

<script>
export default {
  name: 'InputItem',
  props: ['label', 'value']
}
</script>

<style>

</style>
