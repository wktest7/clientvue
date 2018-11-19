<template>
  <div>
    <template>
      <b-row>
        <b-col md="6" class="my-1">
          <b-form-group horizontal label="Filter" class="mb-0">
            <b-input-group>
              <b-input-group-prepend>
                <b-btn @click="openDataPicker">
                  <font-awesome-icon icon="calendar-alt" />
                </b-btn>
              </b-input-group-prepend>
              <datepicker ref="programaticOpen" v-model="selectedDate" placeholder="Select Date" :bootstrap-styling="true" />
              <b-input-group-append>
                <b-btn :disabled="!selectedDate" @click="selectedDate = ''">Clear</b-btn>
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
      <b-table :items="getNewOrders" :fields="fields" :filter="filteredDate" @filtered="onFiltered" :current-page="currentPage" :per-page="perPage">
        <template slot="dateCreated" slot-scope="data">
          {{moment(data.item.dateCreated).format('Do MMMM YYYY, h:mm:ss a')}}
        </template>
        <template slot="finalPrice" slot-scope="data">
          {{data.item.finalPrice | currency}}
        </template>
        <template slot="items" slot-scope="row">
          <b-btn variant="primary" size="sm" @click.stop="openItemsModal(row.item, $event.target)" class="mr-2">
            Show items
          </b-btn>
        </template>
        <template slot="pay" slot-scope="row">
          <b-btn variant="warning" size="sm" @click.stop="openPayModal(row.item, $event.target)" class="mr-2">
            Pay
          </b-btn>
        </template>
      </b-table>
      <b-row>
        <b-col md="6" class="my-1">
          <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
        </b-col>
      </b-row>

      <b-modal id="newOrderItemsModal" size="lg" ok-only :title="moment(itemsModal.order.dateCreated).format('Do MMMM YYYY, h:mm:ss a')">
        <template>
          <h6>Final price: {{itemsModal.order.finalPrice | currency}}</h6>
          <template>
            <b-table striped hover :items="itemsModal.order.orderItems" :fields="itemsFields">
              <template slot="productPrice" slot-scope="row">
                {{ row.item.productPrice | currency }}
              </template> <template slot="price" slot-scope="row">
                {{ row.item.price | currency }}
              </template>
            </b-table>
          </template>
        </template>
      </b-modal>
      <b-modal id="newOrderPayModal" size="lg" ok-only :title="moment(payModal.order.dateCreated).format('Do MMMM YYYY, h:mm:ss a')">
        <template>
          <h6>Final price: {{payModal.order.finalPrice | currency}}</h6>
          <h6>Title: {{payModal.order.orderId}}</h6>
        </template>
      </b-modal>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '../shared/currency-filter'
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  },
  filters: {
    currency: currencyFilter
  },
  data() {
    return {
      selectedDate: '',
      fields: {
        dateCreated: {
          label: 'Date',
          sortable: true
        },
        finalPrice: {
          label: 'Final Price',
          sortable: true
        },
        items: {
          label: 'Items'
        },
        pay: {
          label: 'Pay'
        }
      },
      currentPage: 1,
      perPage: 5,
      // totalRows: this.$store.state.orders.filter(x => x.status === 'New')
      //   .length,
      totalRows: mapGetters('user', { getNewOrders: 'getNewOrders' }).length,
      pageOptions: [5, 10, 25],
      itemsModal: {
        order: {}
      },
      payModal: {
        order: {}
      },
      itemsFields: {
        productName: {
          label: 'Product name'
        },
        weight: {
          label: 'Weight [g]'
        },
        quantity: {
          label: 'Quantity'
        },
        productPrice: {
          label: 'Product price'
        },
        price: {
          label: 'Price'
        }
      }
    }
  },
  computed: {
    ...mapGetters('user', { getNewOrders: 'getNewOrders' }),
    filteredDate: {
      get() {
        if (
          Object.prototype.toString.call(this.selectedDate) === '[object Date]'
        ) {
          let day = this.selectedDate.getDate()
          if (day < 10) {
            day = '0' + day
          }
          let month = this.selectedDate.getMonth() + 1
          if (month < 10) {
            month = '0' + month
          }
          let year = this.selectedDate.getFullYear()
          return `${year}-${month}-${day}`
        }
      }
    }
  },
  methods: {
    openItemsModal(item, button) {
      this.itemsModal.order = item
      this.$root.$emit('bv::show::modal', 'newOrderItemsModal', button)
    },
    openPayModal(item, button) {
      this.payModal.order = item
      this.$root.$emit('bv::show::modal', 'newOrderPayModal', button)
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    openDataPicker() {
      this.$refs.programaticOpen.showCalendar()
      this.$refs.programaticOpen
    }
  }
}
</script>

<style>
</style>
