<template>
    <div class="flex gap-3 items-center">
        <select v-model="currency" @change="handleChange()" id="currency" name="currency" class="rounded-full py-1 px-2 dark-purple text-gray-300 text-center border border-gray-300 mb-4 ">
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
</template>
<script>
export default {
    name: "CurrencySelector",
    data() {
        return {
            
        }
    },
    methods: {
        handleChange(){
            this.$emit("findDeals")
        }
    },
}
</script>
<style>
    
</style>