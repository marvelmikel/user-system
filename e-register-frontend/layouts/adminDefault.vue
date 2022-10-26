<template>
  <div>
    <div class="
    sidebar
    tw-bg-dark-green
    tw-m-0
    tw-p-0
    tw-w-52
    tw-fixed
    tw-h-full
    tw-overflow-auto
    tw-text-white
    tw-text-start
    ">
      <div class="
      tw-p-10
      tw-flex
      tw-items-center
      tw-justify-center
      ">
        <img src="~/assets/images/white.svg" alt="white logo" />
      </div>
      <div>
        <nuxt-link class="
        active
        tw-block
        tw-py-4
        tw-px-12
        "
        to="/admin/companies">Companies</nuxt-link>
        <nuxt-link class="
        tw-block
        tw-py-4
        tw-px-12
        "
        to="/admin/accreditation" >Accreditations</nuxt-link>
        <nuxt-link class="
        tw-block
        tw-py-4
        tw-px-12
        "
        to="/admin/admins" >Admins</nuxt-link>
        <nuxt-link class="
        tw-block
        tw-py-4
        tw-px-12
        "
        to="/admin/categories" >Category</nuxt-link>
        <nuxt-link class="
        tw-block
        tw-py-4
        tw-px-12
        "
        to="/admin/settings">Settings</nuxt-link>
      </div>
    </div>

    <div class="content">
      <AdminMenu />

      <div class="tw-py-36 tw-w-11/12 tw-mx-auto tw-space-y-10">
        <Nuxt />
      </div>

    </div>
  </div>
</template>

<script>
import AdminMenu from '../components/AdminMenu.vue';
export default {
  components: { AdminMenu }
}
</script>

<style scoped>
.sidebar {
  width: 17%;
}
.sidebar .active {
  @apply tw-bg-light-green;
  color: white;
}

.sidebar a:hover:not(.active) {
  @apply tw-bg-white tw-text-dark-green;
}

div.content {
  height: 1000px;
  width: 83%;
  margin-left: 17%;

}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  div.content {margin-left: 0;}
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
</style>
