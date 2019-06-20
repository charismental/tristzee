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
          one : null,
          two : null,
          three : null,
          four : null,
          five : null,
          six : null
        }
      }
    ],
    dice : [
      {
        id : 1,
        value : 1
      },
      {
        id : 2,
        value : 2
      },
      {
        id : 3,
        value : 3
      },
      {
        id : 4,
        value : 4
      },
      {
        id : 5,
        value : 5
      }
    ],
    heldDice: [],
    rollNumber : 1
  },
  mutations: {
    rollDice (state) {
      state.rollNumber <= 3 ? state.dice.map(d => !d.held ? d.value = Math.floor((Math.random() * 6) + 1) : null) : alert('Too many turns, you jerk')
      state.rollNumber++
    },
    resetRoll (state) {
      state.rollNumber = 1;
      state.heldDice = []
      state.dice = [
        {
          id : 1,
          value : 1
        },
        {
          id : 2,
          value : 2
        },
        {
          id : 3,
          value : 3
        },
        {
          id : 4,
          value : 4
        },
        {
          id : 5,
          value : 5
        }
      ]
    },
    holdDie (state, payload) {
      if (state.rollNumber > 1) {
        const die = state.dice.find(d => d.id === payload.id)
        state.heldDice.push(die)
        state.dice.splice(state.dice.indexOf(payload), 1)
      }
    },
    unholdDie (state, payload) {
      const die = state.heldDice.find(d => d.id === payload.id)
      state.dice.push(die)
      state.heldDice.splice(state.heldDice.indexOf(payload), 1)
    }
  },
  actions: {
    addScore ({ state, commit }, { dieNum, value }) {
      // fix this for multiple players
      const score = state.players[0].score[dieNum]
      if (!score) {
        state.rollNumber > 1 ? Vue.set(state.players[0].score, dieNum, value) : ''
        commit('resetRoll')
      }
    }
  }
})
