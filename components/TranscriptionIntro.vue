<template>
  <div class="mb-4 row">
    <div class="col-md-10 col-8">
      {{ $t('main.work_area.intro_line_1') }}
      {{ $t('main.work_area.intro_line_2') }}
    </div>
    <div class="video_tut col-md-2 col-4">
      <a
        :href="$t('main.work_area.video')"
        :title="$t('main.work_area.video_hover')"
        target="_blank"
      >
        <img src="/images/video_thumb.png" />
        {{ $t('main.work_area.video_hover') }}
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.video_tut {
  a {
    img {
      width: 100%;
      border: 1px solid black;
    }
  }
}
</style>
