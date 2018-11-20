<template>
  <div>
    <h2>Orders</h2>

    <b-tabs class="mt-3">
      <b-tab title="New orders" active>
        <NewOrders />
      </b-tab>
      <b-tab title="Shipped orders">

      </b-tab>
    </b-tabs>
  </div>

</template>

<script>
import NewOrders from './NewOrders.vue'

import { mapActions } from 'vuex'

export default {
  components: { NewOrders },
  methods: {
    ...mapActions('employee', ['getOrders'])
  },
  created() {
    this.getOrders()
  }
}
</script>

<style>
</style>
