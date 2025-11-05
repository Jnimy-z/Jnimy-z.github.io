<template>
    <div class="data-type">
      <CusTitle1Vue data="Data Type"></CusTitle1Vue>
      <div class="content"></div>
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
  .data-type {
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 32%;
    .content {
      flex: 1;
      width: 100%;
    }
  }
  </style>