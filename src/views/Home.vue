<template>
    <!-- START: CONTENEDOR PARA TODAS LAS COSAS EN HOME -->
    <div class="flex flex-row justify-center">
        
        <!-- Start: Columna Izquierda para buscador -->
        <div id="search column" class="w-1/3 p-10 ml-10 border-4 h-2/3 border-purple rounded-[80px] dark-purple">

            <div class="flex justify-center mb-10">
                <img src="../img/logosteam.png" class=" w-1/3 ">
            </div>

            <form @submit.prevent class="flex flex-col gap-3">
                <label for="Game title" class="hidden">Game title</label>
                <input v-model="params.title" type="text" class="bg-gray-800 border border-gray-600 rounded-full p-2 text-gray-200" placeholder="Game Title" />
                
                <!-- TODO: combinar min y max price? -->
                <div class="flex justify-around">
                    <label for="Min Price">Min Price</label>
                    <label for="Max Price">Max Price</label>
                    <input v-model="params.maxPrice" type="text" class="border border-gray-300 rounded-lg w-8" />
                    <input v-model="params.maxPrice" type="range" class="p-2" />
                    
                    <label for="AAA game">On-sale games only</label>
                    <input v-model="params.onSale" type="checkbox" name="On sale games" id="On sale" class="checkbox absolute z-10 cursor-pointer opacity-0">
                </div>

                <div>
                    <input @change="findDeals()" v-model="params.lowerPrice" type="range" class="slider" />
                    <input @change="findDeals()" v-model="params.upperPrice" type="range" class="slider" />
                </div>
                
                <label for="Max Price">Min Steam Rating</label>
                <input @change="findDeals()" v-model="params.steamRating" type="text" class="w-16 px-2 border bg-gray-800 text-gray-200 border-gray-600 rounded-lg" />
                <input @change="findDeals()" v-model="params.steamRating" type="range" class="slider" />
                
                <div class="flex gap-2">
                    <label for="On sale">On-sale only</label>
                    <input @change="findDeals()" v-model="params.onSale" type="checkbox" :true-value="1" :false-value="0" name="On sale games" id="On sale" class="w-4">
                </div>

                <button @click="findDeals()" class="button dark-button p-2 m-2 mt-8 rounded-full text-white text-l">Search</button>
            </form> 
            
        </div>
        <!-- End: Columna Izquierda para buscador -->

        <!-- START: Columna Derecha para resultados -->
        <div id="result column" class="flex flex-col w-2/3 p-16 mr-10 border-4 border-purple rounded-[80px] dark-purple gap-2  overflow-y-auto align-middle">
            
            
            <div class="flex justify-between ">
                <!-- START Sortby dropdown-->
                <div class="flex gap-3 items-center">
                    <label for="sort" class="text-lg">Sort by:</label>
                    <select v-model="params.sortBy" @change="findDeals()" id="sort" name="sort" class="rounded-full py-1 px-2 dark-purple text-gray-300 text-center border border-gray-300 mb-4 ">
                        <option value="Price" class="options">Price</option>
                        <option value="Deal+Rating" class="options">Deal Rating</option>
                        <option value="Title" class="options">Title</option>
                        <option value="Savings" class="options">Savings</option>
                        <option value="Metacritic" class="options">Metacritic Score</option>
                        <option value="Release" class="options">Release Date</option>
                    </select>
                </div>
                <!-- END Sortby dropdown-->

                <!-- START: Page buttons (top) -->
                <div class="flex gap-2 justify-center items-center mt-2" v-if="data">
                    <button @click="params.pageNumber -=1; findDeals()" v-if="params.pageNumber !== 0" class="pagination-buttons"> &lt; </button>
                    
                    <span class="text-gray-300 mx-1">Page {{parseInt(params.pageNumber) +1}}</span>

                    <button @click="params.pageNumber +=1; findDeals()" v-if="params.pageNumber < numOfPage " class="pagination-buttons"> &gt; </button>
                </div>
                <!-- END: Page buttons (top) -->

            </div>

            <!-- START: loading spinner -->
            <div v-if="loading" class="fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <path fill="none" stroke="#dde3f5" stroke-width="8" stroke-dasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.8);transform-origin:50px 50px">
                <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625"></animate>
                </path>
                <!-- [ldio] generated by https://loading.io/ --></svg>
            </div>
            <!-- END: loading spinner -->

            <div v-if="data && !loading" class="flex flex-col gap-5 overflow-y-scroll px-6 py-2 fade-in max-h-[550px]">
                
                <!-- START individual result block -->
                <div v-for="result in data" class="grid grid-cols-[2fr,3fr,1.5fr] items-center rounded-3xl bg-[#fefdffb0] opacity-85 px-4 py-2 shadow-xl gap-4">
                    
                    <!-- START: thumbnail del juego -->
                    <div class="relative">
                        <a target="_blank" :href="`https://store.steampowered.com/app/${result.steamAppID}/${result.title}/`">
                            <img :src="`${biggerThumbnail(result.thumb)}`" :alt="`${result.title}`" class="drop-shadow-md rounded-3xl max-h-[8rem] grow" />
                        </a>
                        <span v-if="parseInt(result.savings) !== 0" class="absolute bottom-1 right-2 rounded-tl-xl rounded-3xl text-sm text-lime-500 pl-2 opacity-80 bg-gray-800 font-semibold">-{{Math.round(result.savings)}}%</span>
                    </div>
                    
                    <!-- END: thumbnail juego -->
                    
                    <div class="">
                        <a target="_blank" :href="`https://store.steampowered.com/app/${result.steamAppID}/${result.title}/`"><h6 class="font-semibold">{{result.title}}</h6></a>
                        
                        <p v-if="result.metacriticLink"><a :href="`https://www.metacritic.com/${result.metacriticLink}`" target="_blank">Metacritic Score: </a> {{result.metacriticScore}}</p>
                        
                        <div class="flex gap-2 text-lg">
                            <span class="text-red-500 font-semibold">${{result.salePrice}} </span> 
                            <span class="text-sm text-gray-600 line-through"> ${{result.normalPrice}}</span>
                        </div>
                        
                        <p v-if="parseInt(result.dealRating) !== 0" class="text-sm">Deal Rating: {{result.dealRating}}</p>
                    </div>

                    <!-- START: steam rating -->
                    <div class="justify-self-start">
                        
                        <p class="text-3xl">{{result.steamRatingPercent}}%</p>
                        <span class="rounded-2xl text-xs px-2 py-0.5 bg-stone-700 text-gray-100">{{result.steamRatingText}} </span>
                    </div>
                    <!-- END: steam rating -->
                </div>
                <!-- END individual result block -->

            </div>

            <!-- START: Page buttons (bottom) -->
            <div v-if="!loading" class="flex gap-2 justify-center mt-2  ">
                <button @click="params.pageNumber = 0; findDeals()" v-if="params.pageNumber > 1" class="pagination-buttons"> &lt;&lt; </button>
                <button @click="params.pageNumber -=1; findDeals()" v-if="params.pageNumber !== 0" class="pagination-buttons"> &lt; </button>
                
                <a @click="params.pageNumber -=3; findDeals()" v-if="params.pageNumber > 2" class="text-gray-500">{{params.pageNumber - 2}}</a>
                <a @click="params.pageNumber -=2; findDeals()" v-if="params.pageNumber > 1" class="text-gray-500">{{params.pageNumber - 1}}</a>
                <a @click="params.pageNumber -=1; findDeals()" v-if="params.pageNumber > 1" class="text-gray-500">{{params.pageNumber}}</a>

                <span class="text-gray-300 mx-5">Page {{parseInt(params.pageNumber) +1}}</span>

                <a @click="params.pageNumber +=1; findDeals()" v-if="params.pageNumber < numOfPage -1" class="text-gray-500">{{params.pageNumber + 2}}</a>
                <a @click="params.pageNumber +=2; findDeals()" v-if="params.pageNumber < numOfPage -2" class="text-gray-500">{{params.pageNumber + 3}}</a>
                <a @click="params.pageNumber +=3; findDeals()" v-if="params.pageNumber < numOfPage -3" class="text-gray-500">{{params.pageNumber + 4}}</a>
                
                <button @click="params.pageNumber +=1; findDeals()" v-if="params.pageNumber < numOfPage " class="pagination-buttons"> &gt; </button>
                <button @click="params.pageNumber = numOfPage; findDeals()" v-if="params.pageNumber < (numOfPage - 1)" class="pagination-buttons"> &gt;&gt; </button>
            </div>
            <!-- END: Page buttons (bottom) -->
            
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
                onSale: 1,
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