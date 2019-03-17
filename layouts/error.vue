<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">{{ $t('error.page_not_found') }}</h1>

    <div v-else>
      <h1>An error occurred</h1>
      <h1 v-if="error.statusCode === 500">Server error</h1>
      <div class="details">{{ error.message }}</div>
    </div>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
