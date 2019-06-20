<template>
    <div class="score-sheet">
        <div class="score-item">3 of a kind</div>
        <div class="score-item" @click="addScore({'field':'threeKind', 'value':kindScore(3)})">
            <span class="score" :class="[{'hidden': players[0].score.threeKind === null}]">{{ displayScore('threeKind') || kindScore(3) }}</span>
        </div>
        <div class="score-item">4 of a kind</div>
        <div class="score-item" @click="addScore({'field':'fourKind', 'value':kindScore(4)})">
            <span class="score" :class="[{'hidden': players[0].score.fourKind === null}]">{{ displayScore('fourKind') || kindScore(4) }}</span>
        </div>
        <div class="score-item">Full House</div>
        <div class="score-item" @click="addScore({'field':'fullHouse', 'value':fullHouseScore()})">
            <span class="score" :class="[{'hidden': players[0].score.fullHouse === null}]">{{ displayScore('fullHouse') || fullHouseScore() }}</span>
        </div>
        <div class="score-item">Small Straight</div>
        <div class="score-item" @click="addScore({'field':'lowStraight', 'value':straightScore(4)})">
            <span class="score" :class="[{'hidden': players[0].score.lowStraight === null}]">{{ displayScore('lowStraight') || straightScore(4) }}</span>
        </div>
        <div class="score-item">Large Straight</div>
        <div class="score-item" @click="addScore({'field':'highStraight', 'value':straightScore(5)})">
            <span class="score" :class="[{'hidden': players[0].score.highStraight === null}]">{{ displayScore('highStraight') || straightScore(5) }}</span>
        </div>
        <div class="score-item">Tristzee</div>
        <div class="score-item" @click="addScore({'field':'tristzee', 'value':kindScore(5)})">
            <span class="score" :class="[{'hidden': players[0].score.tristzee === null}]">{{ displayScore('tristzee') || kindScore(5) }}</span>
        </div>
        <div class="score-item">Chance</div>
        <div class="score-item" @click="addScore({'field':'chance', 'value':kindScore(1)})">
            <span class="score" :class="[{'hidden': players[0].score.chance === null}]">{{ displayScore('chance') || kindScore(1) }}</span>
        </div>
        <div class="score-item">Tristzee Bonus</div>
        <div class="score-item" @click="addScore({'field':'tristzeeBonus', 'value':(tristzeeCounter - 1) * 100})">
            <span class="score" :class="[{'hidden': players[0].score.tristzeeBonus === null}]">{{ players[0].score.tristzeeBonus }}</span>
        </div>
        <div class="score-item">Total of Lower Section</div>
        <div class="score-item">
            <span class="score">{{ totalLowerPoints }}</span>
        </div>
        <div class="score-item">Total of Upper Section</div>
        <div class="score-item">
            <span class="score">{{ totalUpperPoints }}</span>
        </div>
        <div class="score-item">Grand Total</div>
        <div class="score-item">
            <span class="score">{{ totalLowerPoints + totalUpperPoints}}</span>
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
    totalUpperPoints () {
        const score = this.players[0].score
        const total = score.one + score.two + score.three + score.four + score.five + score.six + score.upperBonus
        return total
    },
    totalLowerPoints () {
        const score = this.players[0].score
        const total = score.threeKind + score.fourKind + score.fullHouse + score.lowStraight + score.highStraight + score.tristzee + score.chance + score.tristzeeBonus
        return total
    }
},
methods: {
    displayScore (field) {
        if (this.players[0].score[field] === 0) {
            return '0'
        } else if (this.players[0].score[field]) {
            return this.players[0].score[field]
        }
    },
    countInArray (array, num) {
        return array.filter(x => x === num).length
    },
    kindScore (number) {
        if (this.rollNumber > 1) {
            const allDiceValues = this.dice.concat(this.heldDice)
                .map(d => d.value)
            const arr = [1, 2, 3, 4, 5, 6]
            const newArr = []
            arr.forEach(val => {
                newArr.push(this.countInArray(allDiceValues, val))
            })
            if (number === 5 && newArr.find(c => c >= number)) {
                return 50
            } else if (newArr.find(c => c >= number)) {
                return allDiceValues.reduce((a, b) => a + b, 0)
            } else {
                return 0
            }
        }
    },
    fullHouseScore () {
        if (this.rollNumber > 1) {
            const allDiceValues = this.dice.concat(this.heldDice)
                .map(d => d.value)
            const arr = [1, 2, 3, 4, 5, 6]
            const newArr = []
            arr.forEach(val => {
                newArr.push(this.countInArray(allDiceValues, val))
            })
            return newArr.includes(3) && newArr.includes(2) ? 25 : 0
        }
    },
    straightScore (num) {
        if (this.rollNumber > 1) {
            const allDiceValues = this.dice.concat(this.heldDice)
                .map(d => d.value)
                .sort((a, b) => a-b)
            const uniques = Array.from(new Set(allDiceValues))
            let consec = 1
            uniques.forEach((el, i) => {
                if (consec >= 4 && el - uniques[i-1] !== 1) {
                    return
                } else if (consec <=3 && el - uniques[i-1] !==1){
                    consec = 1
                } else {
                    consec++
                }
            })
            if (consec === 5 && num === 5) {
                return 40
            } else if (consec >= num && num === 4) {
                return 30
            } else {
                return 0
            }
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
    grid-template-rows: repeat(11, 40.91px);
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
