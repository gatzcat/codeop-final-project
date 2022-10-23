<template>
    <div>
        <div v-if="salesPrice" class="flex gap-2 text-lg">
            <span class="text-red-500 font-semibold">{{niceSalesPrice}}</span> 
            <span v-if="onSale == 1" class="text-sm text-gray-600 line-through">{{niceNormalPrice}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "Price",

    data() {
        return {
            exchangeData: null,
            salesPrice: null,
            normalPrice: null,
            loading: false,
        }
    },

    props: ['currencyData', 'usdSalesPrice', 'usdNormalPrice', 'onSale'],
    methods: {
        async getCurrency() {
            try {
                this.loading = true
                const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${this.currencyValue}.json`)
                const responseJson = await response.json()
                this.exchangeData = responseJson[this.currencyValue]
                this.computePrices()
            }
            catch (error) {
                console.log(error);
            }
            finally {
                this.loading = false;
            }
        },

        computePrices() {
            this.salesPrice = this.usdSalesPrice * this.exchangeData
            this.normalPrice = this.usdNormalPrice * this.exchangeData
        },

        formatPrice(price) {
            let niceNumber = 
                this.currencyValue === "jpy" ? Math.round(price) :
                price.toFixed(2)
            
            return niceNumber
        },

        getSymbol() {
            let symbol = 
                this.currencyValue === "jpy" ? "¥" :
                this.currencyValue === "gbp" ? "£" :
                this.currencyValue === "eur" ? "€" :
                "$"
            return symbol
        },

    },

    computed: {
        currencyValue() {
            return this.currencyData.toLowerCase()
        },

        niceSalesPrice() {
            return `${this.getSymbol()}${this.formatPrice(this.salesPrice)}`
        },

        niceNormalPrice() {
            return `${this.getSymbol()}${this.formatPrice(this.normalPrice)}`
        }
    },

    mounted() {
        this.getCurrency()
    }
}
</script>
<style>
    
</style>