<template>
    <div class="dice">
        <div v-for="die in dice" :key="die.id" @click="holdDie(die)">
            <Die :value="die.value" :held="die.held" />
        </div>
    </div>
</template>

<script>
import Die from './Die'
import { mapState, mapMutations } from 'vuex'

export default {
components: {
    Die
},
computed: {
    ...mapState([
        'dice'
    ])
},
methods: {
    ...mapMutations([
        'holdDie'
    ])
}
}
</script>

<style scoped>
.dice {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
