<template>
    <div v-if="data" class="w-screen m-5 flex flex-wrap gap-5 justify-center items-center">
        <img v-for="item in data" :src="`${item.webImage.url}`" class="h-[15rem] ">
    </div>
</template>
<script>
export default {
    name: "home",
    data() {
        return {
            loading: false,
            data: null
        }
    },
    methods: {
        async callRijks() {
            try 
            {
                this.loading = true
                const response = await fetch("")
                const responseJson = await response.json()
                this.data = responseJson.artObjects
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false
            }
        },
    },
    mounted() {
        this.callRijks()
    },

}
</script>
<style lang="">
    
</style>