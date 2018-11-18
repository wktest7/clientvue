<template>
  <div>
    <b-tabs class="mt-3">
      <b-tab title="Your cart" active>
        <Cart />
      </b-tab>
      <b-tab title="New Orders">
        <NewOrders />
      </b-tab>
      <b-tab title="Shipped Orders">
        <ShippedOrders />
      </b-tab>
    </b-tabs>

  </div>
</template>
<script>
import currencyFilter from '../shared/currency-filter'
import NewOrders from './NewOrders.vue'
import ShippedOrders from './ShippedOrders.vue'
import Cart from './Cart.vue'
import { mapGetters } from 'vuex'

export default {
  components: { NewOrders, ShippedOrders, Cart },
  filters: {
    currency: currencyFilter
  },
  computed: {
    ...mapGetters(['cartFinalPrice'])
  },
  created() {
    this.$store.dispatch('getOrders')
  }
}
</script>

<style>
</style>
