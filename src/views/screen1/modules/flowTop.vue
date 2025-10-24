<template>
  <CustomChart
    :yAxisData="yAxisData"
    :xAxisData="xAxisData"
    :config="barConfig"
    :grid="grid"
  ></CustomChart>
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
      xAxisData: {
        name: '单位（万人次）',
        nameTextStyle: {
          color: '#00f2f1',
          fontSize: 18,
          fontFamily: 'cus-regular-new',
          padding: [0, -250, 0, 0],
        },
        nameLocation: 'center',
        nameGap: -400,
        max: this.maxCount,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#0e273c',
            width: 2,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: '#00f2f1',
          fontSize: 18,
          fontFamily: 'cus-regular-new',
          margin: 31,
        },
        axisLine: {
          show: false,
        },
      },
      maxCount: 80,
      grid: {
        show: true,
        borderColor: '#0e273c',
        borderWidth: 3,
        top: '94px',
        left: '22px',
        right: '28px',
        bottom: '54px',
        containLabel: true,
      },
      barData: [
        {
          name: '流量',
          value: 25,
        },
        {
          name: '流量',
          value: 80,
        },
        {
          name: '流量',
          value: 30,
        },
        {
          name: '流量',
          value: 30,
        },
        {
          name: '流量',
          value: 30,
        },
        {
          name: '流量',
          value: 25,
        },
        {
          name: '流量',
          value: 80,
        },
        {
          name: '流量',
          value: 30,
        },
      ],
    };
  },
  computed: {
    yAxisData() {
      return [
        {
          type: 'category',
          data: this.barData.map((item) => ({
            value: item.name,
            textStyle: {
              align: 'left',
              color: '#00f2f1',
              fontSize: 18,
              fontFamily: 'cus-regular-new',
            },
          })),
          splitLine: {
            show: true,
            lineStyle: {
              color: '#0e273c',
              width: 2,
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            inside: false,
            align: 'left',
            margin: 52,
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
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#51cce2',
                  },
                  {
                    offset: 1,
                    color: '#ab59ff',
                  },
                ],
              },
            },
            barWidth: '44%',
            label: {
              show: false,
            },
            z: 1,
          },
          {
            type: 'bar',
            barWidth: '50%',
            barGap: '-100%',
            itemStyle: {
              color: '#05122c',
            },
            data: new Array(this.barData.length).fill(this.maxCount),
            z: 0,
          },
        ],
      };
    },
  },
};
</script>