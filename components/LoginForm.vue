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
          <div class="d-flex justify-content-between">
            <p style="font-weight: bold; color: red;" v-if="loginError">{{$t(loginError)}}</p>
            <div>
              <a href="javascript:;" @click="resetPassword">{{$t('reset_password')}}</a>
            </div>
          </div>
        </div>
        <div class="border-left col-sm-6">
          <a href="javascript:;" @click="googleSignUp">
            <img src="/images/btn_google_signin_dark_normal_web.png" alt="Google signin">
          </a>
          <div class="d-flex justify-content-between">
            <div>
              <a href="javascript:;" @click="showRegistration">{{$t('login.login_area.register')}}</a>
            </div>
            <a href="javascript:;" @click="enterAsGuest">{{$t('login.login_area.geust')}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api.js'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    loginError() {
      if (
        this.$store.state.auth.login.error ===
        'The password is invalid or the user does not have a password.'
      ) {
        return 'wrong_creds'
      } else {
        return this.$store.state.auth.login.error
      }
    }
  },
  methods: {
    showRegistration(section) {
      this.$store.dispatch('auth/loginShowSection', 'registration')
    },
    resetPassword() {
      if (this.username) {
        this.$store
          .dispatch('auth/sendResetPasswordMail', this.username)
          .then(res => {
            alert('Reset password mail sent')
          })
          .catch(err => {
            debugger
          })
      } else {
        alert('Please enter e-mail')
      }
    },
    enterAsGuest() {
      console.debug('Signing in as guest')
      this.$store.dispatch('auth/loginAnonymously').then(() => {
        console.debug('Rerouting to transcribe')
        this.$router.push(`/${this.$i18n.locale}/transcribe`)
      })
    },
    async emailLogin() {
      let username = this.username
      const password = this.password
      if (username.indexOf('@') === -1) {
        // username += '@tikkoun.com'
        username = await api.getEmailForUserId(username)
      }

      this.$store
        .dispatch('auth/signInWithEmail', {
          email: username,
          password: password
        })
        .then(() => {
          this.$router.push(`/${this.$i18n.locale}/transcribe`)
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
