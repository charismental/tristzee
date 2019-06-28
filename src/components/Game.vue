<template>
  <div class="game">
    <v-layout row justify-center>
      <v-dialog v-model="createPlayer" persistent max-width="400px">
        <PlayerCreator />
      </v-dialog>
    </v-layout>
    <!-- <PlayerCreator v-show="!gameRunning && !finishedPlayers.length"/> -->
    <div v-if="gameRunning">
      <Dice />
      <v-btn class="btn" color="info" @click="rollDice(8)">Roll Dice</v-btn>
      <v-btn class="btn" color="warning" @click="newGame">New Game</v-btn>
      <!-- <div id="nav">
        <router-link to="/">Upper Score</router-link> |
        <router-link to="/lower">Lower Score</router-link>
      </div>
      <div class="player-info">
        <span class="player-name">{{ activePlayer.name }} -</span>
        <span class="rolls-remaining">{{ rollsRemaining }}</span>
      </div>
      <router-view :player="activePlayer" /> -->
      <ScoreCard />
    </div>
    <FinishedPlayers v-show="finishedPlayers.length" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Dice from '@/components/Dice'
import ScoreCard from '@/components/ScoreCard'
import PlayerCreator from '@/components/PlayerCreator'
import FinishedPlayers from '@/components/FinishedPlayers'

export default {
  name: 'Game',
  // data () {
  //   return {
  //     bool: true
  //   }
  // },
  components: {
    Dice,
    ScoreCard,
    PlayerCreator,
    FinishedPlayers
  },
  computed: {
    ...mapState([
      'activePlayerID',
      'finishedPlayers',
      'players',
      'rollNumber',
      'gameRunning',
      'finishedPlayers'
    ]),
    createPlayer () {
      return !this.gameRunning ? true : false
    },
    activePlayer () {
      return this.players.find(p => p.id === this.activePlayerID)
    },
    rollsRemaining () {
      if (this.rollNumber === 4) {
        return 'Out of rolls, dork'
      } else if (this.rollNumber === 3) {
        return '1 roll remaining'
      } else {
        return `${4 - this.rollNumber} rolls remaining`
      }
    }
  },
  methods: {
    ...mapMutations([
      'removePlayer'
    ]),
    ...mapActions([
      'newGame',
      'rollDice'
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
