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
import request from '@/utils/request.js';
const geoJson = request.get('/jsondata/sichuan.json').data;

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
  geo: {
    type: [Object, Array],
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

const extendsMap = function (id, opt) {
  var curGeoJson = {};
  var cityMap = {
    南昌市: nanchang,
    景德镇市: jingdezhen,
    萍乡市: pingxiang,
    九江市: jiujiang,
    新余市: xinyu,
    鹰潭市: yingtan,
    赣州市: ganzhou,
    吉安市: jian,
    宜春市: yichun,
    抚州市: fuzhou,
    上饶市: shangrao,
  };
  var geoCoordMap = {
    南昌: [115.89, 28.48],
    景德镇: [117.28, 29.09],
    萍乡: [113.93, 27.41],
    九江: [115.97, 29.51],
    新余: [114.81, 27.72],
    鹰潭: [117.12, 28.1],
    赣州: [115.04, 25.67],
    吉安: [115.05, 26.88],
    宜春: [114.41, 28.03],
    抚州: [116.45, 27.79],
    上饶: [117.92, 28.22],
  };
  var levelColorMap = {
    1: 'rgba(241, 109, 115, .8)',
    2: 'rgba(255, 235, 59, .7)',
    3: 'rgba(147, 235, 248, 1)',
  };

  var defaultOpt = {
    mapName: 'china', // 地图展示
    goDown: false, // 是否下钻
    bgColor: '#404a59', // 画布背景色
    activeArea: [], // 区域高亮,同echarts配置项
    data: [],
    // 下钻回调(点击的地图名、实例对象option、实例对象)
    callback: function (name, option, instance) {},
  };
  if (opt) opt = this.util.extend(defaultOpt, opt);

  // 层级索引
  var name = [opt.mapName];
  var idx = 0;
  var pos = {
    leftPlus: 115,
    leftCur: 150,
    left: 198,
    top: 50,
  };

  var line = [
    [0, 0],
    [8, 11],
    [0, 22],
  ];
  // style
  var style = {
    font: '18px "Microsoft YaHei", sans-serif',
    textColor: '#eee',
    lineColor: 'rgba(147, 235, 248, .8)',
  };

  var handleEvents = {
    /**
     * i 实例对象
     * o option
     * n 地图名
     **/
    resetOption: function (i, o, n) {
      var breadcrumb = this.createBreadcrumb(n);

      var j = name.indexOf(n);
      var l = o.graphic.length;
      if (j < 0) {
        o.graphic.push(breadcrumb);
        o.graphic[0].children[0].shape.x2 = 145;
        o.graphic[0].children[1].shape.x2 = 145;
        if (o.graphic.length > 2) {
          for (var x = 0; x < opt.data.length; x++) {
            if (n === opt.data[x].name + '市') {
              o.series[0].data = handleEvents.initSeriesData([opt.data[x]]);
              break;
            } else o.series[0].data = [];
          }
        }
        name.push(n);
        idx++;
      } else {
        o.graphic.splice(j + 2, l);
        if (o.graphic.length <= 2) {
          o.graphic[0].children[0].shape.x2 = 60;
          o.graphic[0].children[1].shape.x2 = 60;
          o.series[0].data = handleEvents.initSeriesData(opt.data);
        }
        name.splice(j + 1, l);
        idx = j;
        pos.leftCur -= pos.leftPlus * (l - j - 1);
      }

      o.geo.map = n;
      o.geo.zoom = 0.4;
      i.clear();
      i.setOption(o);
      this.zoomAnimation();
      opt.callback(n, o, i);
    },

    /**
     * name 地图名
     **/
    createBreadcrumb: function (name) {
      var cityToPinyin = {
        南昌市: 'nanchang',
        景德镇市: 'jingdezhen',
        萍乡市: 'pingxiang',
        九江市: 'jiujiang',
        新余市: 'xinyu',
        鹰潭市: 'yingtan',
        赣州市: 'ganzhou',
        吉安市: 'jian',
        宜春市: 'yichun',
        抚州市: 'fuzhou',
        上饶市: 'shangrao',
      };
      var breadcrumb = {
        type: 'group',
        id: name,
        left: pos.leftCur + pos.leftPlus,
        top: pos.top + 3,
        children: [
          {
            type: 'polyline',
            left: -90,
            top: -5,
            shape: {
              points: line,
            },
            style: {
              stroke: '#fff',
              key: name,
              // lineWidth: 2,
            },
            onclick: function () {
              var name = this.style.key;
              handleEvents.resetOption(chartInstance.value, option, name);
            },
          },
          {
            type: 'text',
            left: -68,
            top: 'middle',
            style: {
              text: name,
              textAlign: 'center',
              fill: style.textColor,
              font: style.font,
            },
            onclick: function () {
              var name = this.style.text;
              handleEvents.resetOption(chartInstance.value, option, name);
            },
          },
          {
            type: 'text',
            left: -68,
            top: 10,
            style: {
              name: name,
              text: cityToPinyin[name] ? cityToPinyin[name].toUpperCase() : '',
              textAlign: 'center',
              fill: style.textColor,
              font: '12px "Microsoft YaHei", sans-serif',
            },
            onclick: function () {
              // console.log(this.style);
              var name = this.style.name;
              handleEvents.resetOption(chartInstance.value, option, name);
            },
          },
        ],
      };

      pos.leftCur += pos.leftPlus;

      return breadcrumb;
    },

    // 设置effectscatter
    initSeriesData: function (data) {
      var temp = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          temp.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value, data[i].level),
          });
        }
      }
      return temp;
    },

    zoomAnimation: function () {
      var count = null;
      var zoom = function (per) {
        if (!count) count = per;
        count = count + per;
        // console.log(per,count);
        chartInstance.value.setOption({
          geo: {
            zoom: count,
          },
        });
        if (count < 1)
          window.requestAnimationFrame(function () {
            zoom(0.2);
          });
      };
      window.requestAnimationFrame(function () {
        zoom(0.2);
      });
    },
  };

  var option = {
    backgroundColor: opt.bgColor,
    graphic: [
      {
        type: 'group',
        left: pos.left,
        top: pos.top - 4,
        children: [
          {
            type: 'line',
            left: 0,
            top: -20,
            shape: {
              x1: 0,
              y1: 0,
              x2: 60,
              y2: 0,
            },
            style: {
              stroke: style.lineColor,
            },
          },
          {
            type: 'line',
            left: 0,
            top: 20,
            shape: {
              x1: 0,
              y1: 0,
              x2: 60,
              y2: 0,
            },
            style: {
              stroke: style.lineColor,
            },
          },
        ],
      },
      {
        id: name[idx],
        type: 'group',
        left: pos.left + 2,
        top: pos.top,
        children: [
          {
            type: 'polyline',
            left: 90,
            top: -12,
            shape: {
              points: line,
            },
            style: {
              stroke: 'transparent',
              key: name[0],
            },
            onclick: function () {
              var name = this.style.key;
              handleEvents.resetOption(chartInstance.value, option, name);
            },
          },
          {
            type: 'text',
            left: 0,
            top: 'middle',
            style: {
              text: name[0] === '江西' ? '江西省' : name[0],
              textAlign: 'center',
              fill: style.textColor,
              font: style.font,
            },
            onclick: function () {
              handleEvents.resetOption(chartInstance.value, option, '江西');
            },
          },
          {
            type: 'text',
            left: 0,
            top: 10,
            style: {
              text: 'JIANGXI',
              textAlign: 'center',
              fill: style.textColor,
              font: '12px "Microsoft YaHei", sans-serif',
            },
            onclick: function () {
              handleEvents.resetOption(chartInstance.value, option, '江西');
            },
          },
        ],
      },
    ],
    geo: {
      map: opt.mapName,
      // roam: true,
      zoom: 1,
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        emphasis: {
          textStyle: {
            color: '#fff',
          },
        },
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(147, 235, 248, 1)',
          borderWidth: 1,
          areaColor: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(147, 235, 248, 0)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(147, 235, 248, .2)', // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
          shadowColor: 'rgba(128, 217, 248, 1)',
          // shadowColor: 'rgba(255, 255, 255, 1)',
          shadowOffsetX: -2,
          shadowOffsetY: 2,
          shadowBlur: 10,
        },
        emphasis: {
          areaColor: '#389BB7',
          borderWidth: 0,
        },
      },
      regions: opt.activeArea.map(function (item) {
        if (typeof item !== 'string') {
          return {
            name: item.name,
            itemStyle: {
              normal: {
                areaColor: item.areaColor || '#389BB7',
              },
            },
            label: {
              normal: {
                show: item.showLabel,
                textStyle: {
                  color: '#fff',
                },
              },
            },
          };
        } else {
          return {
            name: item,
            itemStyle: {
              normal: {
                borderColor: '#91e6ff',
                areaColor: '#389BB7',
              },
            },
          };
        }
      }),
    },
    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        // symbol: 'diamond',
        showEffectOn: 'render',
        rippleEffect: {
          period: 15,
          scale: 6,
          brushType: 'fill',
        },
        hoverAnimation: true,
        itemStyle: {
          normal: {
            color: function (params) {
              return levelColorMap[params.value[3]];
            },
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
        data: handleEvents.initSeriesData(opt.data),
      },
    ],
  };

  chartInstance.value.setOption(option);
  // 添加事件
  chartInstance.value.on('click', function (params) {
    var _self = this;
    if (opt.goDown && params.name !== name[idx]) {
      if (cityMap[params.name]) {
        var url = cityMap[params.name];
        $.get(url, function (response) {
          // console.log(response);
          curGeoJson = response;
          echarts.registerMap(params.name, response);
          handleEvents.resetOption(_self, option, params.name);
        });
      }
    }
  });

  chartInstance.value.setMap = function (mapName) {
    var _self = this;
    if (mapName.indexOf('市') < 0) mapName = mapName + '市';
    var citySource = cityMap[mapName];
    if (citySource) {
      var url = './map/' + citySource + '.json';
      $.get(url, function (response) {
        // console.log(response);
        curGeoJson = response;
        echarts.registerMap(mapName, response);
        handleEvents.resetOption(_self, option, mapName);
      });
    }
    // handleEvents.resetOption(this, option, mapName);
  };

  return chartInstance.value;
};

// 初始化图表
const initChart = async () => {
  try {
    if (!chartContainer.value) return;

    // 销毁旧实例
    if (chartInstance.value) {
      chartInstance.value.dispose();
    }

    echarts.registerMap('四川', geoJson);

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