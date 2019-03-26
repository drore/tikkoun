<template>
  <div>
    <div class="row login-form-wrapper justify-content-between">
      <div class="col-sm-4">
        <p>{{$t('banner.encourgement.line_1')}}</p>
        {{$t('banner.encourgement.line_2')}}
      </div>
      <div class="col-sm-4">
        <div class="login-form">
          <div>
            <input
              id="username"
              name="username"
              required="required"
              type="text"
              placeholder="myusername or mymail@mail.com"
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
              :value="$t('toolbar.right.start')"
            >
          </div>
          <div class="d-flex justify-content-between">
            <div>
              <a href="#" @click="showRegistration">{{$t('login.login_area.register')}}</a>
            </div>
            <a href="#" @click="enterAsGuest">{{$t('login.login_area.geust')}}</a>
          </div>
        </div>

        <!-- <c:if test="${errorMessageLogin != null}">
            <p
              style="font-weight: bold; font-size: large; color: red;"
            >{{$t('login.login_area.invalid')}}</p>
        </c:if>-->
      </div>
    </div>
    <div>
      <button @click="googleSignUp">Google Sign In</button>
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
  methods: {
    showRegistration(section) {
      this.$store.dispatch('loginShowSection', 'registration')
    },
    enterAsGuest() {
      this.$store.dispatch('loginAnonymously')
    },
    emailLogin() {
      this.$store
        .dispatch('signInWithEmail', {
          email: this.username,
          password: this.password
        })
        .then(() => {
          this.username = ''
          this.password = ''
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
