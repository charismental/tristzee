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
        value : 1,
        held : false
      },
      {
        id : 2,
        value : 2,
        held : false
      },
      {
        id : 3,
        value : 3,
        held : false
      },
      {
        id : 4,
        value : 4,
        held : false
      },
      {
        id : 5,
        value : 5,
        held : false
      }
    ],
    rollNumber : 1
  },
  mutations: {
    rollDice (state) {
      state.rollNumber <= 3 ? state.dice.map(d => !d.held ? d.value = Math.floor((Math.random() * 6) + 1) : null) : alert('Too many turns, you jerk')
      state.rollNumber++
    },
    resetRoll (state) {
      state.rollNumber = 1;
      state.dice.map(d => {
        d.value = d.id
        d.held = false
      })
    },
    holdDie (state, payload) {
      const die = state.dice.find(d => d.id === payload.id)
      state.dice[die.id - 1] = Object.assign({}, die, { held: !die.held })
    }
  },
  actions: {

  }
})
