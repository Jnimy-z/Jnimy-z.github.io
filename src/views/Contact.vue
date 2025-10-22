<template>
    <div class="contact">
        <h1>联系我们</h1>
        <p>这是联系我</p>
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/screen" class="nav-link">大屏</router-link>
    </div>
</template>

<script>
export default {
    name: "Contact"
}
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