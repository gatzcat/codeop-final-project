<template>
  <div>
    <div class="flex flex-col mt-32 mx-32 px-16 border-8 border-[#645e7d4b] rounded-full gap-3 bg-[#504872]">
      <div class="flex flex-col-3 gap-2">
        <div class="w-20 mt-8 cursor-pointer">
          <img src="./img/logo.png">
        </div>
        <div class="flex flex-col-2 w-3/4">
          <h1 class="text-white text-9xl ml-10">
            KIBU
          </h1>
          <p class="text-xl mt-7 ml-4 font-bold text-[#fcfcfcd3]">
            games
          </p>
        </div>
        <div class="flex items-center opacity-75">
        <img src="./img/bookmark-solid.png" class="h-9 m-4 cursor-pointer">
        <img src="./img/bell-solid.png" class="h-9 m-4 cursor-pointer">
        <img src="./img/user-solid.png" class="h-9 m-4 cursor-pointer">
        </div>
    </div> 
    </div>
    
    <!-- no tocar router-view -->
    <router-view/>
  </div>
</template>

<script>

</script>