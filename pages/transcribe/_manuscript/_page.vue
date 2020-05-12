<template>
  <div>
    <div class="link-to-new-site">
      אנחנו עובדים על הדור הבא של תיקון ומעוניינים בחוות דעתכם -
      <a
        href="javascript:;"
        @click="goToNewInterface"
      >קחו אותי לממשק החדש</a>
    </div>
    <nuxt-child />
  </div>
</template>
<script>
export default {
  methods: {
    //
    goToNewInterface() {
      // Add marker in local storage
      localStorage.setItem("new_interface", true)
      window.location.replace('https://tikkoun-demo.web.app')
      return false
    }
  }
}
</script>
<style scoped lang="scss">
.link-to-new-site {
  padding: 10px;
  background-color: #efefef;
  a {
    color: white;
    background-color: navy;
    padding: 5px;
    border: 1px solid #333;
  }
}
</style>