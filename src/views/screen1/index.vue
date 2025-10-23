<template>
  <div class="screen1">
    <header class="header-content">
      <h1 class="big-title">XXXX站点信息资源中心</h1>
      <SvgIcon name="header-bg"></SvgIcon>
      <!-- <SvgIcon name="double-arrow"></SvgIcon> -->
    </header>
    <div class="content">
      <div class="left-side side">
        <myBorder title="信息总量">
          <template #content>
            <div class="data-content">
              <BarChart
                :data="barData"
                :x-axis-data="xAxisData"
                :config="barConfig"
                height="300px"
                @chart-click="handleBarClick"
              ></BarChart>
            </div>  
          </template>
        </myBorder>
      </div>
      <div class="center-content">
        <div class="center-box"></div>
        <div class="bottom-box">
          <myBorder title="客流量分析">
            <template #content>
              <div class="data-content">hhhh</div>
            </template>
          </myBorder>
        </div>
      </div>
      <div class="right-side side">
        <div class="top-content">
          <myBorder title="表盘">
            <template #content>
              <div class="data-content">hhhh</div>
            </template>
          </myBorder>
        </div>
        <div class="bottomm-content">
          <myBorder title="流量Top10">
            <template #content>
              <div class="data-content">hhhh</div>
            </template>
          </myBorder>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myBorder from './components/myBorder.vue';
import BarChart from '../../components/charts/BarChart.vue';
export default {
  name: 'screen1',
  components: {
    myBorder,
    BarChart,
  },
  data() {
    return {
      xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      barData: [
        {
          name: '销量',
          data: [120, 200, 150, 80, 70, 110, 130],
        },
      ],
      barConfig: {
        title: {
          text: '销售数据',
        },
      },
    };
  },
  methods: {
    handleBarClick: (params) => {
      console.log('柱状图点击:', params);
    },
  },
};
</script>

<style lang="less" scoped>
@headHeight: 9rem;
@sideWidth: 46rem;
.screen1 {
  width: 100%;
  height: 100%;
  background: #000b1f;
  .header-content {
    position: relative;
    width: 100%;
    height: @headHeight;
    .svg-icon {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
}
.big-title {
  width: 100%;
  height: 100%;
  text-align: center;
  font-family: '35--Regular';
  font-size: 4rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 8rem;
  letter-spacing: 0rem;
  color: #63d8e2;
}
@supports (-webkit-background-clip: text) or (background-clip: text) {
  .big-title {
    background: linear-gradient(to bottom, #8feaf4, #2999d7);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - @headHeight);
  padding: 0 2rem 1.4rem 2rem;
}
.side {
  width: @sideWidth;
  height: 100%;
}
.left-side {
}
.right-side {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  .top-content {
    width: 100%;
    height: 27%;
    margin-bottom: 2.5rem;
  }
  .bottomm-content {
    width: 100%;
    flex: 1;
  }
}
.center-content {
  display: flex;
  flex-flow: column;
  height: 100%;
  flex: 1;
  padding: 0 2rem;
  .center-box {
    flex: 1;
  }
  .bottom-box {
    width: 100%;
    height: 32%;
  }
}
</style>>