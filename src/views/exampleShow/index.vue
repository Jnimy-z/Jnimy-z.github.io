<template>
  <el-row class="examples">
    <el-col :span="3" class="example-col">
      <el-menu class="example-menu" router>
        <template v-for="(item, index) in menuRoutes" :key="'example' + index">
          <el-menu-item
            :index="item.path"
            :class="$route.path === item.path ? 'is-active' : ''"
          >
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <div class="example-content">
        <router-view></router-view></div
    ></el-col>
  </el-row>
</template>
  
  <script>
export default {
  data() {
    return {
      menuRoutes: [
        {
          title: 'OpenLayers展示',
          path: '/examples/openlayers',
        },
        {
          title: 'Echarts地图展示',
          path: '/examples/echartsMap',
        },
        {
          title: '自动滚动列表',
          path: '/examples/autoRollingList',
        },
        {
          title: '轮播图组件',
          path: '/examples/carousel',
        },
        {
          title: '树组件',
          path: '/examples/myTree',
        },
        {
          title: '词云组件',
          path: '/examples/wordCloud',
        },
        {
          title: '文件预览',
          path: '/examples/pdfPreview'
        },{
          title: '富文本编辑器',
          path: '/examples/myEditor'
        }
      ],
    };
  },
  onMounted() {
    this.$nextTick(() => {
      console.log(this.$route.path);
    });
  },
  setup() {},
};
</script>
<style lang="less" scoped>
.examples {
  height: 100%;
  .example-col {
    background-color: var(--el-menu-bg-color);
    border-right: 1px solid var(--el-menu-border-color);
    .example-menu {
      border: none;
    }
  }
  .example-content {
    width: 100%;
    height: 100vh;
  }
}
</style>
  