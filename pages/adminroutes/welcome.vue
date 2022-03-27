<template>
  <cardlayout>
    <v-container class="pa-16">
    <div class="text-center">
        <img :src="require('@/assets/Group 9.png')" alt="">
      </div>
      <div class="text-center">
        <div class="display-1" style="color: #039058;">Welcome to Vote-In</div>
        <div class="" style="color: #85A598;">Login or create an account to get started.</div>
        <v-btn 
        block 
        color="#04A967" 
        class="text-capitalize mt-16" 
        dark 
        to="/adminroutes/login"
        tile 
        style="box-shadow: 0px 14px 50px rgba(13, 117, 76, 0.22)">Login</v-btn>
      </div>
    </v-container>
  </cardlayout>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Cardlayout from '~/components/Cardlayout.vue'
export default defineComponent({
  components: { 
    Cardlayout, 
  },
  name: 'onBoardPage',
})
</script>

<style scoped>

</style>
