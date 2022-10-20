<template>
    <!-- START: CONTENEDOR PARA TODAS LAS COSAS EN HOME -->
    <div class="flex flex-row">
        
        <!-- Start: Columna Izquierda para buscador -->
        <div id="search column" class="w-1/3 p-16 m-16 border-4 border-purple rounded-xl dark-purple">

            <div>
                <img src="../img/logosteam.png" class=" w-28">
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
                
                <label for="Max Price">Steam Rating</label>
                <input @change="findDeals()" v-model="params.steamRating" type="text" class="border border-gray-300 rounded-lg w-8" />
                <input @change="findDeals()" v-model="params.steamRating" type="range" class="p-2 appearance-none bg-[#f0924fe5] h-2 rounded-full" />
                
                <div>
                    <label for="AAA game">On-sale games only</label>
                    <input @change="findDeals()" v-model="params.onSale" type="checkbox" name="On sale games" id="On sale">
                </div>

                <button @click="findDeals()" class="button bg-[#8a57d6] p-2 rounded-lg">Search</button>
            </form> 
            
        </div>
        <!-- End: Columna Izquierda para buscador -->

        <!-- START: Columna Derecha para resultados -->
        <div id="result column" class="flex flex-col p-16 m-16 border-4 border-purple rounded-xl dark-purple gap-2">
            
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

            
            <div v-if="data" class="flex flex-col gap-5">
                
                <!-- START individual result block -->
                <div v-for="result in data" class="flex rounded-xl bg-[#fefdffb0] p-4 shadow-2xl gap-4">
                    
                    <!-- START: thumbnail del juego -->
                    <a target="_blank" :href="`https://store.steampowered.com/app/${result.steamAppID}/${result.title}/`">
                        <img :src="`${biggerThumbnail(result.thumb)}`" :alt="`${result.title}`" class="rounded-3xl h-[5rem]" />
                    </a>
                    <!-- END: thumbnail juego -->
                    
                    <div class="">
                        <a target="_blank" :href="`https://store.steampowered.com/app/${result.steamAppID}/${result.title}/`"><h6 class="font-semibold">{{result.title}}</h6></a>
                        
                        <p v-if="result.metacriticLink"><a :href="`https://www.metacritic.com/${result.metacriticLink}`" target="_blank">Metacritic Score: </a> {{result.metacriticScore}}</p>
                        
                        <p class="mt-2 text-md text-red-500 font-semibold">
                            ${{result.salePrice}} 
                            <span class="text-green-500 text-xs">-{{Math.round(result.savings)}}%</span>
                        </p>
                        <p class="mt-2 text-sm text-gray-500 line-through">${{result.normalPrice}}</p>
                        <p>Deal Rating: {{result.dealRating}}</p>
                    </div>

                    <!-- START: steam rating -->
                    <div class="">
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
                onSale: false,
                sortBy: "Savings",
                steamRating: 60,
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
    },
    computed: {
        // construye el URL con los parametros para hacer la llamada
        getUrl() {
            let url = `https://www.cheapshark.com/api/1.0/deals?storeID=1&desc=0`
            for (let [paramName, paramValue] of Object.entries(this.params)) {
                url += paramValue ? `&${paramName}=${paramValue}` : ""
            }
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