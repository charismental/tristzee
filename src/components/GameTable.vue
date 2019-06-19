<template>
  <div class="game-table">
    <HeldDice v-if="heldDice.length" />
    <Dice />
    <button class="btn" @click="rollDice">Roll Dice</button>
    <button class="btn" @click="resetRoll">Reset</button>
    <ScoreSheet />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Dice from './Dice'
import HeldDice from './HeldDice'
import ScoreSheet from './ScoreSheet'

export default {
  name: 'GameTable',
  components: {
    Dice,
    HeldDice,
    ScoreSheet
  },
  computed: {
    ...mapState([
      'gameRunning',
      'players',
      'rollNumber',
      'heldDice'
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
