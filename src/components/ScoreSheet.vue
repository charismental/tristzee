<template>
    <div class="score-sheet">
        <div class="score-item">Ones</div>
        <div class="score-item input" @click="addScore({'dieNum':'one', 'value':4})">{{ players[0].score.one !== null ? players[0].score.one : '' }}</div>
        <div class="score-item">Twos</div>
        <div class="score-item input" @click="addScore({'dieNum':'two', 'value':8})">{{ players[0].score.two !== null ? players[0].score.two : '' }}</div>
        <div class="score-item">Threes</div>
        <div class="score-item input" @click="addScore({'dieNum':'three', 'value':12})">{{ players[0].score.three !== null ? players[0].score.three : '' }}</div>
        <div class="score-item">Fours</div>
        <div class="score-item input" @click="addScore({'dieNum':'four', 'value':16})">{{ players[0].score.four !== null ? players[0].score.four : '' }}</div>
        <div class="score-item">Fives</div>
        <div class="score-item input" @click="addScore({'dieNum':'five', 'value':20})">{{ players[0].score.five !== null ? players[0].score.five : '' }}</div>
        <div class="score-item">Sixes</div>
        <div class="score-item input" @click="addScore({'dieNum':'six', 'value':24})">{{ players[0].score.six !== null ? players[0].score.six : '' }}</div>
        <div class="score-item">Total Points</div>
        <div class="score-item">{{ totalPoints }}</div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
computed: {
    ...mapState([
        'players'
    ]),
    totalPoints () {
        const score = this.players[0].score
        const total = score.one + score.two + score.three + score.four + score.five + score.six
        return total
    }
},
methods: {
    ...mapMutations([
        'addScore'
    ])
}
}
</script>

<style scoped>
.score-sheet {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(7, auto);
    border: 2px solid #000;
    max-width: 250px;
    height: 300px;
    margin: 20px auto 0;
}
.score-item {
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
}
.input {
    cursor: pointer;
}
</style>
