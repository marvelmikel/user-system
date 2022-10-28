<template>
  <div>
      <div class="tw-w-full">
          <PuSkeleton :duration="1.5" />
      </div>
      <div class="tw-w-5/6">
          <PuSkeleton :duration="3" />
      </div>
      <div class="tw-w-4/6">
          <PuSkeleton  />
      </div>
      <div class="tw-w-3/6">
          <PuSkeleton  />
      </div>
      <div class="tw-w-5/6">
          <PuSkeleton  />
      </div>
      <div class="tw-w-2/6">
          <PuSkeleton  />
      </div>
      <div class="tw-w-1/6">
          <PuSkeleton  />
      </div>
      <div class="tw-w-3/6">
          <PuSkeleton  />
      </div>
      <div class="tw-w-4/6">
          <PuSkeleton  />
      </div>
  </div>
</template>
<script>
export default {
  name: "preloader",

};
</script>
