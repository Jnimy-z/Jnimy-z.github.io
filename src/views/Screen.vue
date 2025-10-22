<template>
  <div class="about">
    <h1>关于我们</h1>
    <p>这是关于页面</p>
    <router-link to="/" class="nav-link">首页</router-link>
    <button @click="goBack" class="btn">返回</button>
  </div>
</template>

<script>
export default {
  name: 'Screen',
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.home {
  padding: 20px;
  text-align: center;
}

.nav-link {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.btn {
  margin: 10px;
  padding: 10px 20px;
  background: #35495e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>