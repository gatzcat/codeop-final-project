<template>
    <div class="flex flex-col gap-3">
        <!-- parametros para la busqueda -->
        <div id="search parameters"> 
            <form action="#">
                <label for="Game title">Game title</label>
                <input v-model="title" type="text" class="form-control p-2" placeholder="What game are you looking for?" />
            
                <label for="Min Price">Min Price</label>
                <input v-model="minPrice" type="range" class="p-2" />
            
                <label for="Max Price">Max Price</label>
                <input v-model="maxPrice" type="range" class="p-2" />

                <label for="AAA game">On-sale games only</label>
                <input v-model="onSale" type="checkbox" name="AAA games" id="AAA">
                <button @click="findDeals()" class="button-red">Search</button>
            </form>
        </div>
        
        <!-- solo para ver los valores del input input -->
        <span class="text-red-800">
            {{title}} {{minPrice}} {{maxPrice}} {{onSale}}
        </span>
        
        <!-- si tuvieramos resultados aparecerán aquí???? -->
        <div class="flex flex-col">
            <h4>Results</h4>
            <!-- TODO result block component  -->
            <!-- estos son las posibles maneras para ordenar los resultados, quizas podemos utilizarlos en el resultado -->
            <span> Sort result by? Price, Deal Rating + Title + Savings + Price + Metacritic + Reviews + Release + Store + recent </span>
            <div v-if="data" v-for="result in data">
                {{data}}
                {{result.title}}
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
            title: null,
            maxPrice: null,
            minPrice: null,
            onSale: false
        }
    },
    methods: {
        async findDeals() {
            try 
            {
                this.loading = true
                const response = await fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=${this.maxPrice}&lowerPrice=${this.minPrice}&onSale=${this.onSale}&title=${this.title}`)
                // const response = await fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=10&lowerPrice=3&onSale=${this.onSale}&title=${this.title}`)
                const responseJson = await response.json()
                this.data = responseJson
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false
            }
        },
    },
    mounted() {
        this.findDeals()
    },

}
</script>
<style lang="">
    
</style>