import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: [],
    categories: [],
    orders: []
  },
  mutations: {
    updateProducts(state, products) {
      state.products = products
    },
    updateCategories(state, categories) {
      state.categories = categories
    },
    updateOrders(state, orders) {
      state.orders = orders
    }

  },
  actions: {
    getProducts({ commit }) {
      axios.get('http://localhost:51444/api/products/foremployee')
        .then(result => commit('updateProducts', result.data))
    },
    editProduct(context, product) {
      return axios.put('http://localhost:51444/api/products', product)
    },
    addProduct(context, product) {
      return axios.post('http://localhost:51444/api/products', product)
    },
    getOrders({ commit }) {
      axios.get('http://localhost:51444/api/orders')
        .then(result => commit('updateOrders', result.data))
    },
    updateOrder(context, order) {
      return axios.put('http://localhost:51444/api/orders', order)
    },
    getCategories({ commit }) {
      axios.get('http://localhost:51444/api/categories')
        .then(result => commit('updateCategories', result.data))
    },
    updateCategory(context, category) {
      return axios.put('http://localhost:51444/api/categories', category)
    },
    deleteCategory(context, categoryId) {
      return axios.delete('http://localhost:51444/api/categories/' + categoryId)
    },
    addCategory(context, category) {
      return axios.post('http://localhost:51444/api/categories', category)
    }
  },
  getters: {
    availableProducts(state) {
      return state.products.filter(x => x.isHidden === false)
    },
    hiddenProducts(state) {
      return state.products.filter(x => x.isHidden === true)
    },
    newOrders(state) {
      return state.orders.filter(x => x.status === "New")
    },
    shippedOrders(state) {
      return state.orders.filter(x => x.status === "Shipped")
    }
  }
}
