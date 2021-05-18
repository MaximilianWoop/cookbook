<template>
  <div>    
    <Home/>
  </div>
</template>

<script>
import Home from './Views/Home.vue';

export default {
  components:{
    Home,
  }
}
</script>


<style lang="scss">
    *,
    *::before,
    *::after{
        box-sizing: border-box;
    }

    html, body{
      padding: 0;
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
    }

    .v-responsive__sizer{
      flex: 0 !important;
    }
</style>


