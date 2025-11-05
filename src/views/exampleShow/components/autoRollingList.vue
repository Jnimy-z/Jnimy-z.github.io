<template>
  <div class="list-content">
    <div class="list-title">
      <div class="col-6">序号</div>
      <div class="col-6">姓名</div>
      <div class="col-6">性别</div>
      <div class="col-6">年龄</div>
    </div>
    <div class="scroll-box" ref="scrollRef">
      <!-- <div class="item-box"> -->
      <div class="item-row" v-for="item in data" :key="item.id">
        <div class="col-6">{{ item.id }}</div>
        <div class="col-6">{{ item.name }}</div>
        <div class="col-6">{{ item.sex }}</div>
        <div class="col-6">{{ item.age }}</div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const data = ref([]);
const lineHeight = ref(50);
const halfHeight = ref(lineHeight.value * 50);
const scrollRef = ref(null);
const top = ref(0);
const props = defineProps({
  isScroll: {
    type: Boolean,
    default: true,
  },
});
onMounted(() => {
  initData();
  scroll();
});
onUnmounted(() => {
  requestAnimationFrame(scroll);
});
function initData() {
  data.value = new Array(50).fill().map((item, index) => {
    return {
      name: '张三' + index,
      sex: '男',
      age: parseInt(Math.random() * 100, 10),
      id: index,
    };
  });
  data.value = data.value.concat(data.value);
}
function scroll(time) {
  console.log(time);
  top.value += 0.5;
  scrollRef.value?.scrollTo({
    top: top.value,
  });
  if (top.value >= halfHeight.value) {
    data.value.splice(0, data.value.length / 2);
    data.value = data.value.concat(data.value);
    top.value = 0;
  }
  requestAnimationFrame(scroll);
}
</script>
<style lang="less" scoped>
.list-content {
  width: 50%;
  height: 100%;
  background: #f4f6f8;
  padding: 1rem;
  .list-title {
    display: flex;
    height: 5rem;
    line-height: 5rem;
    font-weight: 700;
    font-size: 1.8rem;
    background: #fff;
    margin-bottom: 1rem;
  }
  .scroll-box {
    width: 100%;
    height: calc(100% - 6rem);
    overflow: hidden;
    // .item-box {
    font-size: 1.7rem;
    .item-row {
      display: flex;
      height: 4rem;
      line-height: 4rem;
      margin-bottom: 1rem;
      background: #fff;
      &:last-child {
        margin: 0;
      }
    }
    // }
  }
  .col-6 {
    width: 25%;
  }
}
</style>