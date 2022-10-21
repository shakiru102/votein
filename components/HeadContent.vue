<template>
    <v-toolbar flat color="transparent" class="mt-16 px-10">
        <v-toolbar-title class="mb-4">
            <div class="display-1" style="position: relative; top: 0.4em;"><slot /></div>
            <img src="@/assets/Vector 8.png" alt="">
        </v-toolbar-title>
        <v-spacer></v-spacer>
            <div v-if="$store.state.user.admin">
             <v-btn width="198px" height="45px"  v-if="!$store.state.voting && !$store.state.continue" x-large @click="dialog = !dialog" dark tile style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);" class="text-capitalize" color="#04A967">Start Voting</v-btn>
             <v-btn width="198px" height="45px"  v-else-if="!$store.state.continue && $store.state.voting" x-large @click="endDialog = !endDialog"  dark tile style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);" class="text-capitalize" color="#04A967">End Voting</v-btn>
             <v-btn width="198px" height="45px"  v-else x-large to="/admin/uservote" dark tile style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);" class="text-capitalize" color="#04A967">Continue Voting</v-btn>
             </div>
             <v-dialog
        v-model="dialog"
        max-width="500px"
        transition="dialog-transition"
        persistent
    >
        <v-card class="pa-16 text-center">
          <div class="text-right">
             <v-btn 
        @click="dialog = !dialog"
        x-small
        width="35px"
        height="35px" 
        elevation="0"
        style=" position: absolute; top: 3em; border-radius: 10px; backdrop-filter: blur(5px);" 
        color="#CEF9E8">
          <v-icon color="#039058">mdi-close</v-icon>
        </v-btn>
          </div>
          <div class="text-center display-1" style="color: #039058;">Scan Fingerprint</div>
          <div class="" style="color: #85A598; font-size: 18px;">Please place your finger on the fingerprint scanner to vote.</div>
          <img class="my-10" src="@/assets/fingerprint scanner.png" alt="">
          <div class="text-center">
            <div :style=" !registered ? 'font-size: 30px; color: #85A598;' : 'font-size: 30px; color: #039058;'" class="percent">{{ !registered ? '0%' : '100%' }}</div>
            <div style="font-size: 20px; color: #85A598;" class="scan">{{ !registered ?' Scan' : 'Scan completed!'}}</div>
          </div>
          <v-card-actions>
          </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- End Votinf=g session -->
    <v-dialog
          v-model="endDialog"
          persistent 
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card class="px-10 pb-10 pt-5" >
                <div class="text-subheader mb-2">End Voting</div>
             <v-divider></v-divider>
             <v-card-text class="text-center mt-16">
               <div class="text-subheader mb-3">End Voting?</div>
               <div class="text-h6">You are about to end the vote session all data will be lost</div>
             </v-card-text>
             <v-card-actions >
               <v-spacer></v-spacer>
               <v-btn min-width="118px" @click="initiateEnd"   class="text-capitalize" color="error" dark large tile style="box-shadow: 0px 14px 50px rgba(221, 75, 57, 0.15);">Yes</v-btn>
               <v-btn min-width="118px"  class="text-capitalize" @click="endDialog = !endDialog"  color="error" text large tile>Cancel</v-btn>
               <v-spacer></v-spacer>
             </v-card-actions>
          </v-card>
        </v-dialog>
     <v-snackbar
        v-model="snackbar"
        color="#FFCDD2"
        top
        elevation="0"
      >
      <v-spacer></v-spacer>
      <div class="caption black--text text-center">
        {{ errortext }}
      </div>
      </v-snackbar>
    </v-toolbar>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, useContext, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
   
   mounted(){
       this.initIO(this)
   }, 

    setup() {
        const { store } = useContext()
        const router = useRouter()
        const dialog = ref<boolean>(false)
        const endDialog = ref<boolean>(false)
        const snackbar = ref<boolean>(false)
        const registered = ref<boolean>(false)
        const errortext = ref<string>('')
        let socket = reactive<any>({})
        let $ = reactive<any>({})
         
        onMounted(() => {
            // @ts-ignore
            socket.on('vote', payload => {
                if(dialog.value){
                    store.dispatch('initiateVoteToken', payload)
                    dialog.value = false
                    router.push('/admin/uservote')

                }
            })

            socket.on('voteError', ({ error }: any) => {
                if(dialog.value){
                    console.log(error)
                    dialog.value = false
                    snackbar.value = true
                    errortext.value = error
                }
                
           })
        
        })

        // const btnsurgestion = computed(() => store.state.voting) 

           

         const initIO = (param: any) => {
             $ = param
             socket = $.$nuxtSocket({
                 name: 'main'
             })
         }

         const initiateEnd = () => {
             localStorage.removeItem('savedVotes')
             store.dispatch('removeVoteSession')
             endDialog.value = !endDialog.value
             router.push('/admin')
         }


        return {
            dialog,
            snackbar,
            registered,
            initIO, 
            errortext,
            initiateEnd,
            endDialog

        }
    },
})
</script>
