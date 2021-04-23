<template>
  <div>    
    <router-link to="/"></router-link>   
    <div id="loadingCircle">
      <div>
          <div class="loader-postion">
              <div class="loader"></div>
          </div>                                
      </div>
    </div> 
    <router-view/>
  </div>
</template>

<style>
  #loadingCircle{
      display: none;
  }
  .loader-postion{
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
  }
</style>
