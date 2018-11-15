<template>
  <div>
    <template>
      <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Filter" class="mb-0">
              <b-input-group>
                <b-form-input v-model="filter" placeholder="Type to Search" />
                <b-input-group-append>
                  <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Per page" class="mb-0">
              <b-form-select :options="pageOptions" v-model="perPage" />
            </b-form-group>
          </b-col>
        </b-row>

        <!-- Main table element -->
        <b-table :items="products" :fields="fields" :filter="filter" @filtered="onFiltered" :current-page="currentPage" :per-page="perPage">
          <template slot="price" slot-scope="data">
            {{data.item.price | currency}}
          </template>
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
            <b-btn variant="primary" size="sm" @click.stop="openAddToCardModal(row.item, $event.target)" class="mr-2">
              Add to card
            </b-btn>
          </template>
        </b-table>

        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>
        </b-row>

        <b-modal id="addToCardModal" @hide="resetAddToCardModal" :title="addToCardModal.product.name" ok-title="Add" ok-variant="success" :ok-disabled="$v.quantity.$invalid" @ok="addToCard(addToCardModal.product, quantity)">
          <b-row>
            <b-col md="6">
              <div>
                <b-img src="https://placeimg.com/640/480/tech" style="width: 100%;"></b-img>
              </div>
            </b-col>
            <b-col md="6">
              <h5>Price: {{addToCardModal.product.price | currency}}</h5>
              <h5>Weight: {{addToCardModal.product.weight | weight}}</h5>
            </b-col>
          </b-row>

          <div class="py-1">
            <b-btn v-b-toggle.collapseDescription size="sm" variant="info">Description</b-btn>
            <b-collapse id="collapseDescription" class="mt-2">
              <b-card>
                <p class="card-text">{{addToCardModal.product.description}}</p>
              </b-card>
            </b-collapse>
          </div>
          <div>
            <b-form-input type="number" min="1" step="1" placeholder="Enter quantity" v-model="quantity" :state="!$v.quantity.$invalid"></b-form-input>
            <b-form-invalid-feedback>
              This is a required field and must be numeric.
            </b-form-invalid-feedback>
            <span v-if="quantity >= 1">Calculated price: {{addToCardModal.product.price | currency}} * {{quantity}} = {{(quantity * addToCardModal.product.price) | currency}} </span>

          </div>
        </b-modal>

      </b-container>
    </template>
  </div>
</template>

<script>
import currencyFilter from '../shared/currency-filter'
import weightFilter from '../shared/weight-filter'
import { required, numeric, minValue, maxValue } from 'vuelidate/lib/validators'

export default {
  filters: {
    currency: currencyFilter,
    weight: weightFilter
  },
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
      },
      currentPage: 1,
      perPage: 10,
      totalRows: this.$store.state.products.length,
      pageOptions: [10, 20, 50],
      filter: null,
      addToCardModal: {
        product: {}
      }
    }
  },
  methods: {
    openAddToCardModal(item, button) {
      this.addToCardModal.product = item
      this.$root.$emit('bv::show::modal', 'addToCardModal', button)
    },
    resetAddToCardModal() {
      this.addToCardModal.product = {}
      this.quantity = ''
    },
    addToCard(product, quantity) {
      let item = { product: product, quantity: quantity }
      this.$store.commit('addProductToCart', item)
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
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
