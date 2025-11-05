<template>
  <div class="national-content">
    <CusTitle1Vue data="National Data"></CusTitle1Vue>
    <div class="content">
    </div>
  </div>
</template>
<script>
import CusTitle1Vue from '../components/CusTitle1.vue';
export default {
  name: 'title1',
  components: {
    CusTitle1Vue,
  },
};
</script>
<style lang="less" scoped>
.national-content {
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 36%;
  .content {
    flex: 1;
    width: 100%;
    background: url('@/assets/images/screen2-national-bg.png') center / auto 100% no-repeat;
  }
}
</style>