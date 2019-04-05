<template>
  <div>
    <div class="row login-form-wrapper">
      <div class="col-sm-6">
        <p>{{$t('banner.encourgement.line_1')}}</p>
        {{$t('banner.encourgement.line_2')}}
      </div>
      <div class="col-sm-6 row">
        <div class="login-form col-sm-6">
          <div>
            <input
              id="username"
              name="username"
              required="required"
              type="text"
              placeholder="username"
              v-model="username"
            >
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              v-model="password"
            >
          </div>
          <div>
            <input
              id="loginButton"
              name="login"
              class="btn-primary"
              type="submit"
              @click="emailLogin"
              :value="$t('nav.start')"
            >
          </div>
        </div>
        <div class="border-left col-sm-6">
          <a href="javascript:;" @click="googleSignUp">
            <img src="images/btn_google_signin_dark_normal_web.png" alt>
          </a>
          <div class="d-flex justify-content-between">
            <div>
              <a href="javascript:;" @click="showRegistration">{{$t('login.login_area.register')}}</a>
            </div>
            <a href="javascript:;" @click="enterAsGuest">{{$t('login.login_area.geust')}}</a>
          </div>
        </div>

        <p style="font-weight: bold; color: red;" v-if="loginError">{{$t(loginError)}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    loginError() {
      return this.$store.state.auth.login.error
    }
  },
  methods: {
    showRegistration(section) {
      this.$store.dispatch('auth/loginShowSection', 'registration')
    },
    enterAsGuest() {
      console.debug("Signing in as guest")
      this.$store.dispatch('auth/loginAnonymously').then(() => {
        console.debug("Rerouting to transcribe")
        this.$router.push('/transcribe')
      })
    },
    emailLogin() {
      const username = this.username
      const password = this.password
      if (username.indexOf('@') === -1) {
        username += '@tikkoun.com'
      }
      
      this.$store
        .dispatch('auth/signInWithEmail', {
          email: username,
          password: password
        })
        .then(() => {
          this.$router.push('/transcribe')
        })
    },
    googleSignUp() {
      this.$store
        .dispatch('auth/signInWithGoogle')
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

<style lang="scss" scoped>
.login-form {
  & > div {
    margin-bottom: 10px;
    input {
      padding: 5px;
      width: 100%;
    }
  }
}
</style>
