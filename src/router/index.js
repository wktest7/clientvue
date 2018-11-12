import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import Login from '../components/Login.vue'
// import Admin from '../components/Admin.vue'
// import AdminTwo from '../components/AdminTwo.vue'
// import About from '../components/About.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Products from '../components/Products.vue'
import Orders from '../components/Orders.vue'

export default new VueRouter({
  mode: 'history',
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   component: Admin
  // },
  // {
  //   path: '/admintwo',
  //   name: 'admintwo',
  //   component: AdminTwo
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: About
  // },
  {
    path: '*',
    redirect: { path: '/login' }
  }

  ]
})