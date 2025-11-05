<template>
  <mapCharts
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
import mapCharts from './mapCharts.vue';

const props = defineProps({
  grid: {
    type: Object,
    default: () => ({}),
  },
  // y轴数据
  yAxisData: {
    type: [Object, Array],
    default: null,
  },
  // X轴数据
  xAxisData: {
    type: [Object, Array],
    default: null,
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
    default: '100%',
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
  tooltip: {
    type: Object,
    default: () => ({
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    }),
  },
  isMap: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['chart-click']);

const chartRef = ref(null);

// 合并配置
const mergedOption = computed(() => {
  const baseOption = {
    tooltip: props.tooltip,
    grid: props.grid,
    series: [
      {
        type: 'bar',
      },
    ],
  };
  props.xAxisData && (baseOption['xAxis'] = props.xAxisData)
  props.yAxisData && (baseOption['yAxis'] = props.yAxisData)
  let opt = { ...baseOption, ...props.config };
  console.log(props.data, opt);
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