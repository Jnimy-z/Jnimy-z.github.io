<template>
    <div class="hemo">
        <h1>首页</h1>
        <p>welcome home!!</p>
        <router-link to="/screen" class="nav-link">可视化大屏</router-link>
        <button @click="goToContact" class="btn">联系我们</button>
    </div>
</template>

<script>
export default {
    name: 'Home',
    methods: {
        goToContact() {
            this.$router.push('/contact')
        }
    }
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