<template>
    <div class="score-sheet">
        <div class="score-item">Ones</div>
        <div class="score-item" @click="addScore({'dieNum':'one', 'value':potentialScore(1)})">
            <span class="score" :class="[{'hidden': players[0].score.one === null}]">{{ players[0].score.one || potentialScore(1) }}</span>
        </div>
        <div class="score-item">Twos</div>
        <div class="score-item" @click="addScore({'dieNum':'two', 'value':potentialScore(2)})">
            <span class="score" :class="[{'hidden': players[0].score.two === null}]">{{ players[0].score.two || potentialScore(2) }}</span>
        </div>
        <div class="score-item">Threes</div>
        <div class="score-item" @click="addScore({'dieNum':'three', 'value':potentialScore(3)})">
            <span class="score" :class="[{'hidden': players[0].score.three === null}]">{{ players[0].score.three || potentialScore(3) }}</span>
        </div>
        <div class="score-item">Fours</div>
        <div class="score-item" @click="addScore({'dieNum':'four', 'value':potentialScore(4)})">
            <span class="score" :class="[{'hidden': players[0].score.four === null}]">{{ players[0].score.four || potentialScore(4) }}</span>
        </div>
        <div class="score-item">Fives</div>
        <div class="score-item" @click="addScore({'dieNum':'five', 'value':potentialScore(5)})">
            <span class="score" :class="[{'hidden': players[0].score.five === null}]">{{ players[0].score.five || potentialScore(5) }}</span>
        </div>
        <div class="score-item">Sixes</div>
        <div class="score-item" @click="addScore({'dieNum':'six', 'value':potentialScore(6)})">
            <span class="score" :class="[{'hidden': players[0].score.six === null}]">{{ players[0].score.six || potentialScore(6) }}</span>
        </div>
        <div class="score-item">Total Points</div>
        <div class="score-item">
            <span class="score">{{ totalPoints }}</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
computed: {
    ...mapState([
        'players',
        'dice',
        'heldDice',
        'rollNumber'
    ]),
    totalPoints () {
        const score = this.players[0].score
        const total = score.one + score.two + score.three + score.four + score.five + score.six
        return total
    }
},
methods: {
    potentialScore (n) {
        if (this.rollNumber > 1) {
            const allDice = this.dice.concat(this.heldDice)
            return allDice
                .filter(d => d.value === n)
                .map(d => d.value)
                .reduce((a, b) => a + b, 0)
        }
    },
    ...mapActions([
        'addScore'
    ])
}
}
</script>

<style scoped>
.hidden:hover {
    opacity: 1;
    color: darkgreen;
}
.hidden {
    opacity: 0;
}
.score {
    cursor: pointer;
    font-weight: 700;
    font-size: 2em;
}
.score-sheet {
    display: grid;
    grid-template-columns: auto 70px;
    grid-template-rows: repeat(7, 60px);
    border: 2px solid #000;
    max-width: 350px;
    height: 420px;
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
