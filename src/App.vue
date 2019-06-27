<template>
  <!-- <div id="app">
    <h1 class="title">TRISTZEE</h1>
    <Game />
  </div> -->
  <v-app>
    <v-content>
      <v-toolbar dark>
        <v-toolbar-title>TRISTZEE</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <Game />
      </v-container>
    </v-content>
  </v-app>
</template>s

<script>
import Game from '@/components/Game.vue'
export default {
  components: {
    Game
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
/* #nav {
  margin-top: 20px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>