<template>
    <div>
     <head-content > Votes </head-content>
    <datatable  :headers="headers" :items="items" />
    </div>
</template>
<script lang="ts">

import { computed, defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api'
import { candidateDetails } from '~/types/interface'
export default defineComponent({
    setup(){
      const { $axios, store } = useContext()
       
       const data = ref<candidateDetails[]>([])
       const headers = ref<object[]>([
            { class: 'subtitle-1 green accent-1', align: "center", text: 'S/N', value: 'number' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'Position', value: 'position' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'Candidates', value: 'candidate' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'Platform', value: 'party' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'Votes', value: 'votes' },
        ])
       const items = computed(() =>data.value.map((item: candidateDetails, index) => {
               return { ...item , number: ++index , candidate: `${ item.lastname } ${ item.firstname }` }
           }))
        onMounted(async () => {
            await $axios.$get(`/candidate?electionDate=${ store.state.user.electionDate }`).then( res => data.value = res) 
        })
        
        return {
            headers,
            items
        }
    }
})
</script>