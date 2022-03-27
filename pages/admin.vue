<template>
    <div>
        <head-bar :navs="navs" />
        <nuxt-child />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  middleware: 'admin',
  setup(){
    const navs = ref<object[]>([
      { name: 'Dashboard', icon: 'mdi-view-dashboard-outline', link: '/admin' },
      { name: 'Positions', icon: 'mdi-contacts-outline', link: '/admin/positions' },
      { name: 'Candidates', icon: 'mdi-format-list-checkbox', link: '/admin/candidates' },
      { name: 'Voters', icon: 'mdi-account-outline', link: '/admin/voters' },
      { name: 'Results', icon: 'mdi-vote-outline', link: '/admin/votes' }
    ])
    return{
      navs
    }
  }

})
</script>

<style>

</style>