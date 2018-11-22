<template>
  <div>
    <h2>Categories</h2>

    <div>
      <template>
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
        <b-table :items="categories" :fields="fields" :filter="filter" @filtered="onFiltered" :current-page="currentPage" :per-page="perPage">
          <template slot="edit" slot-scope="row">
            <b-btn variant="warning" size="sm" @click="showModal(row.item)" class="mr-2">
              Edit
            </b-btn>
          </template>
          <template slot="delete" slot-scope="row">
            <b-btn variant="danger" size="sm" @click.stop="openDeleteCategoryModal(row.item, $event.target)" class="mr-2">
              Delete
            </b-btn>
          </template>
        </b-table>
        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>
        </b-row>

        <b-modal ref="myModalRef" size="lg" ok-only title="aa">
          <template>
            <h6>{{editCategoryModal.name}}</h6>

          </template>
        </b-modal>

        <b-modal id="deleteCategoryModal" size="lg" ok-only title="bb">
          <template>
            <h6>Final price:</h6>

          </template>
        </b-modal>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      fields: {
        name: {
          label: 'Name',
          sortable: true
        },
        edit: {
          label: 'Edit'
        },
        delete: {
          label: 'Delete'
        }
      },
      currentPage: 1,
      perPage: 5,
      filter: null,
      totalRows: mapState('employee', { categories: 'categories' }).length,
      pageOptions: [5, 10, 25],
      editCategoryModal: {},
      deleteCategoryModal: {}
    }
  },
  computed: {
    ...mapState('employee', { categories: 'categories' })
  },
  methods: {
    ...mapActions('employee', ['getCategories']),
    openEditCategoryModal(item, button) {
      this.editCategoryModal = item
      this.$root.$emit('bv::show::modal', 'editCategoryModal', button)
    },
    openDeleteCategoryModal(item, button) {
      this.deleteCategoryModal = item
      this.$root.$emit('bv::show::modal', 'deleteCategoryModal', button)
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    showModal(item) {
      this.editCategoryModal = item

      this.$refs.myModalRef.show()
    }
  },
  created() {
    this.getCategories()
  }
}
</script>

<style>
</style>
