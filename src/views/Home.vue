<template>
    <div class="flex flex-col gap-3">
        <!-- parametros para la busqueda -->
        <div id="search parameters">
            <form @submit.prevent class="flex flex-col">
                <label for="Game title">Game title</label>
                <input v-model="params.title" type="text" class="form-control rounded-full p-2" placeholder="What game are you looking for?" />
                
                <!-- TODO: combinar min y max price? -->
                <div class="flex justify-around p-3">
                    <label for="Min Price">Min Price</label>
                    <input v-model="params.minPrice" type="text" class="border border-gray-300 rounded-lg w-8" />
                    <input v-model="params.minPrice" type="range" class="p-2" />
                
                    <label for="Max Price">Max Price</label>
                    <input v-model="params.maxPrice" type="text" class="border border-gray-300 rounded-lg w-8" />
                    <input v-model="params.maxPrice" type="range" class="p-2" />
                    
                    <label for="AAA game">On-sale games only</label>
                    <input v-model="params.onSale" type="checkbox" name="On sale games" id="On sale" class="checkbox absolute z-10 cursor-pointer opacity-0">

                    <!-- estos son las posibles maneras para ordenar los resultados, quizas podemos utilizarlos en el resultado -->
                    <label for="sort">Sort by: </label>
                    <div>
                        <select id="sort" name="sort" class="rounded-full p-1">
                            <option value="Price">Price</option>
                            <option value="Deal Rating">Deal Rating</option>
                            <option value="Title">Tile</option>
                            <option value="Savings">Savings</option>
                            <option value="Metacritic Score">Metacritic Score</option>
                            <option value="Recent">Most Recent</option>
                        </select>
                    </div>
                </div>

                
                <button @click="findDeals()" class="button bg-[#d9a7ee] p-2 rounded-lg">Search</button>
            </form> 

        </div>
        
        <!-- solo para ver los valores del input input -->
        <!-- <div class="border border-gray-300 p-2 rounded-xl text-xs">
            <span class="text-red-700">params div (to be removed)</span> 
            <p>Title: {{params.title}}</p>
            <p>minPrice: {{params.minPrice}}</p>
            <p>maxPrice: {{params.maxPrice}}</p>
            <p>onSale: {{params.onSale}}</p>
               
        </div> -->
        
        <!-- si tuvieramos resultados aparecerán aquí???? -->
        <div class="flex flex-col">
            
            <!-- result block -->
            <div v-if="data" class="flex flex-col gap-5 ">
                
                <div v-for="result in data" class="flex rounded-xl bg-gray-200 p-4 shadow-2xl gap-4">
                    <img :src="`${biggerThumbnail(result.thumb)}`" :alt="`${result.title}`" class="rounded-3xl">
                    <div class="">
                        <h6 class="font-semibold">{{result.title}}</h6> 
                        <p><a :href="`https://www.metacritic.com/${result.metacriticLink}`" target="_blank">Metacritic Score: </a> {{result.metacriticScore}}</p>
                        <p class="mt-2 text-md text-red-500 font-semibold">
                            ${{result.salePrice}} 
                            <span class="text-green-500 text-xs">-{{Math.round(result.savings)}}%</span>
                        </p>
                        <p class="mt-2 text-sm text-gray-500 line-through">${{result.normalPrice}}</p>
                        <p>Deal Rating: {{result.dealRating}}</p>
                    </div>
                    <div class="">
                        <p>{{result.steamRatingText}} </p>
                        <p>{{result.steamRatingPercent}}%</p>
                        
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    name: "home",
    data() {
        return {
            loading: false,
            data: null,
            params: {
                title: null,
                maxPrice: 20,
                minPrice: 0,
                onSale: false,
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
                // response = await fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=${this.maxPrice}&lowerPrice=${this.minPrice}&onSale=${this.onSale}&title=${this.title}`)
                const responseJson = await response.json()
                this.data = responseJson
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
            let url = `https://www.cheapshark.com/api/1.0/deals?storeID=1`
            let params = ""
            console.log(this.params);
            params += this.params.title ? `&title=${this.params.title}` : ""
            params += this.params.maxPrice ? `&upperPrice=${this.params.maxPrice}` : ""
            params += this.params.minPrice ? `&lowerPrice=${this.params.minPrice}` : ""
            params += this.params.onSale ? `&onSale=${this.params.onSale}` : ""
            url += params
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