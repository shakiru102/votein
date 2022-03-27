<template>
    <div>
      <v-app-bar 
      flat
      color="white"
      height="70px"
      >
        <v-text-field
          placeholder="search"
          append-icon="mdi-magnify"
          outlined
          color="#04A967"
          class="mt-6 ml-10"
          background-color="#F8FCFA"
          dense
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
       <v-avatar>
          <img src="@/assets/white.png" alt="">
       </v-avatar>
       <span v-if="$store.state.user" style="color: #039058;" class="mr-10">{{ $store.state.user.admin ? $store.state.user.email  : `${$store.state.user.lastname} ${$store.state.user.firstname}`  }}</span>
       <v-progress-linear height="2px" color="#04A96763" absolute bottom></v-progress-linear>
      </v-app-bar>
      <v-navigation-drawer app permanent color="#039058" width="292px">
        <div style="background: rgba(255, 255, 255, 0.37);">
          <v-container>
            <div class="d-flex align-center">
                <img src="@/assets/Group 8.png" />
                <span class="white--text display-1 ml-2">Vote-In</span>
              </div>
          </v-container>
        </div>
        <v-container>
              <v-list class="mt-16">
                <v-list-item v-for="(item, index) in navs" nuxt exact :key="index" :to="item.link"  class="white--text"> 
                  <v-list-item-icon>
                    <v-icon color="white">{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle class="white--text">{{ item.name }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="dialog = !dialog" v-if="$store.state.user.admin"  style="margin-top: 15em;"  class="white--text"> 
                  <v-list-item-icon>
                    <v-icon color="white">mdi-cog-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle class="white--text">ELection TItle</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item >
                <v-list-item :style="$store.state.user.admin ? 'margin-top: 0;' : 'margin-top: 15em;'" @click="signout"  class="white--text"> 
                  <v-list-item-icon>
                    <v-icon color="white">mdi-logout-variant</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle class="white--text">Logout</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                </v-list>
        </v-container>
      </v-navigation-drawer>

      <v-dialog
        v-model="dialog"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card class="pa-10">
          <div class="text-subheader mb-2">Election Title</div>
             <v-divider></v-divider>
             <v-card-text class="mt-10">
               <label for="title-input">Title</label>
               <v-text-field
                 name="name"
                 id="title-input"
                 color="green"
                 outlined
                 dense
                  v-model="title"
               ></v-text-field>
             </v-card-text>
             <v-card-actions>
               <v-btn :loading="loading" @click="saveElectionTItle" class="text-capitalize" min-width="118px"  style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);" tile large dark color="#04A967">Save</v-btn>
               <v-btn large color="error" min-width="118px"  class="text-capitalize" @click="dialog =  !dialog" text >Cancel</v-btn>
             </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useRouter, ref } from "@nuxtjs/composition-api";

export default defineComponent ({
  props: ['navs'],
  data: () => ({
    drawer: true,
    
  }),
  setup(){
    
    // Utility
    const router = useRouter()
    const { store, $axios } = useContext()

    //  Data
    const loading = ref<boolean>(false)
    const dialog = ref<boolean>(false)
    const title =  ref<string>('')
  //  Methods
    const signout = async () => {
         await store.dispatch('removeUserSession')
        router.push('/welcome')
    }

    const saveElectionTItle = async () => {
          try {
             loading.value = true
             await $axios.$post('/admin/electiontitle', { electionDate: title.value } )
             loading.value = false
             title.value = '',
             dialog.value = false
          } catch (error: any) {
            loading.value = false
             title.value = '',
             dialog.value = false
          }
    }

     return {
       signout,
       loading,
       dialog,
       title,
       saveElectionTItle
     }
  }
})
</script>

<style>

</style>