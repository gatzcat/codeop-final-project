<template>
    <!-- START: CONTENEDOR PARA TODAS LAS COSAS EN HOME -->
    <div class="flex flex-col md:flex-row justify-center relative gap-2">
        
        <!-- Start: Columna Izquierda para buscador -->
        <div id="search column" class="rounded-[30px] pt-8 p-6 md:p-6 md:py-8 md:border-2 md:rounded-[50px] lg:w-1/3 lg:p-10 lg:ml-10 lg:border-4 h-2/3 border-purple lg:rounded-[80px] dark-purple md:sticky top-10">

            <div class="justify-center mb-10 hidden sm:flex">
                <img src="../img/logosteamblanco.png" class="w-1/5 opacity-50"  alt="Logotipo de Steam">
            </div>

            <form @submit.prevent class="flex flex-col gap-3">
                <label for="Game title" class="hidden">Game title</label>
                <input @focus="searchFocus()"  v-model="params.title" type="text" class="bg-gray-800 border border-gray-600 rounded-full p-2 text-gray-200" placeholder="Game Title" />
                
                <div class="flex justify-between">
                    <label for="Min Price">Min Price</label>
                    <input @change="findDeals()" v-model="params.lowerPrice" type="range" class="hidden sm:inline slider w-1/2" />
                    <input @change="findDeals()" v-model="params.lowerPrice" type="number" class=" w-1/5 px-2 border bg-gray-800 text-gray-200 border-gray-600 rounded-lg" />
                </div>
                
                <div class="flex justify-between">
                    <label for="Max Price">Max Price</label>
                    <input @change="findDeals()" v-model="params.upperPrice" type="range" class="hidden sm:inline slider w-1/2" />                    
                    <input @change="findDeals()" v-model="params.upperPrice" type="number" class="w-1/5 px-2 border bg-gray-800 text-gray-200 border-gray-600 rounded-lg" />
                </div>

                <div class="flex flex-col gap-3">
                    <div class="flex justify-between">
                        <label for="Max Price">Min Steam Rating</label>
                        <input @change="findDeals()" v-model="params.steamRating" type="text" class="w-1/5 px-2 border bg-gray-800 text-gray-200 border-gray-600 rounded-lg" />
                    </div>
                    <input @change="findDeals()" v-model="params.steamRating" type="range" class="slider w-full" />
                </div>

                <!-- START: onsale and currency -->
                <div class="flex gap-2 justify-between">
                    
                    <div class="flex gap-2 items center justify-center">
                        <label for="On sale">On-sale only</label>
                        <input @change="findDeals()" v-model="params.onSale" type="checkbox" :true-value="1" :false-value="0" name="On sale games" id="On sale" class="w-4">
                    </div>

                    <!-- START Currency dropdown-->
                    <div class="flex gap-3 items-center">
                        <select v-model="currency" @change="findDeals()" id="currency" name="currency" class="rounded-full py-1 px-2 dark-purple text-gray-200 text-center border border-gray-800 ">
                            <option value="USD" class="options">USD</option>
                            <option value="EUR" class="options">EUR</option>
                            <option value="GBP" class="options">GBP</option>
                            <option value="JPY" class="options">JPY</option>
                            <option value="AUD" class="options">AUD</option>
                            <option value="NZD" class="options">NZD</option>
                            <option value="SGD" class="options">SGD</option>
                            <option value="CAD" class="options">CAD</option>
                        </select>
                    </div>

                    <!-- END Currency dropdown-->

                </div>
                <!-- END: onsale and currency -->

                <button @click="findDeals()" class="button dark-button p-2 md:m-2 md:mt-8 rounded-full text-white text-l">Search</button>
            </form> 
            
        </div>
        <!-- End: Columna Izquierda para buscador -->

        <!-- START: Columna Derecha para resultados -->
        <div id="result column" class="lg:flex flex-col rounded-[30px] p-4 md:w-3/5 md:p-4 md:border-2 md:rounded-[50px] lg:w-2/3 lg:p-16 lg:mr-10 lg:border-4 border-purple lg:rounded-[80px] dark-purple gap-2  align-middle">
            
            
            <div class="flex justify-between ">
                <!-- START Sortby dropdown-->
                <div class="flex gap-3 items-center px-6">
                    <label for="sort" class="">Sort by:</label>
                    <select v-model="params.sortBy" @change="findDeals()" id="sort" name="sort" class="rounded-full py-1 px-2 dark-purple text-gray-300 text-center border border-gray-300">
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
                <div class="flex gap-2 justify-center items-center mt-2 hidden md:flex" v-if="data">
                    <button @click="params.pageNumber -=1; findDeals()" v-if="params.pageNumber !== 0" class="pagination-buttons"> &lt; </button>
                    
                    <span class="text-gray-300 mx-1">Page {{parseInt(params.pageNumber) +1}}</span>

                    <button @click="params.pageNumber +=1; findDeals()" v-if="params.pageNumber < numOfPage " class="pagination-buttons"> &gt; </button>
                </div>
                <!-- END: Page buttons (top) -->

            </div>

            <!-- START: loading spinner -->
            <div v-if="loading" class="fade-in">
                <div class="flex items-center justify-center w-full h-96 ">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="rotate-180">
                    <g transform="translate(50 42)">
                    <g transform="scale(0.8)">
                        <g transform="translate(-50 -50)">
                        <polygon fill="#ee8361" points="72.5 50 50 11 27.5 50 50 50">
                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2.272727272727273s" values="0 50 38.5;360 50 38.5" keyTimes="0;1"></animateTransform>
                        </polygon>
                        <polygon fill="#7abe89" points="5 89 50 89 27.5 50">
                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2.272727272727273s" values="0 27.5 77.5;360 27.5 77.5" keyTimes="0;1"></animateTransform>
                        </polygon>
                        <polygon fill="#a4d9f0" points="72.5 50 50 89 95 89">
                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2.272727272727273s" values="0 72.5 77.5;360 72 77.5" keyTimes="0;1"></animateTransform>
                        </polygon>
                        </g>
                    </g>
                    </g>
                    <!-- [ldio] generated by https://loading.io/ --></svg>
                </div>
            </div>
            <!-- END: loading spinner -->

            <!-- START: results -->
            <div v-if="data && !loading" class="flex flex-col gap-5 px-6 py-2 fade-in">
                
                <!-- START individual result block -->
                <div v-for="result in data" :key="result.title" class="grid grid-rows xl:grid-cols-[2fr,3fr,1.5fr] items-center rounded-3xl bg-[#fefdffb0] opacity-85 px-4 py-2 shadow-xl gap-4">
                    
                    <!-- START: thumbnail del juego -->
                    <div class="relative">
                        <a target="_blank" :href="`https://store.steampowered.com/app/${result.steamAppID}/${result.title}/`">
                            <img :src="`${biggerThumbnail(result.thumb)}`" :alt="`${result.title}`" class="drop-shadow-md rounded-3xl w-full lg:max-h-[8rem] grow" />
                        </a>
                        <span v-if="parseInt(result.savings) !== 0" class="absolute bottom-1 right-2 rounded-tl-xl rounded-3xl text-sm text-green-500 pl-2 opacity-80 bg-gray-800 font-semibold">-{{Math.round(result.savings)}}%</span>
                    </div>
                    
                    <!-- END: thumbnail juego -->
                    
                    <!-- START: metacritic and small steam rating -->
                    <div class="">
                        <a target="_blank" :href="`https://store.steampowered.com/app/${result.steamAppID}/${result.title}/`">
                            <h6 class="font-semibold">
                                {{result.title}}
                            </h6> 
                        </a>
                        <!-- START: metacritic and small steam rating -->
                        <div class="flex xl:flex-col gap-3">
                            <span class="flex gap-1 xl:hidden items-center">
                                <i class="fa-brands fa-steam flex xl:hidden"></i>
                                <span :class="`${(result.steamRatingPercent < 40) ? 'text-red-700' : (result.steamRatingPercent >= 40 && result.steamRatingPercent < 70) ? 'text-orange-700' : 'text-green-600'}`">{{result.steamRatingPercent}} %</span>
                            </span>

                            <a v-if="result.metacriticLink && result.metacriticScore > 0" :href="`https://www.metacritic.com/${result.metacriticLink}`" target="_blank">
                                <div class="flex items-center gap-1">
                                    <img src="../img/Metacritic-icon.png" class="w-4 h-4" />
                                    <span class="hidden xl:inline">Metacritic Score: </span>
                                    <span class="" :class="`${(result.steamRatingPercent < 40) ? 'text-red-700' : (result.steamRatingPercent >= 40 && result.steamRatingPercent < 70) ? 'text-orange-700' : 'text-green-600'}`">
                                        {{result.metacriticScore}}
                                    </span>
                                </div>
                            </a>
                        </div>
                        <!-- END: metacritic and small steam rating -->

                        <Price :currencyData="currency" :usdSalesPrice="result.salePrice" :usdNormalPrice="result.normalPrice" :onSale="result.isOnSale" />
                        
                        <p v-if="parseInt(result.dealRating) !== 0" class="text-sm">Deal Rating: {{result.dealRating}}</p>
                    </div>
                    

                    <!-- START: steam rating -->
                    <div class="flex justify-self-start hidden xl:inline">
                        <a target="_blank" :href="`https://store.steampowered.com/app/${result.steamAppID}/${result.title}/#app_reviews_hash`" class="text-3xl group relative">
                            <i class="fa-brands fa-steam opacity-80 hover:opacity-100"
                            :class="`${(result.steamRatingPercent < 40) ? 'text-red-700' : (result.steamRatingPercent >= 40 && result.steamRatingPercent < 70) ? 'text-orange-700' : 'text-green-600'}`"></i>
                            <span class="ml-1 font-mono">{{result.steamRatingPercent}}%</span>

                            <span 
                                class="absolute hidden group-hover:flex -left-5 -top-2 -translate-y-full w-auto px-2 py-1 rounded-xl text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent"
                                :class="`${(result.steamRatingPercent < 40) ? 'bg-red-700 after:border-t-red-700' : (result.steamRatingPercent >= 40 && result.steamRatingPercent < 70) ? 'bg-orange-700 after:border-t-orange-700' : 'bg-green-600 after:border-t-green-600'}`"
                                >
                                {{result.steamRatingText}} <br>{{result.steamRatingCount}} reviews
                            </span>
                        </a>
                    </div>
                    <!-- END: steam rating -->
                </div>
                <!-- END individual result block -->

            </div>
            <!-- END: results -->

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
import Price from '../components/Price.vue'

