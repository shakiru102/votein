<template>
    <div>
      <cardlayout>
        <v-container class="pb-16 px-16 pt-5">
            <v-btn 
        @click="$router.go(-1)"
        x-small
        width="35px"
        height="35px" 
        style=" position: absolute; top: 3em; border-radius: 10px; box-shadow: 5px 10px 20px rgba(211, 209, 216, 0.3);backdrop-filter: blur(5px);" 
        color="#CEF9E8">
          <v-icon color="#039058">mdi-arrow-left</v-icon>
        </v-btn>
          <div class="text-center">
            <img :src="require('@/assets/Group 9.png')">
          </div>
           <div class="logintext mt-5 mb-10">
              <div class="title" style="color: #039058;">Register</div>
              <div class="text" style="color: #85A598;">Provide the details requested below</div>
          </div>
            <v-text-field
                placeholder="First Name"
                outlined
                v-model="firstname"
                color="green"
                dense
                background-color="F8FCFA"
              ></v-text-field>
               <v-text-field
                placeholder="Last Name"
                outlined
                v-model="lastname"
                color="green"
                dense
                background-color="F8FCFA"
              ></v-text-field>
              <v-text-field
                placeholder="VoterID"
                outlined
                color="green"
                v-model="voterID"
                dense
                background-color="F8FCFA"
              ></v-text-field>
               <v-text-field
                placeholder="Mobile Number"
                outlined
                color="green"
                v-model="phonenumber"
                dense
                background-color="F8FCFA"
              ></v-text-field>
              <v-text-field
                placeholder="Email"
                v-model="email"
                outlined
                color="green"
                dense
                background-color="F8FCFA"
              ></v-text-field>
               <v-text-field
                placeholder="Password"
                outlined
                v-model="password"
                type="password"
                color="green"
                dense
                background-color="F8FCFA"
              ></v-text-field>
              <div style="color: #85A598;" class="text-center my-3" >click <nuxt-link style="color: #039058; text-decoration-line: none;" to="/login">here</nuxt-link> to login</div>
              <v-btn dark block @click="openDialog" tile class="text-capitalize " color="#04A967" style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);">Register</v-btn>
        </v-container>
    </cardlayout>
    <v-dialog
        v-model="dialog"
        max-width="500px"
        transition="dialog-transition"
        persistent
    >
        <v-card class="pa-16 text-center">
          <div class="text-right">
             <v-btn 
        @click="closeDialog"
        x-small
        width="35px"
        height="35px" 
        elevation="0"
        style=" position: absolute; top: 3em; border-radius: 10px; backdrop-filter: blur(5px);" 
        color="#CEF9E8">
          <v-icon color="#039058">mdi-close</v-icon>
        </v-btn>
          </div>
          <div class="text-center display-1" style="color: #039058;">Enroll Fingerprint</div>
          <div class="" style="color: #85A598; font-size: 18px;">Please place your fingerprint on the scanner.</div>
          <img class="my-10" src="@/assets/fingerprint scanner.png" alt="">
          <div class="text-center">
            <div :style=" !registered ? 'font-size: 30px; color: #85A598;' : 'font-size: 30px; color: #039058;'" class="percent">{{ !registered ? '0%' : '100%' }}</div>
            <div style="font-size: 20px; color: #85A598;" class="scan">{{ !registered ?' Scan' : 'Scan completed!'}}</div>
          </div>
          <v-card-actions>
            <v-btn v-if="registered" @click="registerUser" :loading="loading" block color="#039058" text large>Login</v-btn>
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
    </div>
</template>


<script lang="ts" >
import { defineComponent } from '@vue/composition-api'
import Signup from '~/composables/signup'
export default defineComponent({
   
  mounted() {
    this.initIO(this)
  },
 
    setup() {
        const {
    initIO,
    firstname,
    lastname,
    voterID,
    password,
    phonenumber,
    email,
    dialog,
    registerUser,
    snackbar,
    errortext,
    loading,
    registered,
    closeDialog,
    openDialog
        } = Signup()


        return {
     initIO,     
     registerUser,     
    firstname,
    lastname,
    voterID,
    password,
    phonenumber,
    email,
    dialog,
    snackbar,
    errortext,
    loading,
    registered,
    closeDialog,
    openDialog
        }
    },
})
</script>
<style scoped>
.login_link{
  color: #039058;
  text-decoration-line: none;
}
</style>
