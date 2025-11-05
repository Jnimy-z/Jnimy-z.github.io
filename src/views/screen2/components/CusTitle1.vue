<template>
  <div class="title1">
    <div class="title-content">
      <span class="left-data">{{ dataArr[0] }}</span>
      &nbsp;
      <span class="right-data">{{ dataArr[1] }}</span>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue';
export default {
  name: 'title1',
  props: {
    data: {
      type: String,
      require: true,
    },
  },
  computed: {
    dataArr() {
      return this.data.split(' ');
    },
  },
};
</script>
<style lang="less" scoped>
.title1 {
  display: flex;
  position: relative;
  justify-content: flex-start;
  .title-content {
    display: inline-block;
    height: 5rem;
    line-height: 5rem;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 0 1rem;
    clip-path: polygon(1rem 0, 100% 0, 100% 100%, 0 100%, 0 1rem);
    font-size: 2.1rem;
    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 1rem;
      height: 1rem;
      background: #fff;
      left: 0;
      top: 0;
    }
    .left-data {
      color: #0084ff;
    }
    .right-data {
      color: #fff;
    }
  }
}
</style>