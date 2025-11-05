<template>
  <div class="map-charts">
    <CustomChart_map
      :yAxisData="yAxisData"
      :xAxisData="xAxisData"
      :config="barConfig"
      :grid="barGrid"
      width="70%"
      height="70%"
      :geo="geoConfig"
    ></CustomChart_map>
  </div>
</template>
<script>
import CustomChart_map from '@/components/charts/CustomChart_map.vue';
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
export default {
  components: {
    CustomChart_map,
  },
  data() {
    return {
      yAxisData: {
        type: 'value',
        max: this.maxCount,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#1d2b4a',
            width: 2,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: '#00d9fb',
          fontSize: 18,
          fontFamily: 'cus-regular-new',
          margin: 8,
        },
        axisLine: {
          show: false,
        },
      },
      maxCount: 80,
      barGrid: {
        top: '31px',
        left: '43px',
        right: '63px',
        bottom: '20px',
        containLabel: true,
      },
      barData: new Array(5).fill({
        name: '流量',
        value: 25,
      }),
    };
  },
  computed: {
    xAxisData() {
      return [
        {
          type: 'category',
          data: this.barData.map((item) => ({
            value: item.name,
            textStyle: {
              align: 'center',
              color: '#00f2f1',
              fontSize: 18,
              fontFamily: 'cus-regular-new',
            },
          })),
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            inside: false,
            align: 'center',
            margin: 12,
            lineStyle: {
              color: '#6076ad',
              width: 2,
            },
          },
        },
      ];
    },
    barConfig() {
      return {
        series: [
          {
            type: 'bar',
            data: this.barData,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#67e0e3',
                  },
                  {
                    offset: 1,
                    color: '#0282de',
                  },
                ],
              },
            },
            barWidth: '28%',
            barMaxWidth: '45',
            label: {
              show: true,
              color: '#00d9fb',
              fontSize: 18,
              fontFamily: 'cus-regular-new',
              position: 'top',
              distance: 14,
            },
            z: 1,
          },
        ],
      };
    },
  },
  setup() {
    onMounted(() => {
      {
        let router = useRouter();
        nextTick(() => {
          console.log(router.currentRoute.value);
        });
      }
    });
  },
};
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