export default {
    name: "home",

    components: {
        price: Price
    },

    data() {
        return {
            loading: false,
            showParams: null,
            data: null,
            numOfPage: null,
            currency: "USD",
            params: {
                title: null,
                upperPrice: 20,
                lowerPrice: 0,
                onSale: 1,
                sortBy: "Metacritic",
                steamRating: 60,
                pageNumber: 0,
            }
        };
    },
    methods: {
        // hace llamada al API
        async findDeals() {
            try {
                this.loading = true;
                const response = await fetch(this.getUrl);
                const responseJson = await response.json();
                this.data = responseJson;
                this.numOfPage = response.headers.get("x-total-page-count");
            }
            catch (error) {
                console.log(error);
            }
            finally {
                this.loading = false;
            }
        },
        
        biggerThumbnail(url) {
            let newUrl = url.replace("capsule_sm_120", "header");
            return newUrl;
        },
        
        processParams() {
            let newValue = this.params.onSale ? 1 : 0;
            this.params.onSale = newValue;
        },

        searchFocus() {
           console.log(window.innerWidth < 768); 
        }

    },
    computed: {
        // construye el URL con los parametros para hacer la llamada
        getUrl() {
            this.processParams();
            let url = `https://www.cheapshark.com/api/1.0/deals?storeID=1&desc=0&pageSize=10`;
            for (let [paramName, paramValue] of Object.entries(this.params)) {
                url += paramValue ? `&${paramName}=${paramValue}` : "";
            }
            console.log(url);
            return url;
        },

    },
    mounted() {
        this.findDeals();
    },
    components: { Price }
}
</script>

<style>


</style>