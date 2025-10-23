<template>
  <BaseChart
    ref="chartRef"
    :option="mergedOption"
    :width="width"
    :height="height"
    :theme="theme"
    :loading="loading"
    :auto-resize="autoResize"
    @chart-inited="handleChartInit"
    @chart-click="handleChartClick"
  />
</template>
  
  <script setup>
import { ref, computed } from 'vue';
import BaseChart from './BaseChart.vue';

const props = defineProps({
  // 数据
  data: {
    type: Array,
    default: () => [],
  },
  // X轴数据
  xAxisData: {
    type: Array,
    default: () => [],
  },
  // 配置
  config: {
    type: Object,
    default: () => ({}),
  },
  width: {
    type: [String, Number],
    default: '100%',
  },
  height: {
    type: [String, Number],
    default: '400px',
  },
  theme: {
    type: [String, Object],
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['chart-click']);

const chartRef = ref(null);

// 合并配置
const mergedOption = computed(() => {
  const baseOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    dataZoom: [
      {
        type: 'inside',
        // 禁用滚轮缩放
        zoomOnMouseWheel: false,
        // 或者完全禁用dataZoom
        disabled: true,
      },
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: props.xAxisData,
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: props.data.map((series) => ({
      type: 'bar',
      ...series,
    })),
  };
  let opt = { ...baseOption, ...props.config }
  console.log(props.data, opt)
  return { ...baseOption, ...props.config };
});

const handleChartInit = (chartInstance) => {
  // 可以在这里进行额外的图表初始化
};

const handleChartClick = (params) => {
  emit('chart-click', params);
};

// 暴露方法给父组件
defineExpose({
  getInstance: () => chartRef.value?.chartInstance,
  resize: () => chartRef.value?.handleResize(),
});
</script>