<template>
  <div class="game">
    <PlayerCreator v-if="!gameRunning" />
    <div v-else>
      <Dice />
      <button class="btn" @click="rollDice">Roll Dice</button>
      <button class="btn" @click="resetRoll">Reset</button>
      <div id="nav">
        <router-link to="/">Upper Score</router-link> |
        <router-link to="/lower">Lower Score</router-link>
      </div>
      <div class="player-info">
        <span class="player-name">{{ activePlayer.name }} -</span>
        <span class="rolls-remaining">{{ rollsRemaining }}</span>
      </div>
      <router-view :player="activePlayer" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Dice from '@/components/Dice'
import PlayerCreator from '@/components/PlayerCreator'

export default {
  name: 'Game',
  components: {
    Dice,
    PlayerCreator
  },
  computed: {
    ...mapState([
      'activePlayerID',
      'players',
      'rollNumber',
      'gameRunning'
    ]),
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
      'rollDice',
      'resetRoll'
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
  cursor: pointer;
}
</style>
