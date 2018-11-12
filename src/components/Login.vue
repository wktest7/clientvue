<template>
  <div>
    <b-form-input v-model="credentials.username" type="text" placeholder="Enter your username"></b-form-input>
    <p>Value: {{ credentials.username }}</p>
    <b-form-input v-model="credentials.password" type="password" placeholder="Enter your password"></b-form-input>
    <p>Value: {{ credentials.password }}</p>
    <b-button @click="login">Login</b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  computed: mapGetters(['loggedIn']),
  methods: {
    login() {
      this.$store
        .dispatch('login', this.credentials)
        .then(() => this.$router.push({ path: '/home' }))
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({ path: '/home' })
    }
  }
}
</script>

<style>
</style>
