import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: [],
    categories: []
  },
  mutations: {
    updateProducts(state, products) {
      state.products = products
    },
    updateCategories(state, categories) {
      state.categories = categories
    }

  },
  actions: {
    getProducts({ commit }) {
      axios.get('http://localhost:51444/api/products/foremployee')
        .then(result => commit('updateProducts', result.data))
    },
    getCategories({ commit }) {
      axios.get('http://localhost:51444/api/categories')
        .then(result => commit('updateCategories', result.data))
    },
    editProduct(context, product) {
      return axios.put('http://localhost:51444/api/products', product)
    }
  },
  getters: {
    availableProducts(state) {
      return state.products.filter(x => x.isHidden === false)
    },
    hiddenProducts(state) {
      return state.products.filter(x => x.isHidden === true)
    }
  }
}
