<template>
    <v-footer class="footer">
    <v-col class="text" cols="12">
      {{ new Date().getFullYear() }} — <strong>Kochbuch</strong>
    </v-col>
  </v-footer>
</template>

<style lang="scss" scoped>
.footer{
    background: white;
    position: sticky;
    bottom: 0; 
    width: 100%;   
    & .text{
        font-size: 1rem;
        text-align: center;
    }
}
.theme--light.v-footer{
    background-color: white;
}
</style>