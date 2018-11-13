<template>
  <div>
    <h4>products</h4>
    <img src="https://via.placeholder.com/100">
    <b-table :items="products" :fields="fields">
      <template slot="showDescription" slot-scope="row">
        <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
        <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Description
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
            <b-col>{{ row.item.description }}</b-col>
          </b-row>
        </b-card>
      </template>
      <template slot="addToCard" slot-scope="row">
        <b-btn @click="resetQuantity" variant="primary" size="sm" v-b-modal="'addToCardModal' + row.item.productId" class="mr-2">
          Add to card
        </b-btn>
        <b-modal v-bind:id="'addToCardModal' + row.item.productId" centered :title="row.item.name" ok-title="Add" ok-variant="success" :ok-disabled="$v.quantity.$invalid" @ok="addToCard(row.item, quantity)">
          <img src="https://via.placeholder.com/100">
          Price: {{row.item.price}}, Weight: {{row.item.weight}} [g] <br>
          <div>
            <b-btn v-b-toggle.collapseDescription size="sm" variant="info">Description</b-btn>
            <b-collapse id="collapseDescription" class="mt-2">
              <b-card>
                <p class="card-text">{{row.item.description}}</p>
              </b-card>
            </b-collapse>
          </div>

          <b-form-input type="number" min="1" step="1" placeholder="Enter quantity" v-model="quantity" :state="!$v.quantity.$invalid"></b-form-input>
          <b-form-invalid-feedback>
            This is a required field and must be numeric.
          </b-form-invalid-feedback>
          <span v-if="quantity >= 1">Calculated price: {{row.item.price}} * {{quantity}} = {{(quantity * row.item.price).toFixed(2)}}</span>

          <!-- <form @submit.stop.prevent="handleSubmit">
            <b-form-input type="number" min="1" placeholder="Enter quantity" v-model="quantity"></b-form-input>
          </form> -->
        </b-modal>
      </template>
    </b-table>
  </div>
</template>

<script>
import { required, numeric, minValue, maxValue } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      quantity: '',
      fields: {
        name: {
          label: 'Name',
          sortable: true
        },
        weight: {
          label: 'Weight [g]',
          sortable: true
        },
        price: {
          label: 'Price',
          sortable: true
        },
        category: {
          label: 'Category',
          sortable: true
        },
        showDescription: {
          label: 'Show Description'
        },
        addToCard: {
          label: 'Add to card'
        }
      }
    }
  },
  methods: {
    qwe() {
      alert('XX')
    },
    resetQuantity() {
      this.quantity = ''
    },
    addToCard(product, quantity) {
      let item = { product: product, quantity: quantity }
      this.$store.commit('addProductToCart', item)
    }
  },
  validations: {
    quantity: {
      required,
      numeric,
      minValue: minValue(1),
      maxValue: maxValue(1000)
    }
  },
  computed: {
    products() {
      return this.$store.state.products
    }
  },
  created() {
    this.$store.dispatch('getProducts')
  }
}
</script>

<style>
</style>
