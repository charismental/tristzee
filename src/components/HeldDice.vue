<template>
    <div class="held-dice">
        <div v-for="die in heldDice" :key="die.id" @click="unholdDie(die)">
            <Die :value="die.value" :held="die.held" />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Die from './Die'

export default {
computed: {
    ...mapState([
        'heldDice'
    ])
},
methods: {
    ...mapMutations([
        'unholdDie'
    ])
},
components: {
    Die
}
}
</script>

<style scoped>
.held-dice {
    background-color: lightgreen;
    border: 3px solid green;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 30px;
    padding: 20px 0;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    }

</style>
