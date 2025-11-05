<template>
  <el-row class="examples">
    <el-col :span="3" class="example-col">
      <el-menu
        class="example-menu"
        router
        default-active="/examples/openlayers"
      >
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
          path: '/examples/openlayers'
        },
        {
          title: 'Echarts地图展示',
          path: '/examples/echartsMap'
        },
      ],
    };
  },
  onMounted() {
        console.log('hhhhh')
    this.$nextTick(() => {
        console.log('hhhhh')
      console.log(this.$route.path);
    });
  },
  setup() {
  },
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
    height: 100%;
  }
}
</style>
  