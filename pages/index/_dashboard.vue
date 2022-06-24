<template>
    <div>
     <head-content > {{ electionTitle.electionDate }} SRC ELECTIONS </head-content>
     <v-card class="pa-16 mx-16" flat tile color="#F9FDFA"> 
        <v-card-text>
            <p>
                Information is necessary for efficient functioning in every sphere of human endeavour. For the  {{ electionTitle.electionDate }} Elections in particular, some basic information can be helpful in understanding and interpreting the processes. This compendium is designed to provide such basic information.
            </p>
            <p>
                The Information is a compilation of electoral information about when the Student Representative Council Elections will be conducted. These bits of information will be useful for anyone wishing to follow and understand the polling process. It is hoped that voters, media professionals and election observers, among others, will find this information handy in understanding the processes of the general election.
            </p>
            <p>
                The {{ electionTitle.electionDate }} SRC will kick off on:
            </p>
            <p style="color: #039058; font-size: 22px; font-weight: 600">{{ electionTitle.date || '25th of July, 2022 ' }}at {{ electionTitle.time || '10:00'}}am</p>
            <p style="font-weight: 600">{{ electionTitle.admin || 'Tiamiyu Mubarak O.' }}<br/><span style="font-weight: normal;">admin</span> </p>
        </v-card-text>
     </v-card>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
    setup(){
       
       const electionTitle = ref<string>('')
      const { $axios } = useContext()
       onMounted(async () => {
            const title = await $axios.$get('/currentElectionTitle')
            electionTitle.value = title.electionDate
            
       })
 

        return {
        electionTitle
        }
    }
})
</script>