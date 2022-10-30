<template>
  <cardlayout>
      <v-container class="pa-16">
          <div class="text-center">
            <img :src="require('@/assets/Group 9.png')" alt="">
          </div>
          <div class="logintext mt-5">
              <div class="title" style="color: #039058;">Login</div>
              <div class="text" style="color: #85A598;">Login if you already created an account</div>
          </div>
          <div class="inputcontainer mt-14">
              <v-text-field
                placeholder="Email"
                outlined
                color="green"
                v-model="email"
                dense
                background-color="F8FCFA"
              ></v-text-field>
               <v-text-field
                placeholder="Password"
                v-model="password"
                outlined
                color="green"
                type="password"
                dense
                background-color="F8FCFA"
              ></v-text-field>
              <div class="d-flex">
                <v-simple-checkbox v-model="check" value="check"  color="#04A967"></v-simple-checkbox>
                <span style="color: #85A598;">Remember me</span>
              </div>
          </div>
          <v-btn 
          dark
          block 
          :loading="loading"
          color="#04A967" 
          class="text-capitalize mt-16"
          style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);"
          @click="signinUser"
          
          >Login </v-btn>
      </v-container>
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
  </cardlayout>
</template>

<script lang="ts"> 
import { defineComponent } from '@nuxtjs/composition-api'
import Login from '~/composables/adminLogin'
export default  defineComponent({
  data: () => ({
      check: false 
  }),


  middleware: 'isAdminLoggedIn', 
  setup(){
    const { 
       email,
       password,
       signinUser,
       snackbar,
       errortext,
       loading,
    } = Login()

    // loggedIn()

    return {
       email,
       password,
       signinUser,
       snackbar,
       errortext,
       loading,
    }
  }
})
</script>

<style>

</style>