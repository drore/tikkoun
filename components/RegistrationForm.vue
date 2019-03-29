<template>
  <div>
    <div class="form-group row">
      <!-- E-mail -->
      <label class="col-sm-2 col-form-label" for="email">E-mail</label>
      <div class="col-sm-10">
        <input type="text" id="email" name="email" placeholder class="input-xlarge" v-model="email">
        <p class="help-block">Please provide your E-mail</p>
      </div>
    </div>

    <div class="form-group row">
      <!-- Password-->
      <label class="col-sm-2 col-form-label" for="password">Password</label>
      <div class="col-sm-10">
        <input
          type="password"
          id="password"
          name="password"
          placeholder
          class="input-xlarge"
          v-model="password"
        >
        <p class="help-block">Password should be at least 4 characters</p>
      </div>
    </div>

    <div class="form-group row">
      <!-- Button -->
      <div class="col-sm-10">
        <button class="btn btn-success" @click="register">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    showLogin(section) {
      this.$store.dispatch('loginShowSection', 'login')
    },
    register() {
      const registerationParams = {
        email: this.email,
        password: this.password
      }

      this.$store
        .dispatch('createUserWithEmailAndPassword', registerationParams)
        .then((res) => {
          debugger
          console.log('inside then statement on login')
        })
        .catch(e => {
          console.log(e.message)
        })
    },
    googleSignUp() {
      this.$store
        .dispatch('signInWithGoogle')
        .then(() => {
          console.log('inside then statement on login')
        })
        .catch(e => {
          console.log(e.message)
        })
    }
  }
}
</script>

<style lang="css">
.signIn {
}
</style>
