<template>
  <div>
    <h2>Current order</h2>
    <hr>
    <template>
      <b-table striped hover :items="newOrder" :fields="newOrderfields">
        <template slot="price" slot-scope="row">
          {{(row.item.product.price * row.item.quantity).toFixed(2)}}
        </template>
      </b-table>
    </template>
    <h5 v-if="cartFinalPrice > 0">final price: {{cartFinalPrice}}</h5>
    <b-btn variant="success">Send</b-btn>
    <h2>Orders history</h2>

    <div v-for="(item, index) in orders" :key="index">
      <div>
        <b-btn v-b-toggle="'collapse' + index" variant="info">
          <p>{{item.status}} Date: {{item.dateCreated}} Final price: {{item.finalPrice.toFixed(2)}} ,(new - zaplac, wyslane - PDF generate) </p>
        </b-btn>
        <hr>
        <b-collapse :id="'collapse'+ index" class="mt-2">
          <template>
            <b-table striped hover :items="item.orderItems" :fields="fields"></b-table>
          </template>
        </b-collapse>
      </div>

      <!-- <div v-for="(item, index) in item.orderItems" :key="index">
        <p>{{item.productName}}</p>
      </div> -->

    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      fields: {
        productName: {
          label: 'Product name',
          sortable: true
        },
        weight: {
          label: 'Weight [g]',
          sortable: true
        },
        quantity: {
          label: 'Quantity',
          sortable: true
        },
        productPrice: {
          label: 'Product price',
          sortable: true
        },
        price: {
          label: 'Price',
          sortable: true
        }
      },
      newOrderfields: {
        'product.name': {
          label: 'Product name',
          sortable: true
        },
        'product.weight': {
          label: 'Weight [g]',
          sortable: true
        },
        quantity: {
          label: 'Quantity',
          sortable: true
        },
        'product.price': {
          label: 'Product price',
          sortable: true
        },
        price: {
          label: 'Price'
        }
      }
    }
  },
  computed: {
    newOrder() {
      return this.$store.state.cart
    },
    orders() {
      return this.$store.state.orders
    },
    ...mapGetters(['cartFinalPrice'])
  },
  created() {
    this.$store.dispatch('getOrders')
  }
}
</script>

<style>
</style>
