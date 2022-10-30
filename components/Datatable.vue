<template>
    <div>
        <v-container fluid class="px-10">
            <slot />
           <v-data-table
               :headers="headers"
               :items="items"
               :items-per-page="7"
               :footer-props="footerProps"
               :loading="tabLoading"
               loader-height="0"
               loading-text="Loading.... Please wait"
           >
            <template v-slot:item.votes="{ item }">
                <div>{{ electedVotes(item._id, item.position) }}</div>
            </template> 
               <template v-slot:item.actions="{ item }" >
                <v-icon
                    small
                    class="mr-2"
                    color="success"
                    @click="editData(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                  color="error"
                    small
                    @click="deleteData(item)"
                >
                    mdi-delete
                </v-icon>
                </template>
           </v-data-table>
        </v-container>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useContext } from "@nuxtjs/composition-api"
import { editPosition, usersVote } from "~/types/interface"


export default defineComponent ({
    props: [ "headers", "items", "editData", "deleteData", "tabLoading" ],
    data: () => ({
    footerProps: {
        "disable-items-per-page": true,
        "show-current-page": true,
    },
    }),

    setup(){
        
        const { $axios, store } = useContext()

        const votes = ref<usersVote[]>([])

        onMounted(async () => {
            await $axios.$get(`/votes?electionDate=${ store.state.user.electionDate }`)
            .then(res => votes.value = res)
            .catch(err => console.log(err.response.data))

            console.log(votes.value)
        })

        const electedVotes = (id: string, position: string) => {
            const data: editPosition[] = []
            votes.value.forEach((item) => {
               item.votes.forEach(doc => data.push(doc))
            })
          const elected =  data.filter((item) => item?.position == position && item.vote?.includes(id))
           return elected.length
        }

        return {
            votes,
            electedVotes
        }
    }
})
</script>
