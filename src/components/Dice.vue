<template>
    <div class="dice">
        <div v-for="die in dice" :key="die.id" @click="holdUnholdDie(die)">
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
        'holdUnholdDie'
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
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}
</style>
