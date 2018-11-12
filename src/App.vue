<template>
  <div id="app">
    <div v-if="loggedIn">
      <div v-if="isUser">
        <b-navbar type="dark" variant="secondary" toggleable>
          <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
          <b-collapse is-nav id="nav_dropdown_collapse">
            <b-navbar-nav>
              <router-link class="nav-link" to="/home">Home</router-link>
              <router-link class="nav-link" to="/products">Products</router-link>
              <router-link class="nav-link" to="/orders">Orders</router-link>
              <router-link class="nav-link" to="/options">Options</router-link>
              <router-link class="nav-link" to="/options">USER</router-link>
              <router-link v-if="cartLength >= 1" class="nav-link" to="/orders">Current order: {{cartLength}}</router-link>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <b-button v-if="loggedIn" variant="primary" @click="logout()">Logout</b-button>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <div v-if="isEmployee">
        <b-navbar type="dark" variant="secondary" toggleable>
          <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
          <b-collapse is-nav id="nav_dropdown_collapse">
            <b-navbar-nav>
              <router-link class="nav-link" to="/home">Home</router-link>
              <router-link class="nav-link" to="/products">Products</router-link>
              <router-link class="nav-link" to="/orders">Orders</router-link>
              <router-link class="nav-link" to="/options">Options</router-link>
              <router-link class="nav-link" to="/options">EMPLOYEE</router-link>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <b-button v-if="loggedIn" variant="primary" @click="logout()">Logout</b-button>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>

    <router-view />
    <h2>aa</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: mapGetters(['loggedIn', 'isEmployee', 'isUser', 'cartLength']),
  methods: {
    logout() {
      //localStorage.removeItem('token')
      this.$store.commit('removeToken')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style>
.router-link-active {
  color: white !important;
}
</style>
