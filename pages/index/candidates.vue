<template>
    <div>
     <head-content > Candidates </head-content>
     <datatable :deleteData="deleteData" :headers="headersUser" :items="items" :editData="editData" />
     <!-- Dialog for Adding new position -->
      <v-dialog
          v-model="dialog"
          persistent
          max-width="560px"
          transition="dialog-transition"

        >
          <v-card class="px-10 pb-10 pt-5">
               <div class="text-subheader mb-2">Add New Candidate</div>
             <v-divider></v-divider>
             <v-container class="mt-10">
               <v-row>
                 <v-col cols="9">
                   <label class="caption"  for="First" >First name</label>
                   <v-text-field id="First" outlined dense  color="#92B1A5"  ></v-text-field>
                   <label class="caption"  for="Last" >Last name</label>
                   <v-text-field id="Last" outlined dense  color="#92B1A5"  ></v-text-field>
                   <label class="caption"  for="Position">Position</label>
                   <v-select
                       id="Position"
                       :items="positions"
                       v-model="position"
                       outlined
                       color="#92B1A5"
                       dense
                       append-icon="mdi-chevron-down"
                   ></v-select>
                   <label class="caption"  for="Platform" >Platform/Party</label>
                   <v-text-field id="Platform" outlined dense  color="#92B1A5"  ></v-text-field>
                 </v-col>
               </v-row>
             </v-container>
             <v-card-actions>
               <v-btn class="text-capitalize"  style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);" tile min-width="118px"  large dark color="#04A967">Save</v-btn>
               <v-btn min-width="118px"  large color="error" class="text-capitalize" @click="dialog = !dialog"  text>Cancel</v-btn>
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
          <v-card class="px-10 pb-10 pt-5">
               <div class="text-subheader mb-2">Edit Candidate</div>
             <v-divider></v-divider>
             <v-container class="mt-10">
               <v-row>
                 <v-col cols="9">
                   <label class="text-caption"  for="First" >First name</label>
                   <v-text-field id="First" outlined dense  color="#92B1A5"  ></v-text-field>
                   <label class="text-caption"  for="Last" >Last name</label>
                   <v-text-field id="Last" outlined dense  color="#92B1A5"  ></v-text-field>
                   <label class="text-caption"  for="Position">Position</label>
                   <v-select
                       id="Position"
                       :items="positions"
                       v-model="position"
                       outlined
                       color="#92B1A5"
                       dense
                       append-icon="mdi-chevron-down"
                       
                   ></v-select>
                   <label class="text-caption"  for="Platform" >Platform/Party</label>
                   <v-text-field id="Platform" outlined dense  color="#92B1A5"  ></v-text-field>
                 </v-col>
               </v-row>
             </v-container>
             <v-card-actions>
               <v-btn class="text-capitalize" min-width="118px"  style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);" tile large dark color="#04A967">Update</v-btn>
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
          <v-card class="px-10 pb-10 pt-5">
                <div class="text-subheader mb-2">Delete Candidate</div>
             <v-divider></v-divider>
             <v-card-text class="text-center mt-16">
               <div class="text-subheader mb-3">Delete Candidate?</div>
               <div class="text-h4">{{ `${ lastname } ${ firstname }` }}</div>
             </v-card-text>
             <v-card-actions >
               <v-spacer></v-spacer>
               <v-btn min-width="118px"  class="text-capitalize" color="error" dark large tile style="box-shadow: 0px 14px 50px rgba(221, 75, 57, 0.15);">Delete</v-btn>
               <v-btn min-width="118px"  class="text-capitalize" @click="deleteDialog = !deleteDialog"  color="error" text large tile>Cancel</v-btn>
               <v-spacer></v-spacer>
             </v-card-actions>
          </v-card>
        </v-dialog>
    </div>
</template>
<script lang="ts">

import { defineComponent } from '@nuxtjs/composition-api'
// import Datatable from '~/components/Datatable.vue'
// import HeadContent from '~/components/HeadContent.vue'
import Candidate from '~/composables/candidate'
export default defineComponent({
    // components: { HeadContent, Datatable},
    setup(){
       const {
        data,
        headersUser,
        items,
        dialog,
        editDialog,
        deleteDialog,
        positions,
        position,
        firstname,
        lastname,
        party,
        addNew,
        editData,
        cancelEditData,
        deleteData,
        cancelNewData
       } = Candidate()
      return {
        data,
        headersUser,
        items,
        dialog,
        editDialog,
        deleteDialog,
        positions,
        position,
        firstname,
        lastname,
        party,
        addNew,
        editData,
        cancelEditData,
        deleteData,
        cancelNewData
      }
    }
})
</script>