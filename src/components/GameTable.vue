<template>
  <div class="game-table">
    <Dice />
    <button class="btn" @click="rollDice">Roll Dice</button>
    <button class="btn" @click="resetRoll">Reset</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Dice from './Dice'

export default {
  name: 'GameTable',
  components: {
    Dice
  },
  computed: {
    ...mapState([
      'gameRunning',
      'players',
      'rollNumber'
    ])
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
.btn {
  margin-top: 20px;
  cursor: pointer;
}
</style>
