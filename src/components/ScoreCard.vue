<template>
<v-layout row>
    <v-flex xs6>
        <v-layout column>
            <v-flex>
                <v-card tile flat color="blue-grey darken-2" class="score-item white--text">
                    <v-card-title>
                        <div class="headline">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="score-icon" dark v-on="on">mdi-dice-1</v-icon>
                                </template>
                                <span>Count and Add Only Ones</span>
                            </v-tooltip>
                            <div class="score-input">
                                <div
                                    class="score"
                                    :class="[{'potential-score': player.score.one === null && rollNumber > 1}]"
                                    @click="addScore({'field':'one', 'id': player.id, 'value':potentialUpperItemScore(1)})">
                                    {{ displayScore('one', 1) }}
                                </div>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card tile flat color="blue-grey lighten-1" class="score-item">
                    <v-card-title>
                        <div class="headline">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon dark class="score-icon" v-on="on">mdi-dice-2</v-icon>
                                </template>
                                <span>Count and Add Only Twos</span>
                            </v-tooltip>
                            <div class="score-input">
                                <div class="score"
                                    :class="[{'potential-score': player.score.two === null && rollNumber > 1}]" 
                                    @click="addScore({'field':'two', 'id': player.id, 'value':potentialUpperItemScore(2)})">
                                    {{ displayScore('two', 2) }}
                                </div>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card tile flat color="blue-grey darken-2" class="score-item white--text">
                    <v-card-title>
                        <div class="headline">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="score-icon" dark v-on="on">mdi-dice-3</v-icon>
                                </template>
                                <span>Count and Add Only Threes</span>
                            </v-tooltip>
                            <div class="score-input">
                                <div class="score"
                                    :class="[{'potential-score': player.score.three === null && rollNumber > 1}]"
                                    @click="addScore({'field':'three', 'id': player.id, 'value':potentialUpperItemScore(3)})">
                                    {{ displayScore('three', 3) }}
                                </div>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card tile flat color="blue-grey lighten-1" class="score-item">
                    <v-card-title>
                        <div class="headline">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon dark class="score-icon" v-on="on">mdi-dice-4</v-icon>
                                </template>
                                <span>Count and Add Only Fours</span>
                            </v-tooltip>
                            <div class="score-input">
                                <div class="score"
                                    :class="[{'potential-score': player.score.four === null && rollNumber > 1}]"
                                    @click="addScore({'field':'four', 'id': player.id, 'value':potentialUpperItemScore(4)})">
                                    {{ displayScore('four', 4) }}
                                </div>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card tile flat color="blue-grey darken-2" class="score-item white--text">
                    <v-card-title>
                        <div class="headline">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="score-icon" dark v-on="on">mdi-dice-5</v-icon>
                                </template>
                                <span>Count and Add Only Fives</span>
                            </v-tooltip>
                            <div class="score-input">
                                <div class="score"
                                    :class="[{'potential-score': player.score.five === null && rollNumber > 1}]"
                                    @click="addScore({'field':'five', 'id': player.id, 'value':potentialUpperItemScore(5)})">
                                    {{ displayScore('five', 5) }}
                                </div>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card tile flat color="blue-grey lighten-1" class="score-item">
                    <v-card-title>
                        <div class="headline">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon dark class="score-icon" v-on="on">mdi-dice-6</v-icon>
                                </template>
                                <span>Count and Add Only Sixes</span>
                            </v-tooltip>
                            <div class="score-input">
                                <div class="score"
                                    :class="[{'potential-score': player.score.six === null && rollNumber > 1}]"
                                    @click="addScore({'field':'six', 'id': player.id, 'value':potentialUpperItemScore(6)})">
                                    {{ displayScore('six', 6) }}
                                </div>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card tile flat color="blue-grey darken-2" class="score-item white--text">
                    <v-card-title>
                        <div class="headline">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="score-icon" dark v-on="on">mdi-alpha-b-box</v-icon>
                                </template>
                                <span>Add 35 if score is 63 or higher</span>
                            </v-tooltip>
                            <div class="score-input">
                                <div class="bonus-score">
                                    {{ player.score.upperBonus || `${upperTotal(player.id)}/63` }}
                                </div>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-flex>
    <v-flex xs6>
        <v-layout column>
            <v-flex>
                <v-card tile flat color="blue-grey darken-2" class="score-item white--text">
                    <v-card-title>
                        <div class="headline">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="score-icon" dark v-on="on">mdi-numeric-3-box</v-icon>
                                </template>
                                <span>3 of a kind - Add Total of All Dice</span>
                            </v-tooltip>
                            <div class="score-input">
                                <div
                                    class="score"
                                    :class="[{'potential-score': player.score.threeKind === null && rollNumber > 1}]"
                                    @click="addScore({'field':'threeKind', 'id': player.id, 'value':kindScore(3)})">
                                    {{ displayScore('threeKind') || isRolling(kindScore(3)) }}
                                </div>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card tile flat color="blue-grey lighten-1" class="score-item">
                    <v-card-title>
                        <div class="headline">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon dark class="score-icon" v-on="on">mdi-numeric-4-box</v-icon>
                                </template>
                                <span>4 of a kind - Add Total of All Dice</span>
                            </v-tooltip>
                            <div class="score-input">
                                <div
                                    class="score"
                                    :class="[{'potential-score': player.score.fourKind === null && rollNumber > 1}]"
                                    @click="addScore({'field':'fourKind', 'id': player.id, 'value':kindScore(4)})">
                                    {{ displayScore('fourKind') || isRolling(kindScore(4)) }}
                                </div>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card tile flat color="blue-grey darken-2" class="score-item white--text">
                    <v-card-title>
                        <div class="headline">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="score-icon" dark v-on="on">mdi-home</v-icon>
                                </template>
                                <span>Full House - 25 points</span>
                            </v-tooltip>
                            <div class="score-input">
                                <div
                                    class="score"
                                    :class="[{'potential-score': player.score.fullHouse === null && rollNumber > 1}]"
                                    @click="addScore({'field':'fullHouse', 'id': player.id, 'value':fullHouseScore()})">
                                    {{ displayScore('fullHouse') || isRolling(fullHouseScore()) }}
                                </div>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card tile flat color="blue-grey lighten-1" class="score-item">
                    <v-card-title>
                        <div class="headline">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon dark class="score-icon" v-on="on">mdi-cards</v-icon>
                                </template>
                                <span>Small Straight - 30 points</span>
                            </v-tooltip>
                            <div class="score-input">
                                <div
                                    class="score"
                                    :class="[{'potential-score': player.score.lowStraight === null && rollNumber > 1}]"
                                    @click="addScore({'field':'lowStraight', 'id': player.id, 'value':straightScore(4)})">
                                    {{ displayScore('lowStraight') || isRolling(straightScore(4)) }}
                                </div>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card tile flat color="blue-grey darken-2" class="score-item white--text">
                    <v-card-title>
                        <div class="headline">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="score-icon" dark v-on="on">mdi-cards</v-icon>
                                </template>
                                <span>Large Straight - 40 points</span>
                            </v-tooltip>
                            <div class="score-input">
                                <div
                                    class="score"
                                    :class="[{'potential-score': player.score.highStraight === null && rollNumber > 1}]"
                                    @click="addScore({'field':'highStraight', 'id': player.id, 'value':straightScore(5)})">
                                    {{ displayScore('highStraight') || isRolling(straightScore(5)) }}
                                </div>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card tile flat color="blue-grey lighten-1" class="score-item">
                    <v-card-title>
                        <div class="headline">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon dark class="score-icon" v-on="on">mdi-alpha-t-box</v-icon>
                                </template>
                                <span>Tristzee - 50 points / 100 subsequents</span>
                            </v-tooltip>
                            <div class="score-input">
                                <div
                                    class="score"
                                    :class="[{'potential-score': (player.score.tristzee === null && rollNumber > 1) || kindScore(5) === 100}]"
                                    @click="addScore({'field':'tristzee', 'id': player.id, 'value':kindScore(5)})">
                                    {{ displayScore('tristzee') || isRolling(kindScore(5)) }}
                                </div>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card tile flat color="blue-grey darken-2" class="score-item white--text">
                    <v-card-title>
                        <div class="headline">
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="score-icon" dark v-on="on">mdi-help-box</v-icon>
                                </template>
                                <span>Chance - Score Total of All 5 Dice</span>
                            </v-tooltip>
                            <div class="score-input">
                                <div
                                    class="score"
                                    :class="[{'potential-score': player.score.chance === null && rollNumber > 1}]"
                                    @click="addScore({'field':'chance', 'id': player.id, 'value':kindScore(1)})">
                                    {{ displayScore('chance') || isRolling(kindScore(1)) }}
                                </div>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-flex>
    </v-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    props: [
        'player'
    ],
    computed: {
        ...mapGetters([
            'upperTotal',
            'upperTotalWithBonus'
        ]),
        ...mapState([
            'rollNumber',
            'dice',
            'rolling'
        ])
    },
    methods: {
        ...mapActions([
            'addScore'
        ]),
        displayScore (field, num) {
            if (this.player.score[field] === 0) {
                return '0'
            } else if (this.player.score[field]) {
                return this.player.score[field]
            } else if (!this.rolling && num){
                return this.potentialUpperItemScore(num)
            }
        },
        potentialUpperItemScore (n) {
            if (this.rollNumber > 1) {
                return this.dice
                    .filter(d => d.value === n)
                    .map(d => d.value)
                    .reduce((a, b) => a + b, 0)
            }
        },
        isRolling (func) {
            if(!this.rolling) {
                return func
            }
        },
        countInArray (array, num) {
            return array.filter(x => x === num).length
        },
        kindScore (number) {
            if (this.rollNumber > 1) {
                const allDiceValues = this.dice
                    .map(d => d.value)
                const arr = [1, 2, 3, 4, 5, 6]
                const newArr = []
                arr.forEach(val => {
                    newArr.push(this.countInArray(allDiceValues, val))
                })
                if (number === 5 && newArr.find(c => c >= number) && this.player.score.tristzee >= 50) {
                    return 100
                } else if (number === 5 && newArr.find(c => c >= number)) {
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
                const allDiceValues = this.dice
                    .map(d => d.value)
                const arr = [1, 2, 3, 4, 5, 6]
                const newArr = []
                arr.forEach(val => {
                    newArr.push(this.countInArray(allDiceValues, val))
                })
                return newArr.includes(3) && newArr.includes(2) ? 25 : 0
                // add rule to accept tristzee as valid full house when tristzee assigned 0 ?
            }
        },
        straightScore (num) {
            if (this.rollNumber > 1) {
                const allDiceValues = this.dice
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
        }
    }
}
</script>

<style>
.potential-score{
    animation-name: color;
    animation-duration: 1.6s;
    animation-iteration-count: infinite;
    cursor: pointer;
}
.v-card__title {
    padding: 0 !important;
}
.score-icon {
    /* font-size: 1.8em; */
    font-size: 2.2em;
    margin: 0 auto;
}
.score-input {
    display: inline-block;
    background-color: #ECEFF1;
    /* height: 1.3em;
    width: 30vw; */
    height: 1.7em;
    width: 24vw;
    border-radius: 5px;
    position: relative;
}
.score {
    /* font-size: 24px; */
    font-size: 32px;
    color: #263238;
    font-weight: 900;
    position: absolute;
    /* top: 2%; */
    top: 11%;
    left: 10%;
}
.bonus-score {
    font-size: 24px;
    color: #263238;
    font-weight: 900;
    position: absolute;
    /* top: 2%; */
    top: 12%;
    left: 4%;
}
@keyframes color {
  0% {
    color: #ECEFF1;
  }
  50% {
    color: #006064;
  }
  100% {
    color: #eceff1;
  }
}
@media only screen and (min-height: 600px) {
    .score-icon {
        font-size: 2.6em;
    }
    .score-input {
        height: 2em;
    }
    .score {
        font-size: 36px;
        top: 16%;
    }
    .bonus-score {
        top: 18%;
        left: 5%;
    }
}
@media only screen and (min-height: 700px) {
    .score-icon {
        font-size: 3em;
    }
    .score-input {
        height: 2.4em;
        width: 22vw;
    }
    .score {
        font-size: 36px;
        top: 24%;
    }
    .bonus-score {
        top: 18%;
        left: 5%;
    }
}
@media (min-width: 360px) and (min-height: 800px) {
    .score-icon {
        font-size: 3.6em;
    }
    .score-input {
        height: 2.9em;
    }
    .score {
        font-size: 45px;
        top: 23%;
    }
    .bonus-score {
        font-size: 32px;
        top: 27%;
        left: 5%;
    }
}
@media (min-width: 360px) and (max-height: 699px){
    .score-input {
        width: 25vw;
    }
}
@media only screen and (min-width: 500px){
    .score-input {
        width: 30vw;
    }
}
@media (min-width: 700px) and (min-height: 1000px){
    .score-icon {
        font-size: 4.8em;
    }
    .score-input {
        height: 4em;
        width: 30vw
    }
    .score {
        font-size: 70px;
        top: 33%;
    }
    .bonus-score {
        font-size: 54px;
        top: 33%;
        left: 5%;
    }
}
@media only screen and (min-width: 1080px){
    .score-input {
        width: 30vw;
    }
}
</style>
