<template>
  <div class="container">
    <div class="tabContentTitle">{{ $t('pages.about.htr.what_is_htr') }}</div>
    <p v-html="$t('pages.about.htr.p_1')"></p>
    <p v-html="$t('pages.about.htr.p_2')"></p>

    <div class="tabContentTitle mt-5" v-html="$t('pages.about.htr.crowd_title')"></div>
    <p v-html="$t('pages.about.htr.crowd_content')"></p>
  </div>
</template>
<style>
.tabContentTitle {
  text-decoration: underline;
  font-weight: bold;
  font-size: 18px;
}
</style>
