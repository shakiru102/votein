<template>
   <cardlayout>
          <v-container class="pa-16">
    <div class="text-center">
        <img :src="require('@/assets/Group 9.png')" alt="">
      </div>
      <div class="text-center">
        <div class="display-1" style="color: #039058;">Welcome to Vote-In</div>
        <div class="" style="color: #85A598;">Login or create an account to get started.</div>
        <v-btn tile to="/signup" block outlined class="mt-16 text-capitalize" color="#04A967">Register</v-btn>
       <v-btn to="/login" tile block dark class=" mt-5 text-capitalize" style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22);" color="#04A967">Login</v-btn>
      </div>
    </v-container>
   </cardlayout>
</template>



