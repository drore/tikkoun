<template>
  <div>
    <div class="form-group row">
      <!-- E-mail -->
      <label class="col-sm-2 col-form-label" for="email">{{$t('register_screen.email')}}</label>
      <div class="col-sm-10">
        <input type="text" id="email" name="email" placeholder class="input-xlarge" v-model="email">
        <p class="help-block">Please provide your E-mail</p>
      </div>
    </div>

    <div class="form-group row">
      <!-- Password-->
      <label class="col-sm-2 col-form-label" for="password">{{$t('register_screen.password')}}</label>
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
    <div class="custom-control custom-checkbox">
      <input
        type="checkbox"
        class="custom-control-input"
        id="showExtraDetails"
        v-model="showExtraDetails"
      >
      <label
        class="custom-control-label"
        for="showExtraDetails"
      >{{$t('register_screen.show_extra_details')}}</label>
    </div>
    <div class="extra-details">
      <div class="form-group row">
        <!-- Password-->
        <label class="col-sm-2 col-form-label" for="hebrew">{{$t('register_screen.hebrew')}}</label>
        <div class="col-sm-10">
          <span style="white-space:nowrap">{{$t('register_screen.none_hebrew')}}</span>
          <input
            type="range"
            class="custom-range"
            min="1"
            max="5"
            step="1"
            id="hebrew"
            v-model="hebrew"
            :disabled="!showExtraDetails"
            style="width:50%"
          >
          <span style="white-space:nowrap">{{$t('register_screen.knowledgable_hebrew')}}</span>
        </div>
      </div>
      <div class="form-group row">
        <!-- Password-->
        <label class="col-sm-2 col-form-label" for="midrash">{{$t('register_screen.midrash')}}</label>
        <div class="col-sm-10">
          <span style="white-space:nowrap">{{$t('register_screen.none_midrash')}}</span>
          <input
            type="range"
            class="custom-range"
            min="1"
            max="5"
            step="1"
            id="midrash"
            v-model="midrash"
            style="width:50%"
            :disabled="!showExtraDetails"
          >
          <span style="white-space:nowrap">{{$t('register_screen.knowledgable_midrash')}}</span>
        </div>
      </div>
    </div>
    <div class="custom-control custom-checkbox">
      <input
        type="checkbox"
        class="custom-control-input"
        id="contactByEmail"
        v-model="contactByEmail"
      >
      <label class="custom-control-label" for="contactByEmail">{{$t('register_screen.contact')}}</label>
    </div>

    <div class="form-group row">
      <!-- Button -->
      <div class="col-sm-10">
        <button class="btn btn-success mt-5" @click="register">{{$t('login.login_area.register')}}</button>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      hebrew: 3,
      midrash: 3,
      showExtraDetails: false,
      contactByEmail: false
    }
  },
  methods: {
    showLogin(section) {
      this.$store.dispatch('auth/loginShowSection', 'login')
    },
    register() {
      const registerationParams = {
        email: this.email,
        password: this.password
      }

      this.$store
        .dispatch('auth/createUserWithEmailAndPassword', registerationParams)
        .then(res => {
          let obj = {
            isAnonymous: res.user.isAnonymous,
            displayName: res.user.displayName,
            contactByEmail: this.contactByEmail,
            isNewUser: res.additionalUserInfo.isNewUser,
            transcribe_mode:'normal',
            uid: res.user.uid
          }

          if (this.showExtraDetails) {
            obj.midrash = this.midrash
            obj.hebrew = this.hebrew
          }

          // Now, update the user with the rest of the details
          this.$store.dispatch('auth/updateUser', obj).then(res =>{
            window.location.reload()
          })

        })
        .catch(e => {
          console.log(e.message)
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

<style lang="scss">
.extra-details {
  input {
    &[type='range'] {
      vertical-align: -6px;
    }
  }
}
</style>
