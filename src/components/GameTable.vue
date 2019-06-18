<template>
  <div class="game-table">
    <div id="d-one" class="dice">
      <div class="dot" style="opacity:0;"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot" style="opacity:0;"></div>
    </div>
    <div id="d-two" class="dice">
      <div class="dot"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot"></div>
    </div>
    <div id="d-three" class="dice">
      <div class="dot" style="opacity:0;"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot" style="opacity:0;"></div>
    </div>
    <div  id="d-four" class="dice">
      <div class="dot" style="opacity:0;"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot" style="opacity:0;"></div>
    </div>
    <div id="d-five" class="dice">
      <div class="dot"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot"></div>
      <div class="dot" style="opacity:0;"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'GameTable',
  computed: {
    ...mapState([
      'gameRunning',
      'players',
      'dice',
      'rollNumber'
    ]),
    ...mapMutations([
      'rollDice'
    ])
  }
}
</script>

<style scoped>
.game-table {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.dice {
  position: relative;
  height: 48px;
  width: 48px;
  background-color: #FFF;
  border: 2px solid #000;
  display: inline-grid;
  padding-top: 3px;
  padding-left: 3px;
  grid-gap: 3px;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
  grid-template-areas: "a b c"
                      "d e f"
                      "g h i";
}
.dot {
  height: 10px;
  width: 10px;
  background-color: #000;
  border-radius: 50%;
}
.one {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.two {

}
.three {

}
.four {

}
.five {

}
.six {

}
</style>
