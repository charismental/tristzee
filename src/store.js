import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameRunning: false,
    players: [
      {
        id : 1,
        name: 'Tristin',
        score: {
          1 : null,
          2 : null,
          3 : null,
          4 : null,
          5 : null,
          6 : null
        }
      }
    ],
    dice : [
      {
        id : 1,
        value : null,
        held : false
      },
      {
        id : 2,
        value : null,
        held : false
      },
      {
        id : 3,
        value : null,
        held : false
      },
      {
        id : 4,
        value : null,
        held : false
      },
      {
        id : 5,
        value : null,
        held : false
      },
      {
        id : 6,
        value : null,
        held : false
      }
    ],
    rollNumber : null
  },
  mutations: {
    rollDice (state) {
      state.dice.map(die => die.value = Math.floor((Math.random() * 6) + 1))
    }
  },
  actions: {

  }
})
