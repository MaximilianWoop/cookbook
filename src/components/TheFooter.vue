<template>
    <v-footer class="footer" data-app>
    <v-col class="text" cols="12">
      {{ new Date().getFullYear() }} — <strong>Kochbuch</strong>
    </v-col>
  </v-footer>
</template>

<style lang="scss" scoped>
.footer{
    background: rgba(2, 76, 140, 1) !important;
    position: sticky;
    color: white !important;
    bottom: 10; 
    width: 100%; 
    & .text{
        font-size: 1rem;
        text-align: center;
    }
}
</style>