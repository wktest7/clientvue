<template>
  <div>
    <b-form>
      <b-form-group label="Username:">
        <b-form-input type="text" v-model="credentials.username" :state="!$v.credentials.username.$invalid" aria-describedby="input1LiveFeedback" placeholder="Enter username" />
        <b-form-invalid-feedback>
          This is a required field.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Password:">
        <b-form-input type="password" v-model="credentials.password" :state="!$v.credentials.password.$invalid" aria-describedby="input1LiveFeedback" placeholder="Enter password" />
        <b-form-invalid-feedback>
          This is a required field.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button @click="login()" :disabled="$v.credentials.$invalid" variant="primary">Login</b-button>
    </b-form>
    <b-alert :show="invalidCredentialsAlert" variant="danger">Invalid credentials. Try again.</b-alert>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      invalidCredentialsAlert: false
    }
  },
  validations: {
    credentials: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  computed: mapGetters(['loggedIn']),
  methods: {
    login() {
      this.$store
        .dispatch('login', this.credentials)
        .then(() => this.$router.push({ path: '/home' }))
        .catch(() => (this.invalidCredentialsAlert = true))
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
