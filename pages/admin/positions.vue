<template>
    <div>
     <head-content  > Positions </head-content>
      <datatable :tabLoading="tabLoading" :deleteData="deleteData"  :headers="headers" :items="items" :editData="editData" >
        <v-btn 
        v-if="$store.state.user.super"
            @click="addNew"
            color="#04A967"
            dark 
            x-large 
            tile
            class="text-capitalize mt-10 mb-5" 
            style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);"
            >
            Add New
            </v-btn>
      </datatable>
      <!-- Dialog for Adding new position -->
      <v-dialog
          v-model="dialog"
          persistent
          max-width="560px"
          transition="dialog-transition"

        >
          <v-card class="px-10 pb-10 pt-5">
               <div class="text-subheader mb-2">Add New Position</div>
             <v-divider></v-divider>
             <v-container class="mt-10">
               <v-row>
                 <v-col cols="9">
                   <label class="caption"  for="desc" >Description</label>
                   <v-text-field id="desc" v-model="description" outlined dense  color="#92B1A5"  ></v-text-field>
                   <label class="caption"  for="max" >Maximum Votes</label>
                   <v-text-field id="max" v-model="maxVote"  outlined dense  color="#92B1A5"  ></v-text-field>
                 </v-col>
               </v-row>
             </v-container>
             <v-card-actions>
               <v-btn class="text-capitalize" @click="savePosition"  style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);" tile min-width="118px" :loading="loading"   large dark color="#04A967">Save</v-btn>
               <v-btn min-width="118px"  large color="error" class="text-capitalize" @click="cancelNewData"  text>Cancel</v-btn>
             </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Dialog for Updating position -->
        <v-dialog
          v-model="editDialog"
          persistent
          max-width="560px"
          transition="dialog-transition"

        >
          <v-card class="px-10 pb-10 pt-5" v-if="editDataDetail !== null">
               <div class="text-subheader mb-2">Edit Position</div>
             <v-divider></v-divider>
             <v-container class="mt-10">
               <v-row>  
                 <v-col cols="9">
                   <label class="caption"  for="desc" >Description</label>
                   <v-text-field id="desc" outlined dense v-model="editDataDetail.position" color="#92B1A5"  ></v-text-field>
                   <label class="caption"  for="max" >Maximum Votes</label>
                   <v-text-field id="max" outlined dense v-model="editDataDetail.maxVote" color="#92B1A5"  ></v-text-field>
                 </v-col>
               </v-row>
             </v-container>
             <v-card-actions>
               <v-btn class="text-capitalize" @click="updateDetails" :loading="loading"  min-width="118px"  style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);" tile large dark color="#04A967">Update</v-btn>
               <v-btn large color="error" min-width="118px"  class="text-capitalize" @click="cancelEditData" text >Cancel</v-btn>
             </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Dialog for deleting position -->
        <v-dialog
          v-model="deleteDialog"
          persistent 
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card v-if="editDataDetail !== null" class="px-10 pb-10 pt-5">
                <div class="text-subheader mb-2">Delete Position</div>
             <v-divider></v-divider>
             <v-card-text class="text-center mt-16">
               <div class="text-subheader mb-3">Delete Position?</div>
               <div class="text-h4">{{ editDataDetail.position }}</div>
             </v-card-text>
             <v-card-actions >
               <v-spacer></v-spacer>
               <v-btn min-width="118px" @click="confirmDeleteData " :loading="loading" class="text-capitalize" color="error" dark large tile style="box-shadow: 0px 14px 50px rgba(221, 75, 57, 0.15);">Delete</v-btn>
               <v-btn min-width="118px"  class="text-capitalize" @click="deleteDialog = !deleteDialog"  color="error" text large tile>Cancel</v-btn>
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
      <div :class=" !resType ? 'caption black--text text-center': 'caption text-center' ">
        {{ resMessage }}
      </div>
      </v-snackbar>
    </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
//@ts-ignore
import Datatable from '~/components/Datatable.vue'
import HeadContent from '~/components/HeadContent.vue'
import Positions from '~/composables/positions'
export default defineComponent({
    components: { HeadContent, Datatable },
    setup(){
      
      const { 
      deleteData,
      dialog, 
      addNew, 
      data, 
      headers, 
      items, 
      description, 
      maxVote, 
      editData, 
      cancelEditData, 
      editDialog, 
      deleteDialog,
      cancelNewData,
      loading,
      snackbar,
      savePosition,
      resMessage,
      resType,
      tabLoading,
      editDataDetail,
      updateDetails,
      confirmDeleteData  
       } = Positions()

      return { 
      cancelNewData,
      deleteData,
      dialog, 
      addNew, 
      data, 
      headers, 
      items, 
      description, 
      maxVote, 
      editData, 
      cancelEditData, 
      editDialog, 
      deleteDialog,
      loading,
      snackbar,
      savePosition,
      resMessage,
      resType,
      tabLoading,
      editDataDetail,
      updateDetails,
      confirmDeleteData  
      }
    }
    

})
</script>