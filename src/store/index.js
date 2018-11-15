import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    products: [],
    cart: [],
    orders: []


  },
  mutations: {
    addProductToCart(state, item) {
      state.cart.push(item)
    },
    deleteCartItem(state, item) {
      let index = state.cart.indexOf(item)
      state.cart.splice(index, 1)
    },
    clearCart(state) {
      state.cart = []
    },
    // addItem(state, rzecz) {
    //   state.rzeczy.push(rzecz)
    // },
    // // updateBooks(state, books) {
    // //   books.forEach(element => {
    // //     state.books.push(element)
    // //   })
    // // },
    // // updateAdmin(state, admin) {
    // //   admin.forEach(element => {
    // //     state.admin.push(element)
    // //   })
    // // },
    // updateBooks(state, books) {
    //   state.books = books

    // },
    // updateAdmin(state, admin) {
    //   state.admin = admin
    // },
    // updateAdminTwo(state, admin) {
    //   state.admin = admin
    // },
    updateProducts(state, products) {
      state.products = products

    },
    updateOrders(state, orders) {
      state.orders = orders
    },
    saveToken(state, token) {
      localStorage.setItem('token', token)
      state.token = token
    },
    removeToken(state) {
      localStorage.removeItem('token')
      state.token = null
    }
  },
  actions: {
    getProducts({ commit }) {
      axios.get('http://localhost:51444/api/products/foruser')
        .then(result => commit('updateProducts', result.data))
    },
    getOrders({ commit }) {
      axios.get('http://localhost:51444/api/orders/userid')
        .then(result => commit('updateOrders', result.data))
    },
    sendOrder({ state }) {
      let orderItems = []
      state.cart.forEach(element => {
        orderItems.push({ "productId": element.product.productId, "quantity": element.quantity })
      })
      return axios.post('http://localhost:51444/api/orders', { orderItems: orderItems })
    },

    // getAdminInfo({ commit }) {
    //   axios.get('http://localhost:57575/api/admin')
    //     .then(result => commit('updateAdmin', result.data))
    // },
    // getAdminInfoTwo({ commit }) {
    //   axios.get('http://localhost:57575/api/admin/2')
    //     .then(result => commit('updateAdminTwo', result.data))
    // },
    login({ commit }, credentials) {
      return axios.post('http://localhost:51444/api/auth/token', credentials)
        .then(result => commit('saveToken', result.data.token))
    }
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    isUser(state) {
      if (state.token !== null) {
        let parseToken = parseJwt(state.token)
        if (parseToken.role === "user") {
          return true
        }
      }
      return false
    },
    isEmployee(state) {
      if (state.token !== null) {
        let parseToken = parseJwt(state.token)
        //console.log(parseToken.exp < Date.now())

        if (parseToken.role === "employee") {
          return true
        }
      }
      return false
    },
    cartLength(state) {
      return state.cart.length
    },
    cartFinalPrice(state) {
      let sum = 0;
      state.cart.forEach(element => {
        sum += element.product.price * element.quantity
      });
      return sum
    },
    getNewOrders(state) {
      return state.orders.filter(x => x.status === "New")
    },
    getShippedOrders(state) {
      return state.orders.filter(x => x.status === "Shipped")
    }
    // cartLength(state) {
    //   return state.cart.length
    // },
  }
})


function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}