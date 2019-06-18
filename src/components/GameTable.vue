<template>
  <div class="game-table">
    <div v-for="die in dice" :key="die.id">
      <Die :value="die.value" />
    </div>
    <button class="btn" @click="rollDice">Roll Dice</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Die from './Die'

export default {
  name: 'GameTable',
  components: {
    Die
  },
  computed: {
    ...mapState([
      'gameRunning',
      'players',
      'dice',
      'rollNumber'
    ])
  },
  methods: {
    ...mapMutations([
      'rollDice'
    ])
  }
}
</script>

<style scoped>
.game-table {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.btn {
  cursor: pointer;
}
</style>
