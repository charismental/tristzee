<template>
  <div class="game">
    <v-layout row justify-center>
      <v-dialog v-model="createPlayer" persistent max-width="400px">
        <PlayerCreator />
      </v-dialog>
    </v-layout>
    <div v-if="gameRunning">
      <Dice />
      <v-btn :disabled="rollNumber === 4 || rolling" round block large color="warning darken-3" @click="rollDice(8)">
        <v-btn icon left flat dark absolute depressed><v-icon large left>mdi-dice-multiple</v-icon>ROLL</v-btn>
        <v-btn round absolute right dark color="blue-grey">
          <v-icon dark>mdi-numeric-{{ 4 - rollNumber }}</v-icon>
        </v-btn>
      </v-btn>
      <v-btn color="primary" round large @click="robotStep">Robot turn</v-btn>
      <ScoreCard :player="activePlayer" />
    </div>
    <FinishedPlayers v-show="finishedPlayers.length" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import Dice from '@/components/Dice'
import ScoreCard from '@/components/ScoreCard'
import PlayerCreator from '@/components/PlayerCreator'
import FinishedPlayers from '@/components/FinishedPlayers'

export default {
  name: 'Game',
  components: {
    Dice,
    ScoreCard,
    PlayerCreator,
    FinishedPlayers
  },
  computed: {
    ...mapGetters([
      'activePlayer'
    ]),
    ...mapState([
      'finishedPlayers',
      'players',
      'rollNumber',
      'gameRunning',
      'finishedPlayers',
      'rolling'
    ]),
    createPlayer () {
      return !this.gameRunning ? true : false
    }
  },
  methods: {
    ...mapMutations([
      'removePlayer'
    ]),
    ...mapActions([
      'newGame',
      'rollDice',
      'robotStep'
    ])
  }
}
</script>
<style scoped>
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
.player-info {
  font-size: 2.5em;
  font-weight: 700;
  margin-top: 20px;
}
.player-name {
  padding-right: 12px;
}
.btn {
  margin-top: 20px;
  margin-right: 20px;
  cursor: pointer;
}
</style>
