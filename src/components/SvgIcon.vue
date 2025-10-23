<template>
  <svg aria-hidden="true" class="svg-icon" :width="width" :height="height">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script>
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
    width: {
      type: String,
      default: '1em',
    },
    height: {
      type: String,
      default: '1em',
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    return { symbolId }
  }
});
</script>

<style scoped>
.svg-icon {
    display: inline-block;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;
}
</style>