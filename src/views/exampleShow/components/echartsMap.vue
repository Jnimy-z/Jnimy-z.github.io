<template>
  <div class="cheartsMap" v-loading="loading">
    <div id="cheartsMap_main" class="cheartsMap_main" />
    <!-- <el-button @click="goBack" type="primary" class="cheartsMap_btn" v-if="mapCode !== '130000'" size="mini">返回
    </el-button> -->
  </div>
</template>

<script setup>
import echarts from '@/utils/echarts';
// import moment from "moment";
// import request from '@/utils/request.js';
// import axios from 'axios';
import { ref, onMounted, shallowRef } from 'vue';
import axios from 'axios';
// props: {
//   searchFromBottom: {
//     type: Object
//   }
// },

const mapArea = ref('province');
const cityName = ref('四川');
const mapCode = ref('130000');
const loading = ref(false);
const searchForm = ref({
  startTime: '',
  endTime: '',
  type: '1',
});
const cityMap = ref({
  唐山市: '130200',
  秦皇岛市: '130300',
  邯郸市: '130400',
  邢台市: '130500',
  保定市: '130600',
  张家口市: '130700',
  承德市: '130800',
  沧州市: '130900',
  廊坊市: '131000',
  衡水市: '131100',
});
const cityDataList = ref([]); //所有城市数据列表
const countiesDataList = ref([]); // 所有县区数据列表
const MyChart = shallowRef(null);

onMounted(() => {
  init();
});

//初始化
const init = async function () {
  MyChart.value = echarts.init(document.getElementById('cheartsMap_main'));
  const option = {
    title: {
      text: '申请地域分布',
      top: 10,
      left: 20,
    },
    series: [
      {
        type: 'map',
        geoIndex: 0,
        data: [], // 添加图表显示的数据
      },
    ],
    geo: {
      type: 'map',
      map: '四川省',
      id: 'map',
      universalTransition: {
        enabled: true,
        divideShape: 'clone', // 关键：启用形状分割动画
        delay: 1000,
      },
      animationDuration: 800,
      animationEasing: 'cubicOut',
      animationDurationUpdate: 800,
      animationEasingUpdate: 'cubicOut',
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
      zoom: 1, // 当前视角的缩放比例
      roam: false, // 是否开启拖拽或缩放
      scaleLimit: {
        // 滚轮缩放的极限控制
        min: 1,
        max: 2.5,
      },
      center: [103.82, 30.59],
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
  // 获取矢量地图数据
  let data = await getJson();
  loading.value = false;
  if (data.status === 200) {
    let dataList = [];
    data.data.features.map((item) => {
      let params = {
        name: item.properties.name,
        adcode: item.properties.adcode,
      };
      dataList.push(params);
    });
    echarts.registerMap(cityName.value, data.data);
    option.geo.map = cityName.value;
    option.series[0].data = dataList;
    // MyChart.value.clear();
    MyChart.value.setOption(option);
    window.addEventListener('resize', function () {
      MyChart.value.resize();
    });
    MyChart.value.on('click', async (params) => {
      option.geo.center = [104.06, 30.67]; // 成都中心经纬度
      // option.geo.zoom = 1; // 成都缩放比例
      option.series[0].data = dataList;
      option.geo.zoom = 4;
      MyChart.value.setOption(option, false);

      setTimeout(async () => {
        //地图下钻
        // if (cityMap.value[params.name]) {
        mapArea.value = 'city';
        cityName.value = params.name;
        // mapCode.value = cityMap.value[params.name];
        // 获取矢量地图数据
        let data = await getJson('chengdu');
        loading.value = false;
        if (data.status === 200) {
          let dataList = [];
          data.data.features.map((item) => {
            let params = {
              name: item.properties.name,
              adcode: item.properties.adcode,
            };
            dataList.push(params);
          });
          echarts.registerMap(cityName.value, data.data);
          option.geo.map = cityName.value;
          option.geo.center = [104.06, 30.67]; // 成都中心经纬度
          option.geo.zoom = 1; // 成都缩放比例
          option.series[0].data = dataList;
          MyChart.value.setOption(option, false);
          window.addEventListener('resize', function () {
            MyChart.value.resize();
          });
        }
        // }
      }, 1000);
    });
  }
};

// 返回上一级地图
const goBack = function () {
  mapArea.value = 'province';
  cityName.value = '四川省';
  mapCode.value = '510000';
  init();
};
// 获取地图JSON
const getJson = function (name) {
  loading.value = true;
  let code = name || 'sichuan';
  return axios.get(`/jsondata/${code}.json`);
};

// watch: {
//   searchFromBottom: {
//     handler(newVal) {
//       console.log(newVal, 'watch')
//     },
//     immediate: true,
//     deep: true
//   }
// }
</script>

<style scoped lang="less">
.cheartsMap {
  width: 100%;
  height: 100%;
  position: relative;

  .cheartsMap_main {
    width: 100%;
    height: 100%;
  }

  .cheartsMap_btn {
    position: absolute;
    top: 20px;
    right: 30px;
    line-height: 16px;
  }
}
</style>

