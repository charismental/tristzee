<template>
    <div class="score-sheet">
        <div class="score-item">Ones</div>
        <div class="score-item" @click="addScore({'field':'one', 'value':potentialScore(1)})">
            <span class="score" :class="[{'hidden': players[0].score.one === null}]">{{ displayScore('one', 1) }}</span>
        </div>
        <div class="score-item">Twos</div>
        <div class="score-item" @click="addScore({'field':'two', 'value':potentialScore(2)})">
            <span class="score" :class="[{'hidden': players[0].score.two === null}]">{{ displayScore('two', 2) }}</span>
        </div>
        <div class="score-item">Threes</div>
        <div class="score-item" @click="addScore({'field':'three', 'value':potentialScore(3)})">
            <span class="score" :class="[{'hidden': players[0].score.three === null}]">{{ displayScore('three', 3) }}</span>
        </div>
        <div class="score-item">Fours</div>
        <div class="score-item" @click="addScore({'field':'four', 'value':potentialScore(4)})">
            <span class="score" :class="[{'hidden': players[0].score.four === null}]">{{ displayScore('four', 4) }}</span>
        </div>
        <div class="score-item">Fives</div>
        <div class="score-item" @click="addScore({'field':'five', 'value':potentialScore(5)})">
            <span class="score" :class="[{'hidden': players[0].score.five === null}]">{{ displayScore('five', 5) }}</span>
        </div>
        <div class="score-item">Sixes</div>
        <div class="score-item" @click="addScore({'field':'six', 'value':potentialScore(6)})">
            <span class="score" :class="[{'hidden': players[0].score.six === null}]">{{ displayScore('six', 6) }}</span>
        </div>
        <div class="score-item">Total Score</div>
        <div class="score-item">
            <span class="score">{{ totalPoints() }}</span>
        </div>
        <div class="score-item">Bonus</div>
        <div class="score-item">
            <span class="score">{{ this.players[0].score.upperBonus }}</span>
        </div>
        <div class="score-item">Total of Upper Section</div>
        <div class="score-item">
            <span class="score">{{ totalUpperPoints }}</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
computed: {
    ...mapState([
        'players',
        'dice',
        'heldDice',
        'rollNumber'
    ]),
    totalUpperPoints () {
        return this.players[0].score.upperBonus + this.totalPoints()
    }
},
methods: {
    ...mapMutations([
        'addUpperBonus'
    ]),
    totalPoints () {
        const score = this.players[0].score
        const total = score.one + score.two + score.three + score.four + score.five + score.six
        total >= 63 ? this.addUpperBonus() : ''
        return total
    },
    displayScore (field, num) {
        if (this.players[0].score[field] === 0 || this.players[0].score[field]) {
            return this.players[0].score[field]
        } else {
            return this.potentialScore(num)
        }
    },
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
    grid-template-rows: repeat(9, 50px);
    border: 2px solid #000;
    max-width: 350px;
    height: 450px;
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
