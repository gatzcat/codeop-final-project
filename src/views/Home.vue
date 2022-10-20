<template>
    <!-- START: CONTENEDOR PARA TODAS LAS COSAS EN HOME -->
    <div class="flex flex-row justify-center">
        
        <!-- Start: Columna Izquierda para buscador -->
        <div id="search column" class="w-1/3 p-16 m-16 border-4 border-purple rounded-xl dark-purple">

            <div class="flex justify-center mb-16">
                <img src="../img/logosteam.png" class=" w-1/2 ">
            </div>

            <form @submit.prevent class="flex flex-col gap-3">
                <label for="Game title" class="hidden">Game title</label>
                <input v-model="params.title" type="text" class="form-control rounded-full p-2 text-gray-200" placeholder="Game Title" />
                
                <!-- TODO: combinar min y max price? -->
                <label for="Min Price">Min Price</label>
                <input @change="findDeals()" v-model="params.lowerPrice" type="text" class="border border-gray-300 rounded-lg w-8" />
                <input @change="findDeals()" v-model="params.lowerPrice" type="range" class="p-2 appearance-none bg-[#f0924fe5] h-2 rounded-full" />
            
                <label for="Max Price">Max Price</label>
                <input @change="findDeals()" v-model="params.upperPrice" type="text" class="border border-gray-300 rounded-lg w-8" />
                <input @change="findDeals()" v-model="params.upperPrice" type="range" class="p-2 appearance-none bg-[#f0924fe5] h-2 rounded-full" />
                
                <label for="Max Price">Min Steam Rating</label>
                <input @change="findDeals()" v-model="params.steamRating" type="text" class="border border-gray-300 rounded-lg w-8" />
                <input @change="findDeals()" v-model="params.steamRating" type="range" class="p-2 appearance-none bg-[#f0924fe5] h-2 rounded-full" />
                
                <div class="flex gap-2">
                    <label for="On sale">On-sale only</label>
                    <input @change="findDeals()" v-model="params.onSale" type="checkbox" name="On sale games" id="On sale" class="w-4">
                </div>

                <button @click="findDeals()" class="button bg-[#8a57d6] p-2 rounded-lg">Search</button>
            </form> 
            
        </div>
        <!-- End: Columna Izquierda para buscador -->

        <!-- START: Columna Derecha para resultados -->
        <div id="result column" class="flex flex-col w-2/3 p-16 m-16 border-4 border-purple rounded-xl dark-purple gap-2">
            
            
            <div class="flex justify-between items-center">
                <!-- START Sortby dropdown-->
                <div class="flex gap-3 items-center">
                    <label for="sort" class="text-xl">Sort by:</label>
                    <select v-model="params.sortBy" @change="findDeals()" id="sort" name="sort" class="rounded-full py-1 px-2 bg-[#645e7d00] text-gray-300 text-center text-xl border border-gray-300 mb-4">
                        <option value="Price" class="dark-purple">Price</option>
                        <option value="Deal+Rating" class="dark-purple">Deal Rating</option>
                        <option value="Title" class="dark-purple">Title</option>
                        <option value="Savings" class="dark-purple">Savings</option>
                        <option value="Metacritic" class="dark-purple">Metacritic Score</option>
                        <option value="Release" class="dark-purple">Release Date</option>
                    </select>
                </div>
                <!-- END Sortby dropdown-->

                <!-- START: Page buttons -->
                <div class="flex gap-2 items-center">
                    <button @click="params.pageNumber -=1; findDeals()" v-if="params.pageNumber !== 0" class="button button-sm button-secondary h-[2rem]">Previous Page</button>
                    <span class="text-gray-300">Page {{params.pageNumber}}</span>
                    <button @click="params.pageNumber +=1; findDeals()" v-if="params.pageNumber < numOfPage" class="button button-sm button-secondary h-[2rem]">Next Page</button>
                </div>
                <!-- END: Page buttons -->
            </div>
                    

            
            <div v-if="data" class="flex flex-col gap-5">
                
                <!-- START individual result block -->
                <div v-for="result in data" class="grid grid-cols-3 items-center rounded-xl bg-[#fefdffb0] p-4 shadow-2xl gap-4">
                    
                    <!-- START: thumbnail del juego -->
                    <a target="_blank" :href="`https://store.steampowered.com/app/${result.steamAppID}/${result.title}/`">
                        <img :src="`${biggerThumbnail(result.thumb)}`" :alt="`${result.title}`" class="rounded-3xl max-h-[8rem] " />
                    </a>
                    <!-- END: thumbnail juego -->
                    
                    <div class="">
                        <a target="_blank" :href="`https://store.steampowered.com/app/${result.steamAppID}/${result.title}/`"><h6 class="font-semibold">{{result.title}}</h6></a>
                        
                        <p v-if="result.metacriticLink"><a :href="`https://www.metacritic.com/${result.metacriticLink}`" target="_blank">Metacritic Score: </a> {{result.metacriticScore}}</p>
                        
                        <div class="flex gap-2 text-lg">
                            <span class="mt-2 text-red-500 font-semibold">${{result.salePrice}} </span> 
                            <span class="mt-2 text-gray-600 line-through"> ${{result.normalPrice}}</span>
                            <span class="mt-2 text-green-500 font-semibold">Save {{Math.round(result.savings)}}%</span>
                        </div>
                        
                        <p>Deal Rating: {{result.dealRating}}</p>
                    </div>

                    <!-- START: steam rating -->
                    <div class="justify-self-start">
                        <p>{{result.steamRatingText}} </p>
                        <p>{{result.steamRatingPercent}}%</p>
                    </div>
                    <!-- END: steam rating -->
                </div>
                <!-- END individual result block -->

            </div>
            
        </div>
        <!-- END: Columna Derecha para resultados -->

    </div>
    <!-- END: CONTENEDOR PARA TODAS LAS COSAS EN HOME -->

</template>
<script>
export default {
    name: "home",
    data() {
        return {
            loading: false,
            data: null,
            numOfPage: null,
            params: {
                title: null,
                upperPrice: 20,
                lowerPrice: 0,
                onSale: 0,
                sortBy: "Metacritic",
                steamRating: 60,
                pageNumber: 0,
            }
        }
    },
    methods: {
        // hace llamada al API
        async findDeals() {
            try 
            {
                this.loading = true
                const response = await fetch(this.getUrl)
                // response = await fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=${this.upperPrice}&lowerPrice=${this.lowerPrice}&onSale=${this.onSale}&title=${this.title}`)
                const responseJson = await response.json()
                this.data = responseJson
                this.numOfPage = response.headers.get("x-total-page-count");
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false
            }
        },

        biggerThumbnail(url){
            let newUrl = url.replace("capsule_sm_120", "header")
            return newUrl
        },

        processParams() {
            let newValue = this.params.onSale? 1 : 0
            this.params.onSale = newValue 
        },
    },
    computed: {
        // construye el URL con los parametros para hacer la llamada
        getUrl() {
            this.processParams()
            let url = `https://www.cheapshark.com/api/1.0/deals?storeID=1&desc=0&pageSize=10`
            for (let [paramName, paramValue] of Object.entries(this.params)) {
                url += paramValue ? `&${paramName}=${paramValue}` : ""
            }
            console.log(url);
            return url
        },

    },

    mounted() {
        this.findDeals()
    },

}
</script>

<style>

</style>