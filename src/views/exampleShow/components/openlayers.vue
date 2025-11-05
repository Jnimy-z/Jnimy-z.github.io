<template>hhhhh</template>
<script>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup() {
    onMounted(() => {
      {
        let router = useRouter()
        nextTick(() => {
          console.log(router.currentRoute.value);
        });
      }
    });
  },
};
</script>