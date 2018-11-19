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
        <b-table :items="availableProducts" :fields="fields" :filter="filter" @filtered="onFiltered" :current-page="currentPage" :per-page="perPage">
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
          <template slot="edit" slot-scope="row">
            <b-btn variant="warning" size="sm" @click.stop="openEditProductModal(row.item, $event.target)" class="mr-2">
              Edit
            </b-btn>
          </template>
        </b-table>

        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>
        </b-row>

        <b-modal id="editProductModal" ok-title="Edit" ok-variant="warning" :title="editProductModal.product.name" @ok="editProductBtn()">
          <b-row>

            <div class="col-4 offset-4">
              <b-img src="https://placeimg.com/640/480/tech" style="width: 100%;"></b-img>
            </div>
            <b-form-group class="col-10 offset-1" label="Name:">
              <b-form-input type="text" v-model="editProductModal.product.name" aria-describedby="input1LiveFeedback" placeholder="Enter name" />
              <b-form-invalid-feedback>
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group class="col-10 offset-1" label="Hidden:">
              <b-form-checkbox v-model="editProductModal.product.isHidden" unchecked-value="false">
                Hide product
              </b-form-checkbox>
              <b-form-invalid-feedback>
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group class="col-10 offset-1" label="Description:">
              <b-form-textarea v-model="editProductModal.product.description" placeholder="Enter description" :rows="3" :max-rows="6">
              </b-form-textarea>
              <b-form-invalid-feedback>
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group class="col-10 offset-1" label="Weight:">
              <b-form-input type="number" min="1" step="1" v-model="editProductModal.product.weight" aria-describedby="input1LiveFeedback" placeholder="Enter weight" />
              <b-form-invalid-feedback>
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group class="col-10 offset-1" label="Price:">
              <b-form-input type="number" min="0.1" step="0.1" v-model="editProductModal.product.price" aria-describedby="input1LiveFeedback" placeholder="Enter price" />
              <b-form-invalid-feedback>
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group class="col-10 offset-1" label="Category:">
              <b-form-select v-model="editProductModal.product.categoryId" :required="true">
                <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
                  {{ category.name }}
                </option>
              </b-form-select>
              <b-form-invalid-feedback>
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <!-- <b-button type="submit" :disabled="$v.credentials.$invalid" variant="primary">Login</b-button> -->
          </b-row>
        </b-modal>

      </b-container>
    </template>
  </div>
</template>

<script>
import currencyFilter from '../../shared/currency-filter'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  filters: {
    currency: currencyFilter
  },
  data() {
    return {
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
        edit: {
          label: 'Edit'
        }
      },
      currentPage: 1,
      perPage: 5,
      //totalRows: this.$store.state.products.length,
      totalRows: mapGetters('employee', {
        availableProducts: 'availableProducts'
      }).length,
      pageOptions: [5, 10, 25],
      filter: null,
      editProductModal: {
        product: {}
      }
    }
  },
  methods: {
    ...mapActions('employee', ['editProduct', 'getProducts']),
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    openEditProductModal(item, button) {
      this.editProductModal.product = JSON.parse(JSON.stringify(item))
      this.$root.$emit('bv::show::modal', 'editProductModal', button)
    },
    editProductBtn() {
      this.editProduct(this.editProductModal.product).then(() =>
        this.getProducts()
      )
    }
  },
  computed: {
    ...mapGetters('employee', { availableProducts: 'availableProducts' }),
    ...mapState('employee', { categories: 'categories' })
  }
}
</script>

<style>
</style>

