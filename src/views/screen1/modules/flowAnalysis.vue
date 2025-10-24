<template>
  <div class="center-box">
    <div class="today-content">
      <div
        class="today-box"
        v-for="(item, index) in flowData"
        :key="'flow' + index"
      >
        <SvgIcon name="flow-bg"></SvgIcon>
        <div class="title">{{ item.title }}</div>
        <div class="number">{{ item.number }}人次</div>
      </div>
    </div>
    <div class="line-flow-content">
      <CustomChart
        :yAxisData="yAxisLineData"
        :xAxisData="xAxisLineData"
        :config="lineConfig"
        :grid="lineGrid"
      ></CustomChart>
    </div>
  </div>
  <div class="bottom-box">
    <myBorder title="客流量分析">
      <template #content>
        <CustomChart
          :yAxisData="yAxisData"
          :xAxisData="xAxisData"
          :config="barConfig"
          :grid="barGrid"
        ></CustomChart>
      </template>
    </myBorder>
  </div>
</template>
<script>
import { computed } from 'vue';
import myBorder from '../components/myBorder.vue';
import CustomChart from '@/components/charts/CustomChart.vue';
export default {
  components: {
    myBorder,
    CustomChart,
  },
  data() {
    return {
      flowData: new Array(3).fill({
        title: '今日客流量',
        number: '6,5600',
      }),
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
      yAxisLineData: {
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
          show: true,
          lineStyle: {
            color: '#6076ad',
            width: 2,
          },
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
      lineGrid: {
        top: '69px',
        left: '0',
        right: '0',
        bottom: '0',
        containLabel: true,
      },
      barData: new Array(5).fill({
        name: '流量',
        value: 25,
      }),
      lineData: new Array(12).fill(0).map((item, index) => ({
        name: index + '月',
        value: parseInt(Math.random() * 500, 10),
      })),
      lineData2: new Array(12).fill(0).map((item, index) => ({
        name: index + '月',
        value: parseInt(Math.random() * 500, 10),
      }))
    };
  },
  computed: {
    xAxisLineData() {
      return [
        {
          type: 'category',
          data: this.lineData.map((item) => ({
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
    lineConfig() {
      return {
        series: [
          {
            type: 'line',
            data: this.lineData,
            itemStyle: {
              color: '#02cbeb',
            },
            label: {
              show: false,
            },
            showSymbol: false,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#0da5bd',
                  },
                  {
                    offset: 1,
                    color: '#0da5bd00',
                  },
                ],
              },
            },
            z: 1,
          },
          {
            type: 'line',
            data: this.lineData2,
            itemStyle: {
              color: '#0053fb',
            },
            label: {
              show: false,
            },
            showSymbol: false,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#0053fb',
                  },
                  {
                    offset: 1,
                    color: '#0053fb00',
                  },
                ],
              },
            },
            z: 1,
          }
        ],
      };
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
};
</script>
<style lang="less" scoped>
.center-box {
  display: flex;
  flex-flow: column;
  flex: 1;
  padding: 6.7rem 9rem 3.7rem 8.4rem;
  .today-content {
    display: flex;
    justify-content: space-between;
    padding: 0 2.2rem;
    .today-box {
      position: relative;
      width: 22.2rem;
      height: 11.3rem;
      padding: 2.7rem 0 1.7rem;
      .svg-icon {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .title {
        position: relative;
        height: 2.3rem;
        font-family: 'cus-regular-new';
        font-size: 2.3rem;
        color: #00d9fb;
        z-index: 22;
        margin-bottom: 15px;
      }
      .number {
        position: relative;
        font-size: 3rem;
        color: #00d9fb;
        z-index: 22;
      }
    }
  }
  .line-flow-content {
    flex: 1;
    width: 100%;
  }
}
.bottom-box {
  width: 100%;
  height: 32%;
}
</style>