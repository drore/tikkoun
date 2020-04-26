<template>
  <a
    :href="localePath({ name: 'transcribe-manuscript-page-line', params: { manuscript:manuscript.name }})"
  >
    <div class="manuscript-thumb-wrapper">
      <div class="label">
        <span class="ms_name">{{manuscript.display_name}}</span>
      </div>
      <div
        class="manuscript-thumb"
        :style="`background-image:url(/manuscripts/${manuscript.name}.png)`"
      >
        <div class="total">
          <div
            class="done"
            :style="`width:${Math.min(getManuscriptDonePercentage(manuscript),100)}%`"
          >{{getManuscriptDonePercentage(manuscript)}}%</div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: ['manuscript'],
  methods: {
    getManuscriptDonePercentage(manuscript) {
      let percentage = 0

      if (manuscript.doneLines) {
        percentage =
          (manuscript.doneLines.transcription / manuscript.total_lines) * 100
      }

      return percentage.toFixed(2)
    }
  }
}
</script>

<style lang="scss">
.manuscript-thumb-wrapper {
  padding: 0.5rem;
  text-align: center;
}
.manuscript-thumb {
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  filter: grayscale(100%);
  border: 0.1rem solid #888;
  padding: 0.5rem;
  height: 13rem;
  width: 9rem;
  overflow: hidden;
  text-align: center;
  &:hover {
    filter: grayscale(0%);
  }
  .label {
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0.5rem;
    font-size: 1.2rem;
  }
  .done {
    background-color: green;
    color: white;
  }
}
</style>
