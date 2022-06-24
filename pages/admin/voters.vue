<template>
    <div>
     <head-content > Voters </head-content>
    <datatable :headers="headers" :items="items" />
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, useContext } from "@nuxtjs/composition-api"
import { userDetails } from "~/types/interface"



export default  defineComponent({

    data: () => ({ 
        headers: [
            { class: 'subtitle-1 green accent-1', align: "center", text: 'S/N', value: 'number' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'First name', value: 'firstname' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'Last name', value: 'lastname' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'Voter ID', value: 'voterID' },
            { class: 'subtitle-1 green accent-1', align: "center", text: 'Mobile', value: 'phonenumber' },
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

       const { $axios } = useContext()
       const data = ref<userDetails[]>([])
        onMounted(async () => {
            const res = await $axios.$get('/admin/voters')
            console.log(res);
            
            data.value = res
        })

        return { data }
    }
    

    
})
</script>