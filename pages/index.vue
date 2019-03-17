<template>
  <div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="title">tikkoun</h1>
        <h2 class="subtitle">Tikkoun Sofrim V2</h2>
      </div>
    </div>
    <div class="container">
      <ul id="myTab" class="nav nav-tabs" role="tablist">
        <li class="nav-item">
          <a
            id="login-tab"
            class="nav-link active"
            data-toggle="tab"
            href="#login"
            role="tab"
            aria-controls="login"
            aria-selected="true"
          >{{ $t("login") }}</a>
        </li>
        <li class="nav-item">
          <a
            id="register-tab"
            class="nav-link"
            data-toggle="tab"
            href="#register"
            role="tab"
            aria-controls="register"
            aria-selected="false"
          >{{ $t("register") }}</a>
        </li>
      </ul>
      <div id="myTabContent" class="tab-content">
        <div id="login" class="tab-pane show active" role="tabpanel" aria-labelledby="login-tab">
          <Login-form v-if="!$store.state.user" />
        </div>
        <div id="register" class="tab-pane" role="tabpanel" aria-labelledby="register-tab">
          <Registration-form v-if="!$store.state.user && showRegistration" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '~/components/LoginForm'
import RegistrationForm from '~/components/RegistrationForm'

export default {
  components: {
    LoginForm,
    RegistrationForm
  },
  data() {
    return {
      showRegistration: false
    }
  }
}
</script>
