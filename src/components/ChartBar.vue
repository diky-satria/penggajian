<script>
import { defineComponent } from 'vue'
import { Bar } from 'vue3-chart-v2'

export default defineComponent({
  extends: Bar,
  props: {
    chartDataBar: {
      type: Object,
      required: true
    },
    chartOptionsBar: {
      type: Object,
      required: false
    },
  },
  mounted () {
    this.renderChart(this.chartDataBar, this.chartOptionsBar)
  }
})
</script>