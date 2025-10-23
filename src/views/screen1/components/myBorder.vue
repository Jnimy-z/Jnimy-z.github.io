<template>
  <div class="custom-border">
    <div class="custom-header">
      <SvgIcon name="double-arrow"></SvgIcon>
      <span>{{ title }}</span>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>
<style lang="less" scoped>
.custom-border {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #0463ff;
  box-sizing: border-box;
  background: #030e2c;
  box-shadow: inset 0 0 81px 10px #042054;
  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: -1px;
    top: -1px;
    pointer-events: none;
    z-index: 99;
    border: 1px solid #10d1ea;
    clip-path: polygon(
      15px 0,
      calc(100% - 15px) 0,
      100% 15px,
      100% calc(100% - 15px),
      calc(100% - 15px) 100%,
      15px 100%,
      0 calc(100% - 15px),
      0 15px
    );
  }
  .custom-header {
    position: relative;
    width: 100%;
    height: 6rem;
    line-height: 6rem;
    text-align: left;
    text-indent: 6.9rem;
    font-family: '35--Regular';
    font-size: 2rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rem;
    color: #00f2f1;
    .svg-icon {
      position: absolute;
      left: 2.9rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .custom-content {
  }
}
</style>>