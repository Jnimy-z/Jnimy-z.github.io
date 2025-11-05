<template>
  <div class="title2">
    {{ data }}
  </div>
</template>
<script>
export default {
  name: 'title1',
  props: {
    data: {
      type: String,
      require: true,
    },
  },
};
</script>
<style lang="less" scoped>
.title2 {
  display: flex;
  position: relative;
  justify-content: flex-start;
  text-align: left;
  font-size: 2.2rem;
  color: #00e4ff;
  text-indent: 2.7rem;
  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    background-color: #00e4ff;
    border-radius: 10%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>