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

import EmployeeHome from '../components/Employee/Home.vue'
import EmployeeProducts from '../components/Employee/Products.vue'
import EmployeeOrders from '../components/Employee/Orders.vue'
import Categories from '../components/Employee/Categories.vue'




import UserGuard from './user-guard'
import EmployeeGuard from './employee-guard'

export default new VueRouter({
  mode: 'history',
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  },
  //user
  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter: UserGuard
  },
  {
    path: '/products',
    name: 'products',
    component: Products,
    beforeEnter: UserGuard
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    beforeEnter: UserGuard
  },
  //employee
  {
    path: '/employee-home',
    name: 'employee-home',
    component: EmployeeHome,
    beforeEnter: EmployeeGuard
  },
  {
    path: '/employee-products',
    name: 'employee-products',
    component: EmployeeProducts,
    beforeEnter: EmployeeGuard
  },
  {
    path: '/employee-orders',
    name: 'employee-orders',
    component: EmployeeOrders,
    beforeEnter: EmployeeGuard
  },
  {
    path: '/employee-categories',
    name: 'employee-categories',
    component: Categories,
    beforeEnter: EmployeeGuard
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