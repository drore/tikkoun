<template>
  <div class="container">
    <form autocomplete="on" action="${pageContext.request.contextPath}/LoginServlet" method="post">
      <p class="change_link"></p>
      <h4>{{$t('register_screen.title')}}</h4>
      {{$t('register_screen.subtitle')}}
      <a
        href="#"
        @click="showLogin"
      >{{$t('login.login_area.login')}}</a>

      <!-- <c:if test="${errorMessageRegister != null}">
        <p
          style="font-weight: bold; font-size: large; color: red;"
        >{{$t('register_screen.invalid')}}</p>
      </c:if>-->
      <!-- <p style="font-weight: bold; font-size: large; color: red;">${errorMessageRegister}</p> -->

      <div class="row">
        <div class="col">{{$t('register_screen.userid')}}</div>
        <div class="col">
          <input
            id="usernamesignup"
            name="usernamesignup"
            required="required"
            type="text"
            placeholder="mysuperusername690"
          >
        </div>
      </div>

      <div class="row mt-2">
        <div class="col">{{$t('register_screen.email')}}</div>
        <div class="col">
          <input
            id="emailsignup"
            name="emailsignup"
            required="required"
            type="email"
            placeholder="mysupermail@mail.com"
          >
        </div>
      </div>

      <div class="row mt-2">
        <div class="col">{{$t('register_screen.password')}}</div>
        <div class="col">
          <input
            id="passwordsignup"
            name="passwordsignup"
            required="required"
            type="password"
            placeholder="password"
          >
        </div>
      </div>

      <div class="row mt-2">
        <div class="col">{{$t('register_screen.confirm')}}</div>
        <div class="col">
          <input
            id="passwordsignup_confirm"
            name="passwordsignup_confirm"
            required="required"
            type="password"
            placeholder="password"
          >
        </div>
      </div>

      <div class="row mt-2">
        <div class="col">{{$t('register_screen.contact')}}</div>
        <div class="col">
          <input id="contact" name="contact" type="checkbox">
        </div>
      </div>

      <h5 class="mt-2">{{$t('register_screen.demographics')}}</h5>
      <div class="scale">
        <div class="title">{{$t('register_screen.hebrew')}}</div>

        <ul class="d-flex">
          <li>{{$t('register_screen.none_hebrew')}}</li>
          <li>
            <input type="radio" name="hebrew" value="1">
          </li>
          <li>
            <input type="radio" name="hebrew" value="2">
          </li>
          <li>
            <input type="radio" name="hebrew" value="3">
          </li>
          <li>
            <input type="radio" name="hebrew" value="4">
          </li>
          <li>
            <input type="radio" name="hebrew" value="5">
          </li>
          <li>{{$t('register_screen.knowledgable_hebrew')}}</li>
        </ul>
      </div>
      <div class="scale mt-2">
        <div class="title">{{$t('register_screen.midrash')}}</div>

        <ul class="d-flex">
          <li>{{$t('register_screen.none_midrash')}}</li>
          <li>
            <input type="radio" name="midrashim" value="1">
          </li>
          <li>
            <input type="radio" name="midrashim" value="2">
          </li>
          <li>
            <input type="radio" name="midrashim" value="3">
          </li>
          <li>
            <input type="radio" name="midrashim" value="4">
          </li>
          <li>
            <input type="radio" name="midrashim" value="5">
          </li>
          <li>{{$t('register_screen.knowledgable_midrash')}}</li>
        </ul>
      </div>
      <p class="signin button mt-3">
        <input
          name="register"
          type="submit"
          class="btn btn-primary"
          :value="$t('register_screen.title')"
        >
        >
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formEmail: '',
      formPassword: ''
    }
  },
  methods: {
    showLogin(section) {
      this.$store.dispatch('loginShowSection', 'login')
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
