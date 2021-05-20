<template>
  <div>    
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
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


