<template>
  <div>

    <!-- START: top horizontal row (see './components/Navbar.vue')-->
    <navbar />
    <!-- END: top horizontal row -->
    
    <!-- no tocar router-view, es todo lo demás-->
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

  export default {
      components: { Navbar },
  }
</script>