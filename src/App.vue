<template>
    <div>
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            msg: 'Hello Vue!'
        }
    }
}
</script>
<style>
#app {
    font-family: 'Avenir', Arial, Helvetica, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>