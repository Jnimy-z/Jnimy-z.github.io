<template>
  <div class="list-content">
    <div class="item-box" v-for="item in imageData" :key="item.id">
      <img :src="item.path" alt="" />
    </div>
  </div>
</template>
  <script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const imageData = ref([]);
const time = ref(3000);
const timeout = ref(null);

onMounted(() => {
  initData();
  carouselStart()
});
onUnmounted(() => {
    if(timeout.value) {
        clearTimeout(timeout)
        timeout.value = null
    }
})

function initData() {
  imageData.value = new Array(6).fill().map((item, index) => {
    return {
      id: index + 1,
      path: `/lunbotu/${index + 1}.jpg`,
    };
  });
}
function carouselStart() {
  if (timeout.value) {
    let firstItem = imageData.value.shift();
    imageData.value.push(firstItem);
    clearTimeout(timeout.value)
  };
  timeout.value = setTimeout(carouselStart, time.value);
}
</script>
  <style lang="less" scoped>
.list-content {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f4f6f8;
  padding: 1rem;
  overflow: hidden;
  .item-box {
    position: absolute;
    width: 40rem;
    height: 30rem;
    transition: all 0.5s;
    top: 50%;
    transform: translateY(-50%);
    img {
      width: 100%;
      height: 100%;
    }
    &:nth-child(1) {
      left: -5rem;
      transform: scale(0.8) rotateY(65deg) skewY(18deg) translateY(-202px);
      opacity: 0;
    }
    &:nth-child(2) {
      left: 21rem;
      transform: scale(0.85) rotateY(31deg) skewY(13deg) translateY(-56px);
      opacity: 1;
    }
    &:nth-child(3) {
      left: 61rem;
      transform: scale(0.9);
      opacity: 1;
    }
    &:nth-child(4) {
      left: 101rem;
      transform: scale(0.85) rotateY(-31deg) skewY(-13deg) translateY(-56px);
      opacity: 1;
    }
    &:nth-child(5) {
      left: 141rem;
      transform: scale(0.8) rotateY(-65deg) skewY(-18deg) translateY(-202px);
      opacity: 0;
    }
    &:nth-child(6) {
      left: 181rem;
      transform: scale(0.8) rotateY(-65deg) skewY(-18deg) translateY(-202px);
      opacity: 0;
    }
  }
}
</style>