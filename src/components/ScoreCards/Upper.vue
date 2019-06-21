<template>
    <div class="score-sheet">
        <div class="score-item">Ones</div>
        <div class="score-item" @click="addScore({'field':'one', 'id': player.id, 'value':potentialScore(1)})">
            <span class="score" :class="[{'hidden': player.score.one === null}]">{{ displayScore('one', 1) }}</span>
        </div>
        <div class="score-item">Twos</div>
        <div class="score-item" @click="addScore({'field':'two', 'id': player.id, 'value':potentialScore(2)})">
            <span class="score" :class="[{'hidden': player.score.two === null}]">{{ displayScore('two', 2) }}</span>
        </div>
        <div class="score-item">Threes</div>
        <div class="score-item" @click="addScore({'field':'three', 'id': player.id, 'value':potentialScore(3)})">
            <span class="score" :class="[{'hidden': player.score.three === null}]">{{ displayScore('three', 3) }}</span>
        </div>
        <div class="score-item">Fours</div>
        <div class="score-item" @click="addScore({'field':'four', 'id': player.id, 'value':potentialScore(4)})">
            <span class="score" :class="[{'hidden': player.score.four === null}]">{{ displayScore('four', 4) }}</span>
        </div>
        <div class="score-item">Fives</div>
        <div class="score-item" @click="addScore({'field':'five', 'id': player.id, 'value':potentialScore(5)})">
            <span class="score" :class="[{'hidden': player.score.five === null}]">{{ displayScore('five', 5) }}</span>
        </div>
        <div class="score-item">Sixes</div>
        <div class="score-item" @click="addScore({'field':'six', 'id': player.id, 'value':potentialScore(6)})">
            <span class="score" :class="[{'hidden': player.score.six === null}]">{{ displayScore('six', 6) }}</span>
        </div>
        <div class="score-item">Total Score</div>
        <div class="score-item">
            <span class="score">{{ totalPoints() }}</span>
        </div>
        <div class="score-item">Bonus</div>
        <div class="score-item">
            <span class="score">{{ this.player.score.upperBonus }}</span>
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
    props: [
        'player'
    ],
computed: {
    ...mapState([
        'dice',
        'rollNumber'
    ]),
    totalUpperPoints () {
        return this.player.score.upperBonus + this.totalPoints()
    }
},
methods: {
    ...mapMutations([
        'addUpperBonus'
    ]),
    totalPoints () {
        const score = this.player.score
        const total = score.one + score.two + score.three + score.four + score.five + score.six
        total >= 63 ? this.addUpperBonus(this.player.id) : ''
        return total
    },
    displayScore (field, num) {
        if (this.player.score[field] === 0 || this.player.score[field]) {
            return this.player.score[field]
        } else {
            return this.potentialScore(num)
        }
    },
    potentialScore (n) {
        if (this.rollNumber > 1) {
            return this.dice
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
    grid-template-rows: repeat(9, 40px);
    border: 2px solid #000;
    max-width: 350px;
    height: 360px;
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
