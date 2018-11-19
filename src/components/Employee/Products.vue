<template>
  <div>
    <h2>Products</h2>

    <b-tabs class="mt-3">
      <b-tab title="Available products" active>
        <AvailableProducts />
      </b-tab>
      <b-tab title="Hidden products">

      </b-tab>
      <b-tab title="Add new product">

      </b-tab>
    </b-tabs>

  </div>
</template>

<script>
import AvailableProducts from './AvailableProducts.vue'
import { mapActions } from 'vuex'

export default {
  components: { AvailableProducts },
  methods: {
    ...mapActions('employee', ['getProducts', 'getCategories'])
  },
  created() {
    this.getProducts()
    this.getCategories()
  }
}
</script>

<style>
</style>
