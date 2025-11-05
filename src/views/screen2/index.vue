<template>
  <div class="screen2">
    <div class="left-content">
      <nationalData></nationalData>
      <dataClassification></dataClassification>
      <dataType></dataType>
    </div>
    <div class="center-content">
      <SvgIcon name="screen2-center-bg"></SvgIcon>
    </div>
    <div class="right-content"></div>
  </div>
</template>

<script>
import dataClassification from './modules/dataClassification.vue';
import dataType from './modules/dataType.vue';
import nationalData from './modules/nationalData.vue';
export default {
  components: {
    nationalData,
    dataClassification,
    dataType
  }
}
</script>

<style lang="less" scoped>
.screen2 {
  display: flex;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/screen2-bg.png') center / 100% no-repeat;
  padding: 5rem 3.5rem 3.9rem 3.6rem;
  .left-content, .right-content {
    width: calc(50% - 53.25rem);
  }
  .center-content {
    position: relative;
    width: 106.5rem;
    height: 100%;
    .svg-icon {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

