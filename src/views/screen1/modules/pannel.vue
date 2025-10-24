<template>
  <div class="pannel-content">
    <div class="pannel">
      <CustomChart :config="guageConfig1" :grid="grid"></CustomChart>
    </div>
    <div class="pannel">
      <CustomChart :config="guageConfig2" :grid="grid"></CustomChart>
    </div>
  </div>
</template>
  <script>
import { computed } from 'vue';
import CustomChart from '@/components/charts/CustomChart.vue';
export default {
  components: {
    CustomChart,
  },
  data() {
    return {
      leftCount: 168,
      rightCount: 168,
      maxCount: 500,
      grid: {
        show: false,
        borderColor: '#0e273c',
        borderWidth: 3,
        top: '94px',
        left: '22px',
        right: '28px',
        bottom: '54px',
        containLabel: true,
      },
    };
  },
  computed: {
    guageConfig1() {
      return {
        series: [
          {
            type: 'gauge',
            radius: '82',
            startAngle: '200',
            endAngle: '-20',
            pointer: {
              show: false,
            },
            title: {
              show: true,
              offsetCenter: [0, '50%'],
              color: '#00d9fb',
            },
            min: 0,
            max: this.maxCount,
            detail: {
              show: true,
              offsetCenter: [0, 0],
              color: '#00d9fb',
              formatter: function (params) {
                return params;
              },
            },
            data: [
              {
                name: '条件共享',
                value: 168,
              },
            ],
            axisLine: {
              show: true,
              lineStyle: {
                color: [
                  [this.leftCount / this.maxCount, '#49cdaf'],
                  [1, '#0f122d'],
                ],
                width: 30,
                opacity: 1,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              align: 'center',
              color: '#00d9fb',
              distance: -10,
              fontSize: 12,
              formatter: (v) => {
                switch (v) {
                  case 0:
                    return 0;
                  case this.maxCount:
                    return this.maxCount;
                }
                // return v
              },
            },
          },
        ],
      };
    },
    guageConfig2() {
      return {
        series: [
          {
            type: 'gauge',
            radius: '82',
            startAngle: '200',
            endAngle: '-20',
            pointer: {
              show: false,
            },
            title: {
              show: true,
              offsetCenter: [0, '50%'],
              color: '#00d9fb',
            },
            detail: {
              show: true,
              offsetCenter: [0, 0],
              color: '#00d9fb',
              formatter: function (params) {
                return params;
              },
            },
            min: 0,
            max: this.maxCount,
            data: [
              {
                name: '条件共享',
                value: 168,
              },
            ],
            axisLine: {
              show: true,
              lineStyle: {
                color: [
                  [this.rightCount / this.maxCount, '#1e82ff'],
                  [1, '#0f122d'],
                ],
                width: 30,
                shadowColor: '#2f40d8',
                shadowBlur: 2,
                opacity: 1,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              distance: -10,
              fontSize: 12,
              color: '#00d9fb',
              formatter: (v) => {
                switch (v) {
                  case 0:
                    return 0;
                  case this.maxCount:
                    return this.maxCount;
                }
                // return v
              },
            },
          },
        ],
      };
    },
  },
};
</script>
  <style lang="less" scoped>
.pannel-content {
  display: flex;
  width: 100%;
  height: 100%;
  .pannel {
    width: 50%;
    height: 100%;
  }
}
</style>