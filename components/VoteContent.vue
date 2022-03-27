<template>
    <v-card height="75.8vh" class="scrollablecard " tile flat>
    <v-container class="px-10" v-if="field"> 
        <v-card flat class="mt-5 px-3" tile color="#F9FDFA" v-for="(item, index) in field" :key="item._id" >
            <v-card-title class="font-weight-normal grey--text text--darken-1">
                <div>{{ item.position }}</div>
            </v-card-title>
            <v-divider color="#88E2AD"></v-divider>
            <v-card-text>
                <v-container>
                    <div :class=" item.maxVote > 1 ? 'font-weight-light subtitle-1 mb-4' : 'font-weight-light subtitle-1'">
                        Select maximum of {{ item.maxVote }} candidate(s)
                    </div>
                    <v-row>
                        <v-col cols="6" v-if="item.maxVote > 1"> 
                           <v-checkbox @change="handleChange(index, item.maxVote)" dense color="#04A967" small v-for="selected in candidate(item.position)" :key="selected._id" :label="`${selected.lastname} ${selected.firstname} (${ selected.party }) `" v-model="item.vote" :value="selected._id"></v-checkbox>
                        </v-col>
                         <v-col cols="6" v-else >
                             <v-radio-group v-model="item.vote">
                                 <v-radio @change="handleRadioChange" class="py-2" color="#04A967" small v-for="selected in candidate(item.position)" :key="selected._id"  :label="`${selected.lastname} ${selected.firstname} (${ selected.party }) `" :value="selected._id"></v-radio>
                             </v-radio-group>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
    <v-card-actions>
        <v-spacer></v-spacer>
            <v-btn @click="previewDialog = !previewDialog" x-large outlined width="135px" dark tile style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);" class="text-capitalize my-8 mr-2 " color="#04A967">Preview</v-btn>
            <v-btn x-large :loading="loading" @click="handleVotes" width="135px" dark tile style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);" class="text-capitalize my-8 ml-2 " color="#04A967">Submit</v-btn>
        <v-spacer></v-spacer>
        </v-card-actions>


        <!-- Preview Dialog  -->
        <v-dialog
          v-model="previewDialog"
          persistent 
          max-width="500px"
          transition="dialog-transition"
          scrollable
        >
          <v-card class="px-10 pb-10 pt-5" >
                <div class="text-subheader mb-2">Vote Preview</div>
             <v-divider></v-divider>
             <v-card-text class="mt-5">
                 <div v-for="item in field" :key="item._id">
                    <div class="text-subheader mt-3 mb-1 font-weight-bold">{{ item.position }}</div>
                    <div v-if="item.maxVote > 1">
                        <div v-for="selected in item.vote" :key="selected">{{ getCandidate(selected) }}</div>
                    </div>
                    <div v-else>{{ getCandidate(item.vote) }}</div>
               </div>
             </v-card-text>
             <v-card-actions >
               <v-btn @click="previewDialog = !previewDialog" x-large width="135px"  dark tile style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);" class="text-capitalize mt-8 ml-2 " color="#04A967">Close</v-btn>
               <v-spacer></v-spacer>
             </v-card-actions>
          </v-card>
        </v-dialog>
       <v-snackbar
        v-model="snackbar"
        :color=" !resType ? '#FFCDD2' : 'success'"
        top
        elevation="0"
      >
      <v-spacer></v-spacer>
      <div :class=" !resType ? 'caption black--text text-center' : 'caption text-center' ">
        {{ resMessage }}
      </div>
      </v-snackbar>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, useContext, useRouter } from '@nuxtjs/composition-api'
import { candidateDetails, editPosition, userDetails, usersVote } from '~/types/interface'

export default defineComponent({
   
   

    setup() {
        const field = ref<editPosition[]>([])
        const { $axios, store } = useContext()
        const router = useRouter()
        const candidates = ref<candidateDetails[]>([])
        const previewDialog = ref<boolean>(false)
        const loading = ref<boolean>(false)
        const snackbar = ref<boolean>(false)
        const resType = ref<boolean>(false)
        const resMessage = ref<string>('')

        onMounted(async () => {
        // @ts-ignore
          const res = await $axios.$get('/position')
          field.value = res.map((item: editPosition) => {
              return { 
                  position: item.position,
                  vote: item.maxVote === 1 ? null : [],
                  maxVote: item.maxVote
               } as editPosition
          })

          await $axios.$get(`/candidate?electionDate=${ store.state.user.electionDate }`).then( res => candidates.value = res)  
        //   @ts-ignore 
          const selectedVotes = JSON.parse(localStorage.getItem('savedVotes'))
          if(selectedVotes) field.value = selectedVotes
        })

    //     Watcher
    

        //  Methods
        const candidate =  (pos: string) => {
         return candidates.value.filter((item: candidateDetails) =>  item.position == pos )
        }

        const handleChange = (i: number , max: number) => {
            // @ts-ignore
            if(field.value[i].vote?.length > max) field.value[i].vote.pop()
            localStorage.setItem('savedVotes', JSON.stringify(field.value))
        }
        const handleRadioChange = () => {
            const data = field.value
            localStorage.setItem('savedVotes', JSON.stringify(data))
        }

        const getCandidate = (id: string) => {
           const data: candidateDetails | undefined = candidates.value.find(item => item._id === id)
            return `${ data?.lastname } ${ data?.firstname } - ${ data?.party }`

        }
        
        const handleVotes = async () => {
            try {
                loading.value = true
                const user: userDetails = store.state.voterDetails
                const data: usersVote  = {
                      userID: user._id,
                      votes: field.value,
                      electionDate: user.electionDate
                }
               const res = await $axios.$post('/votes/addvote', data)
               snackbar.value = true
                resType.value = true
                resMessage.value = res
               loading.value = false
               localStorage.removeItem('savedVotes')
               await store.dispatch('removeVoteSession')
               router.push('/admin')
               
            } catch (error: any) {
                console.log(error.response.data)
                loading.value = false
                snackbar.value = true
                resType.value = false
                resMessage.value = error.response.data
            }
        }
        
        return {
            field,
            candidate,
            handleChange,
            handleRadioChange,
            getCandidate,
            previewDialog,
            loading,
            handleVotes
        }
    },
})
</script>
<style scoped>
.v-card.scrollablecard{
    overflow: scroll;
    background: transparent;
}
</style>
