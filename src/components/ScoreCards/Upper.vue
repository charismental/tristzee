<template>
    <div class="score-sheet">
        <div class="score-item">Ones</div>
        <div 
            class="score-item"
            :class="[{'potential-score': player.score.one === null && rollNumber > 1}]"
            @click="addScore({'field':'one', 'id': player.id, 'value':potentialScore(1)})">
                <span class="score">{{ displayScore('one', 1) }}</span>
        </div>
        <div class="score-item">Twos</div>
        <div 
            class="score-item" 
            :class="[{'potential-score': player.score.two === null && rollNumber > 1}]" 
            @click="addScore({'field':'two', 'id': player.id, 'value':potentialScore(2)})">
                <span class="score">{{ displayScore('two', 2) }}</span>
        </div>
        <div class="score-item">Threes</div>
        <div
            class="score-item"
            :class="[{'potential-score': player.score.three === null && rollNumber > 1}]"
            @click="addScore({'field':'three', 'id': player.id, 'value':potentialScore(3)})">
                <span class="score">{{ displayScore('three', 3) }}</span>
        </div>
        <div class="score-item">Fours</div>
        <div
            class="score-item"
            :class="[{'potential-score': player.score.four === null && rollNumber > 1}]"
            @click="addScore({'field':'four', 'id': player.id, 'value':potentialScore(4)})">
                <span class="score">{{ displayScore('four', 4) }}</span>
        </div>
        <div class="score-item">Fives</div>
        <div
            class="score-item"
            :class="[{'potential-score': player.score.five === null && rollNumber > 1}]"
            @click="addScore({'field':'five', 'id': player.id, 'value':potentialScore(5)})">
                <span class="score">{{ displayScore('five', 5) }}</span>
        </div>
        <div class="score-item">Sixes</div>
        <div
            class="score-item"
            :class="[{'potential-score': player.score.six === null && rollNumber > 1}]"
            @click="addScore({'field':'six', 'id': player.id, 'value':potentialScore(6)})">
                <span class="score">{{ displayScore('six', 6) }}</span>
        </div>
        <div class="score-item">Total Score</div>
        <div class="score-item">
            <!-- <span class="score">{{ totalPoints() }}</span> -->
            <span class="score">{{ upperTotal(player.id) }}</span>

        </div>
        <div class="score-item">Bonus</div>
        <div class="score-item">
            <span class="score">{{ this.player.score.upperBonus }}</span>
        </div>
        <div class="score-item">Total of Upper Section</div>
        <div class="score-item">
            <span class="score">{{ upperTotalWithBonus(player.id) }}</span>
        </div>

    </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

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
        'dice',
        'rollNumber',
        'rolling'
    ])
},
methods: {
    ...mapMutations([
        'addUpperBonus'
    ]),
    displayScore (field, num) {
        if (this.player.score[field] === 0 || this.player.score[field]) {
            return this.player.score[field]
        } else if (!this.rolling){
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
.potential-score{
    background-color: lightblue;
    animation-name: color;
    animation-duration: 1.6s;
    animation-iteration-count: infinite;
}
.potential-score span{
    color: gray;
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

@keyframes color {
  0% {
    background-color: lightblue;
  }
  50% {
    background-color: #00CCFF;
  }
  100% {
    background-color: lightblue;
  }
}
</style>
