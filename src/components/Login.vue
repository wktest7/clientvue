<template>
  <div class="col-6 offset-3" style="margin-top:150px;">
    <b-form @submit.prevent="loginForm">
      <b-form-group label="Username:">
        <b-form-input type="text" v-model="credentials.username" aria-describedby="input1LiveFeedback" placeholder="Enter username" />
        <b-form-invalid-feedback>
          This is a required field.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Password:">
        <b-form-input type="password" v-model="credentials.password" aria-describedby="input1LiveFeedback" placeholder="Enter password" />
        <b-form-invalid-feedback>
          This is a required field.
        </b-form-invalid-feedback>
      </b-form-group>
      <div class="text-center">
        <b-button type="submit" :disabled="$v.credentials.$invalid" variant="primary">Login</b-button>
      </div>
    </b-form>
    <b-alert class="my-2" :show="invalidCredentialsAlert" variant="danger">Invalid credentials. Try again.</b-alert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
  computed: mapGetters(['loggedIn', 'isUser', 'isEmployee']),
  methods: {
    ...mapActions(['login']),
    loginForm() {
      this.login(this.credentials)
        .then(() => {
          if (this.isUser) {
            this.$router.push({ path: '/home' })
          } else if (this.isEmployee) {
            this.$router.push({ path: '/employee-home' })
          }
        })
        .catch(() => (this.invalidCredentialsAlert = true))
    }
  },
  created() {
    if (this.isUser) {
      this.$router.push({ path: '/home' })
    } else if (this.isEmployee) {
      this.$router.push({ path: '/employee-home' })
    }
  }
}
</script>

<style>
</style>
