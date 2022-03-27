<template>
  <v-card height="100vh" flat title > 
    <img  
    :src="require('@/assets/Ellipse 1.png')" 
    class="image_1"
    />
    <img  
    :src="require('@/assets/Ellipse 2.png')" 
    class="image_2"
    />
    <img  
    :src="require('@/assets/Ellipse 3.png')" 
    class="image_3"
    />
    <img  
    :src="require('@/assets/Ellipse 4.png')" 
    class="image_4"
    />
    <v-card 
    height="100%" 
    width="100%"
    class="d-flex justify-center align-center"
    color="transparent"
    > 
      <v-card min-height="445px" width="522px" tile class="card-shadow" >
      
              <slot />
          </v-card>
    </v-card>
  </v-card>
</template>



<style scoped>
.image_1{
  filter: blur(60px);
  position: absolute;
  top: 0;
  right: 0;
}
.image_2{
  filter: blur(60px);
  position: absolute;
  bottom: 0;
}
.image_3{
  filter: blur(60px);
  position: absolute;
  bottom: 0;
  right: 0;
}
.image_4{
  filter: blur(60px);
  position: absolute;
  top: 0;
}
.v-card.card-shadow{
  box-shadow: 0px 30px 70px rgba(137, 176, 160, 0.28);
}
</style>
