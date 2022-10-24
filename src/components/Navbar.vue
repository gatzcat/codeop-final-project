<template>
    
    <div class="flex flex-col mx-0 lg:mx-8 md:px-10 md:border-4 dark-purple rounded-full border-purple">
      
      <div class="flex flex-col-3 gap-0 md:gap-2">
        
        <div class="w-8 mt-3 ml-3 md:w-16 md:mt-6 md:ml-0 lg:w-20 lg:mt-8 cursor-pointer">
          <img src="../img/logovolume.png">
        </div>

        <div class="flex flex-col-2 w-2/4 md:w-3/4">

          <!-- START original name text -->
          <h1 class="text-white text-5xl ml-4 md:text-8xl md:ml-6 lg:text-9xl lg:ml-10">
            KIBU
          </h1>
          <p class="font-bold text-[#fcfcfcd3] text-xs mt-2 ml-1 md:text-lg md:mt-4 md:ml-2 lg:text-xl lg:mt-7 lg:ml-4 ">
            games
          </p>
          <!-- START original name text -->
        </div>
         
        <div class="flex items-center opacity-75">
            <!-- <CurrencySelector />     -->
            <img src="../img/bookmark-solid.png" class="h-4 m-3 md:h-6 md:m-4 lg:h-9 cursor-pointer">
            <img src="../img/bell-solid.png" class="h-4 m-3 md:h-6 md:m-4 lg:h-9 cursor-pointer">
            <img src="../img/user-solid.png" class="h-4 m-3 md:h-6 md:m-4 lg:h-9 cursor-pointer">
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