<template>
    <div>
     <head-content > Votes </head-content>
     <div style="width: 30%; margin-left: 3em;">
        <div class="subtitle-1">Select a Position</div>
        <v-select
     :items="positions"
     outlined
     color="#04A967"
     max-width="400px"
     dense
     v-model="position"
     placeholder="Position"
     />
     </div>
    <datatable v-if="position"  :headers="headers" :items="items" />
    </div>
</template>
<script lang="ts">

import { computed, defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api'
import { candidateDetails } from '~/types/interface'
import Positions from '~/composables/positions'
export default defineComponent({

    middleware: 'votes',

    setup(){
      const { $axios, store } = useContext()

      const { data } = Positions()

    //  @ts-ignore
      const positions = computed(() => data.value.map(item => item.position))
      const position = ref<string>('')
       
       const result = ref<candidateDetails[]>([])
       const headers = ref<object[]>([
            { class: 'subtitle-1 green accent-1', align: "center", text: 'S/N', value: 'number' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'Position', value: 'position' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'Candidates', value: 'candidate' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'Platform', value: 'party' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'Votes', value: 'votes' },
        ])
       const items = computed(() =>result.value.filter(item => item.position === position.value).map((item: candidateDetails, index) => {
                return { ...item , number: ++index , candidate: `${ item.lastname } ${ item.firstname }` }
           }))
        onMounted(async () => {
            
            await $axios.$get(`/candidate?electionDate=${ store.state.user.electionDate }`).then( res => result.value = res) 
        })
        
        return {
            headers,
            items,
            positions,
            position
        }
    }
})
</script>