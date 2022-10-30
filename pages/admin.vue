<template>
    <div>
        <head-bar :navs="navs" />
        <nuxt-child />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  middleware: 'admin',
  setup(){

    const { store } = useContext()

    const navs = ref<object[]>([
      { name: 'Dashboard', icon: 'mdi-view-dashboard-outline', link: '/admin' },
      { name: 'Positions', icon: 'mdi-contacts-outline', link: '/admin/positions' },
      { name: 'Candidates', icon: 'mdi-format-list-checkbox', link: '/admin/candidates' },
      { name: 'Voters', icon: 'mdi-account-outline', link: '/admin/voters' },
      ( store.state.user.super && { name: 'Results', icon: 'mdi-vote-outline', link: '/admin/votes' })
    ])
    return{
      navs
    }
  }

})
</script>

<style>

</style>