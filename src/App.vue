<template>
  <div id="app">
    <h1 class="title">TRISTZEE</h1>
    <GameTable />
    <div id="nav">
      <router-link to="/">Upper Score</router-link> |
      <router-link to="/lower">Lower Score</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import GameTable from '@/components/GameTable.vue'
export default {
  components: {
    GameTable
  }
}
</script>

<style>
h1 .title {
  font-family: 'Courier New', Courier, monospace;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  margin-top: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
