<template>
  <div ref="chartContainer" class="lw-chart" />
</template>

<script lang="ts" setup>
import {
  createChart,
  type CandlestickData,
  type CandlestickSeriesOptions,
  type ChartOptions,
  type IChartApi,
  type ISeriesApi,
} from "lightweight-charts";
import type { PropType } from "vue";

const props = defineProps({
  data: {
    type: Array as PropType<CandlestickData[]>,
    required: true,
  },
  chartOptions: {
    type: Object as PropType<Partial<ChartOptions>>,
    default: () => ({}),
  },
  seriesOptions: {
    type: Object as PropType<Partial<CandlestickSeriesOptions>>,
    default: () => ({}),
  },
  autosize: {
    default: true,
    type: Boolean,
  },
});

type Props = typeof props;

let chart: IChartApi | null = null as unknown as IChartApi;
let series: ISeriesApi<"Candlestick"> | null =
  null as unknown as ISeriesApi<"Candlestick">;
const chartContainer = ref();

// Creates the chart series and sets the data.
const addSeriesAndData = (props: Props) => {
  if (!chart) {
    return;
  }
  series = chart.addCandlestickSeries(props.seriesOptions);
  series.setData(props.data);
};

// Auto resizes the chart when the browser window is resized.
const resizeHandler = () => {
  if (!chart || !chartContainer.value) return;
  const dimensions = chartContainer.value.getBoundingClientRect();
  chart.resize(dimensions.width, dimensions.height);
};

onMounted(() => {
  // Create the Lightweight Charts Instance using the container ref.
  chart = createChart(chartContainer.value, props.chartOptions);
  addSeriesAndData(props);

  chart.timeScale().fitContent();

  if (props.autosize) {
    window.addEventListener("resize", resizeHandler);
  }
});

onUnmounted(() => {
  if (chart) {
    chart.remove();
    chart = null;
  }

  if (series) {
    series = null;
  }
  window.removeEventListener("resize", resizeHandler);
});

const fitContent = () => {
  if (!chart) {
    return;
  }
  chart.timeScale().fitContent();
};

// Expose the chart instance via a method
const getChart = () => chart;

defineExpose({ fitContent, getChart });

watch(
  () => props.autosize,
  (enabled) => {
    if (!enabled) {
      window.removeEventListener("resize", resizeHandler);
      return;
    }
    window.addEventListener("resize", resizeHandler);
  }
);

watch(
  () => props.data,
  (newData) => {
    if (!series) return;
    series.setData(newData);
  }
);

watch(
  () => props.chartOptions,
  (newOptions) => {
    if (!chart) return;
    chart.applyOptions(newOptions);
  }
);

watch(
  () => props.seriesOptions,
  (newOptions) => {
    if (!series) return;
    series.applyOptions(newOptions);
  }
);
</script>
<style scoped>
.lw-chart {
  height: 100%;
}
</style>
