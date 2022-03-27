<template>
    <div>
     <head-content > Voters </head-content>
    <datatable :headers="headers" :items="items" />
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "@nuxtjs/composition-api"



export default  defineComponent({

    data: () => ({ 
        data: [
            { mobile: "08064778486", firstname: "Ladipo", lastname: "Fiwajomi", voterid: "00049", },
        ] ,
        headers: [
            { class: 'subtitle-1 green accent-1', align: "center", text: 'S/N', value: 'number' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'First name', value: 'firstname' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'Last name', value: 'lastname' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'Voter ID', value: 'voterid' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'Mobile', value: 'mobile' },
        ],
    }),
    computed: {
        items(): any{
            // @ts-ignore
           return this.data.map((item, index) => {
               return { ...item, number: ++index}
           })
        }
    },

    setup(){
        
    }
    

    
})
</script>