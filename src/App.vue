<template>
  <div>    
    <router-link to="/"></router-link>   
    <div id="loadingCircle">
      <div style="position: relative;">
          <div style=" width: 100%;  height: 100%;  position: absolute;  top: 200px;  left: 50px;  z-index: 10;">
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
</style>
