<template>
  <div
    ref="chartContainer"
    :class="['base-chart', className]"
    :style="{ width: containerWidth, height: containerHeight }"
  >
    <div v-if="loading" class="chart-loading">
      <slot name="loading">加载中...</slot>
    </div>
    <div v-else-if="error" class="chart-error">
      <slot name="error">
        <span class="error-text">{{ error }}</span>
        <button @click="initChart" class="retry-btn">重试</button>
      </slot>
    </div>
  </div>
</template>
  
  <script setup>
import {
  ref,
  shallowRef,
  onMounted,
  onUnmounted,
  watch,
  nextTick,
  computed,
} from 'vue';
// import { loadFont, diagnoseFontIssue } from '../../utils/loadFont';
import echarts, { defaultTheme } from '@/utils/echarts';

const props = defineProps({
  // 图表配置
  option: {
    type: Object,
    required: true,
  },
  // 容器尺寸
  width: {
    type: [String, Number],
    default: '100%',
  },
  height: {
    type: [String, Number],
    default: '100%',
  },
  // 自定义类名
  className: {
    type: String,
    default: '',
  },
  // 主题
  theme: {
    type: [String, Object],
    default: () => defaultTheme,
  },
  // 是否显示加载状态
  loading: {
    type: Boolean,
    default: false,
  },
  // 初始化参数
  initOptions: {
    type: Object,
    default: () => ({
      useCoarsePointer: true, // 使用粗指针，可以改善性能
      pointerSize: 10, // 指针大小
      renderer: 'canvas', // 使用canvas渲染器（性能更好）
    }),
  },
  // 是否启用自动响应式
  autoResize: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['chart-inited', 'chart-click', 'chart-error']);

const chartContainer = ref(null);
const chartInstance = shallowRef(null);
const error = ref(null);

// 处理容器尺寸
const containerWidth = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width
);
const containerHeight = computed(() =>
  typeof props.height === 'number' ? `${props.height}px` : props.height
);

// 初始化图表
const initChart = async () => {
  try {
    if (!chartContainer.value) return;

    // 销毁旧实例
    if (chartInstance.value) {
      chartInstance.value.dispose();
    }

    // 创建新实例
    chartInstance.value = echarts.init(
      chartContainer.value,
      props.theme,
      props.initOptions
    );

    // await loadFont();

    // // 运行诊断
    // diagnoseFontIssue();

    // 设置配置项
    chartInstance.value.setOption(props.option, true);

    // 绑定事件
    chartInstance.value.on('click', (params) => {
      emit('chart-click', params);
    });

    emit('chart-inited', chartInstance.value);
    error.value = null;
  } catch (err) {
    error.value = err.message;
    emit('chart-error', err);
    console.error('图表初始化失败:', err);
  }
};

// 更新图表
const updateChart = () => {
  if (!chartInstance.value) return;

  try {
    chartInstance.value.setOption(props.option, true);
    error.value = null;
  } catch (err) {
    error.value = err.message;
    emit('chart-error', err);
  }
};

// 响应式处理
const handleResize = () => {
  if (chartInstance.value && props.autoResize) {
    chartInstance.value.resize();
  }
};

// 监听窗口变化
let resizeObserver = null;
onMounted(() => {
  nextTick(() => {
    initChart();

    // 使用 ResizeObserver 监听容器尺寸变化
    if (props.autoResize && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(chartContainer.value);
    } else {
      // 降级方案：监听窗口变化
      window.addEventListener('resize', handleResize);
    }
  });
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  } else {
    window.removeEventListener('resize', handleResize);
  }

  if (chartInstance.value) {
    chartInstance.value.dispose();
    chartInstance.value = null;
  }
});

// 监听配置变化
watch(() => props.option, updateChart, { deep: true });
watch(
  () => props.loading,
  (newVal) => {
    if (!newVal && chartInstance.value) {
      handleResize();
    }
  }
);
</script>
  
  <style scoped>
.base-chart {
  position: relative;
}

.chart-loading,
.chart-error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
}

.error-text {
  margin-right: 8px;
}

.retry-btn {
  padding: 4px 8px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.retry-btn:hover {
  background: #66b1ff;
}
</style>