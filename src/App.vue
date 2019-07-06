<template>
  <v-app>
    <v-content>
      <v-toolbar flat dark color="blue-grey darken-2">
        <v-toolbar-title>TRISTZEE</v-toolbar-title>
        <v-spacer></v-spacer>
          <v-toolbar-title>{{ activePlayer.name }} - {{ grandTotal(activePlayer.id) }}</v-toolbar-title>
          <v-btn icon color="warning darken-2" @click="newGame"><v-icon>mdi-restart</v-icon></v-btn>
      </v-toolbar>
      <v-container>
        <Game />
      </v-container>
    </v-content>
  </v-app>
</template>s

<script>
import Game from '@/components/Game.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Game
  },
  computed: {
    ...mapGetters([
      'activePlayer',
      'grandTotal'
    ])
  },
  methods: {
        ...mapActions([
      'newGame'
    ])
  }
}
</script>

<style>
</style>