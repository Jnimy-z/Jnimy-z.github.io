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
        max: this.maxCount,
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
      maxCount: 8000,
      grid: {
        top: '42px',
        left: '18px',
        right: '31px',
        bottom: '41px',
        containLabel: true,
      },
      barData: [
        {
          name: '日客流量',
          value: 2500,
        },
        {
          name: '日客流量',
          value: 8000,
        },
        {
          name: '日客流量',
          value: 3000,
        },
        {
          name: '日客流量',
          value: 3000,
        },
        {
          name: '日客流量',
          value: 3000,
        },
        {
          name: '日客流量',
          value: 2500,
        },
        {
          name: '日客流量',
          value: 8000,
        },
        {
          name: '日客流量',
          value: 3000,
        },
        {
          name: '日客流量',
          value: 3000,
        },
        {
          name: '日客流量',
          value: 3000,
        },
        {
          name: '日客流量',
          value: 3000,
        },
        {
          name: '日客流量',
          value: 3000,
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
              color: '#00d9fb',
              fontSize: 17,
              fontFamily: 'cus-regular-new',
            },
          })),
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
            margin: 83,
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
              color: '#00a2ff',
            },
            barWidth: '50%',
            label: {
              show: true,
              align: 'left',
              position: 'insideLeft',
              distance: 17,
              formatter: '{c}万条',
              color: '#020e29',
              fontSize: 17,
              fontFamily: 'cus-regular-new',
            },
            z: 1,
          },
          {
            type: 'bar',
            barWidth: '50%',
            barGap: '-100%',
            itemStyle: {
              color: '#002069',
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