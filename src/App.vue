<template>
  <div>
    <div class="flex flex-col m-16 px-16 border-4 border-[#645e7d7d] rounded-full gap-3 bg-[#504872]">
      <div class="flex flex-col-2 gap-2">
        <div class="w-20 mt-8">
          <img src="./img/logo.png">
        </div>
        <div class="flex flex-col-2">
          <h1 class="text-white text-9xl ml-10">
            KIBU
          </h1>
          <p class="text-xl mt-7 ml-4 font-bold text-[#fcfcfcd3]">
            games
          </p>
        </div>
      </div> 
    </div>
    
    <!-- no tocar router-view -->
    <router-view/>
  </div>
</template>

<script>

</script>