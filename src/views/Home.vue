<template>
  <div>
    <Wallets />
    <ExchangeRates/>
  </div>
</template>

<script>

import Wallets from '../components/Wallets.vue';
import ExchangeRates from '../components/ExchangeRates.vue'
export default {
  components: {
    Wallets,
    ExchangeRates
  },
}
</script>