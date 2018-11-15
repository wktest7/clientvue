<template>
  <div>
    <div v-if="cartFinalPrice > 0">
      <h2>Current order</h2>
      <hr>
      <template>
        <b-table striped hover :items="newOrder" :fields="newOrderfields">
          <template slot="product.price" slot-scope="data">
            {{data.item.product.price | currency}}
          </template>
          <template slot="price" slot-scope="row">
            {{(row.item.product.price * row.item.quantity) | currency}}
          </template>
          <template slot="deleteItem" slot-scope="row">
            <b-btn @click="deleteCartItem(row.item)" variant="danger">Delete</b-btn>
          </template>
        </b-table>
      </template>
      <h5>final price: {{ cartFinalPrice | currency }}</h5>
      <b-btn v-b-modal.sendOrder variant="success">Send</b-btn>
      <b-modal id="sendOrder" title="Confirmation" ok-title="Send" ok-variant="success" @ok="sendOrder()">
        <p>Are you sure you want to send this order?</p>
      </b-modal>
    </div>
    <h2>Orders history</h2>
    <h4>New Orders</h4>
    <!-- <div v-for="(item, index) in orders" :key="index">
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
    </div> -->

    <div v-for="(item, index) in getNewOrders" :key="'n' + index">
      <div>
        <b-btn v-b-toggle="'collapse' + index" variant="info">
          <p>{{item.status}} Date: {{moment(item.dateCreated).format('Do MMMM YYYY, h:mm:ss a')}} Final price: {{item.finalPrice | currency}} ,(new - zaplac, wyslane - PDF generate) </p>
        </b-btn>
        <hr>
        <b-collapse :id="'collapse'+ index" class="mt-2">
          <template>
            <b-table striped hover :items="item.orderItems" :fields="fields"></b-table>
          </template>
        </b-collapse>
      </div>
    </div>

    <h4>Shipped Orders</h4>
    <div v-for="(item, index) in getShippedOrders" :key="'s' + index">
      <div>
        <b-btn v-b-toggle="'collapse' + index" variant="info">
          <p>{{item.status}} Date: {{item.dateCreated}} Final price: {{item.finalPrice | currency}} ,(new - zaplac, wyslane - PDF generate) </p>
        </b-btn>
        <hr>
        <b-collapse :id="'collapse'+ index" class="mt-2">
          <template>
            <b-table striped hover :items="item.orderItems" :fields="fields"></b-table>
          </template>
        </b-collapse>
      </div>
    </div>
  </div>
</template>
<script>
import currencyFilter from '../shared/currency-filter'
import { mapGetters } from 'vuex'

export default {
  filters: {
    currency: currencyFilter
  },
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
          label: 'Product name'
        },
        'product.weight': {
          label: 'Weight [g]'
        },
        quantity: {
          label: 'Quantity'
        },
        'product.price': {
          label: 'Product price'
        },
        price: {
          label: 'Price'
        },
        deleteItem: {
          label: 'Delete'
        }
      }
    }
  },
  methods: {
    deleteCartItem(item) {
      this.$store.commit('deleteCartItem', item)
    },
    sendOrder() {
      this.$store
        .dispatch('sendOrder')
        .then(() => this.$store.dispatch('getOrders'))
        .then(() => this.$store.commit('clearCart'))

      //this.$store.dispatch('getOrders')
      // .then(() => this.$store.dispatch('getOrders'))
    }
  },
  // .then(() => this.$store.dispatch('getOrders'))
  //.then(res => alert('dsdf'))

  //this.$store.dispatch('getOrders')

  computed: {
    newOrder() {
      return this.$store.state.cart
    },
    orders() {
      return this.$store.state.orders
    },
    ...mapGetters(['cartFinalPrice', 'getNewOrders', 'getShippedOrders'])
  },
  created() {
    this.$store.dispatch('getOrders')
  }
}
</script>

<style>
</style>
