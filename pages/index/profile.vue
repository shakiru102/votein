<template>
    <div>
     <head-content > Profile </head-content>
     <v-card class="pa-10 mx-16" flat tile color="#F9FDFA"> 
         <v-avatar
         size="100px"
         >
             <v-img :src="require('@/assets/white.png')" alt="avatar"></v-img>
         </v-avatar>
          <v-container>
                 <v-layout row wrap >
                     <v-flex xs6 v-for="(item, index) in labelTitle" :key="index">
                         <label>{{ item }}</label>
                         <div class="cardFields">{{ nameField(item) }}</div>
                     </v-flex>
                 </v-layout>
             </v-container>
             <v-card-actions>
             <v-btn width="198px" height="45px" x-large dark tile style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);" class="text-capitalize" color="#04A967">Edit Profile</v-btn>
             </v-card-actions>
     </v-card>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, useContext } from "@nuxtjs/composition-api";


export default defineComponent ({
    
    setup(){
       
       const labelTitle =  ref<string[]>(['First Name', 'Mobile No', 'Last Name', 'Voter Id', 'Email'])
       const { store } = useContext()

       const nameField = (params: string) => {
           switch (params) {
               case labelTitle.value[0]:
                   return `${ store.state.user.firstname }`
                case labelTitle.value[1] : 
                   return `${ store.state.user.phonenumber }`
                case labelTitle.value[2] :
                    return `${ store.state.user.lastname }` 
                 case labelTitle.value[3] :
                     return `${ store.state.user.voterID }`       
               default:
                   return `${ store.state.user.email }`;
           }

       }

        return {
         labelTitle,
         nameField
        }
    }

})
</script>
<style scoped>
.cardFields{
width: 402px;
height: 47px;
background: #FFFFFF;
box-shadow: 0px 14px 50px rgba(137, 176, 160, 0.1);
font-size: 17px;
line-height: 17px;
letter-spacing: 0.01em;
color: #039058;
display: flex;
align-items: center;
padding-left: 1em;
margin-bottom: 1.5em;
}
</style>