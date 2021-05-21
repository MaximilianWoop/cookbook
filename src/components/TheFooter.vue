<template>
  <div>
    <div class="push"></div>
    <v-footer class="footer" id="footer" data-app>
      <v-col class="text" cols="12">
        {{ new Date().getFullYear() }} — <strong>Kochbuch</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<style lang="scss" scoped>
.footer{
    background: rgba(2, 76, 140, 1) !important;
    height: 50px;
    color: white !important;
    width: 100%; 
    & .text{
        font-size: 1rem;
        text-align: center;
    }
}
</style>

