import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//Vue.use(moment)

Vue.prototype.moment = moment
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.config.productionTip = false


// Add a request interceptor
axios.interceptors.request.use(function (config) {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // Do something with response error
  if (!localStorage.getItem('token')
    || error.response.status === 400
    || error.response.status === 401
    || error.response.status === 403) {
    //localStorage.removeItem('token')
    store.commit('removeToken')
    router.push({ path: '/login' })
  }
  return Promise.reject(error);
});


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
