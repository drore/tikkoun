<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['chartdata', 'options'],
  data() {
    return {
      vue_chartjs_loaded: false
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>
</style>