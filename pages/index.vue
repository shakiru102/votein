<template>
    <div>
        <head-bar :navs="navs" />
        <nuxt-child />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
// import HeadBar from '~/components/HeadBar.vue'
export default defineComponent({
  // components: { HeadBar },
  middleware: 'auth',
  setup(){
    const navs = ref<object[]>([
      { name: 'Election details', icon: 'mdi-view-dashboard-outline', link: '/' },
      { name: 'Candidates', icon: 'mdi-format-list-checkbox', link: '/candidates' },
      { name: 'Profile', icon: 'mdi-account-outline', link: '/profile' },
    ])
    return{
      navs
    }
  }

})
</script>

<style>

</style>