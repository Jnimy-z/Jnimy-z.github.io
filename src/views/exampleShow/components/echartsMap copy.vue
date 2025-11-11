<template>
  <div class="map-charts">
    <CustomChart_map
      :config="geoConfig"
      :grid="barGrid"
      width="70%"
      height="70%"
      ref="mapCharts"
      :geoData="geoData"
    ></CustomChart_map>
    <!-- :geo="geoConfig" -->
  </div>
</template>
<script setup>
import CustomChart_map from '@/components/charts/CustomChart_map.vue';
import { ref, onMounted, nextTick, computed } from 'vue';
import request from '@/utils/request.js';

const geoConfig = computed(() => {
  return {
    title: {
      text: '申请地域分布',
      top: 10,
      left: 20,
    },
    series: [
      {
        type: 'map',
        geoIndex: 0,
        data: dataList, // 添加图表显示的数据
      },
    ],
    geo: {
      type: 'map',
      map: '四川省',
      label: {
        normal: {
          show: true,
          color: '#fff',
        },
        emphasis: {
          show: true,
          color: '#fff',
        },
      },
      zoom: 1.1, // 当前视角的缩放比例
      roam: false, // 是否开启拖拽或缩放
      scaleLimit: {
        // 滚轮缩放的极限控制
        min: 1,
        max: 2.5,
      },
      itemStyle: {
        normal: {
          areaColor: '#00136A',
          borderColor: '#00f0fa',
          borderWidth: 1, //设置外层边框
          shadowBlur: 5,
          shadowOffsetY: 8,
          shadowOffsetX: 0,
          shadowColor: '#01012a',
        },
        emphasis: {
          areaColor: '#F9C723',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 5,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    tooltip: {
      appendToBody: true,
      trigger: 'item', // 触发条件
      confine: true,
      alwaysShowContent: false,
      backgroundColor: 'RGBA(136, 123, 135, 0.8)',
      formatter: function (params) {
        //点击进入下级城市的点击事件可以写在这个div里
        return (
          `<div class='pop-up'>
                          <p style="margin:0;">地区：` +
          params.name +
          `</p>
                          <p style="margin:0;">申请数量：` +
          params.data.count +
          `次</p>
                     </div>`
        );
      },
      textStyle: {
        color: '#ffffff',
      },
    },
  };
});
const barGrid = ref({
  top: '31px',
  left: '43px',
  right: '63px',
  bottom: '20px',
  containLabel: true,
});
const dataList = ref([]);
const mapCharts = ref(null);
const geoData = ref({});
onMounted(() => {
  {
    nextTick(async () => {
      const geoJson = await request.get('/jsondata/sichuan.json');
      if (geoJson.status === 200) {
        geoData.value = geoJson.data;
        geoData.value.features.map((item) => {
          let params = {
            name: item.properties.name,
            adcode: item.properties.adcode,
          };
          dataList.value.push(params);
        });
        console.log('1111');
        mapCharts.value.initChart();
      }
    });
  }
});
</script>

<style lang="less" scoped>
.map-charts {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>