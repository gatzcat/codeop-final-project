<template>
    
    <div class="flex flex-col mt-8 mx-8 px-10 border-4 dark-purple rounded-full gap-3 border-purple">
      
      <div class="flex flex-col-3 gap-2">
        
        <div class="w-20 mt-8 cursor-pointer">
          <img src="../img/logovolume.png">
        </div>

        <div class="flex flex-col-2 w-3/4">

          <!-- START: test name text, mira a ver si te gusta, si no, quitalo" -->
          <!-- <div id="test text logo group" class="flex flex-col relative w-1/5 items-center">
            <h1 class="text-white text-9xl ">
              KIBU
            </h1>
            <h1 class="text-3xl font-bold text-[#fcfcfcd3] absolute bottom-1">
              games
            </h1>
          </div> -->
          <!-- END: test name text, mira a ver si te gusta, si no, quitalo" -->

          <!-- START original name text -->
          <h1 class="text-white text-9xl ml-10">
            KIBU
          </h1>
          <p class="text-xl mt-7 ml-4 font-bold text-[#fcfcfcd3]">
            games
          </p>
          <!-- START original name text -->
        </div>
        
        <div class="flex items-center opacity-75">
            <!-- <CurrencySelector />     -->
            <img src="../img/bookmark-solid.png" class="h-9 m-4 cursor-pointer">
            <img src="../img/bell-solid.png" class="h-9 m-4 cursor-pointer">
            <img src="../img/user-solid.png" class="h-9 m-4 cursor-pointer">
        </div>
    </div> 
    </div>
</template>
<script>
import CurrencySelector from './CurrencySelector.vue';
    export default {
        name: "Navbar",
        components: { CurrencySelector },
    }
</script>
<style>
    
</style>