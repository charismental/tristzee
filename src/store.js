import Vue from 'vue'
import Vuex from 'vuex'
import initial from './store/initialState'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    initial
  },
  state: {
    gameRunning: false,
    activePlayerIndex: 0,
    activePlayerID: 1,
    players: [],
    playerTemplate: 
      {
        id: null,
        name: '',
        score: {
          one : null,
          two : null,
          three : null,
          four : null,
          five : null,
          six : null,
          upperBonus : null,
          threeKind : null,
          fourKind : null,
          fullHouse : null,
          lowStraight : null,
          highStraight : null,
          tristzee : null,
          chance : null,
          tristzeeBonus : null
        }
      },
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
    resetState(state) {
      const initialState = JSON.stringify(state.initial)
      this.replaceState(Object.assign(state, JSON.parse(initialState)))
    },
    initializeStore(state) {
			if(localStorage.getItem('store')) {
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				)
			}
		},
    startGame (state) {
      state.gameRunning = true
    },
    rollDice (state) {
      if (state.rollNumber <= 3) {
        state.dice.map(d => !d.held ? d.value = Math.floor((Math.random() * 6) + 1) : null)
        state.rollNumber++
      }
    },
    addUpperBonus (state, id) {
      const player = state.players.find(p => p.id === id)
      const playerIndex = state.players.indexOf(player)
      Vue.set(state.players[playerIndex].score, 'upperBonus', 35)
    },
    resetRoll (state) {
      state.rollNumber = 1;
      const oldDice = state.dice.slice(0)
      const unheld = oldDice.map(d => Object.assign({}, d, { held: false }))
      state.dice = unheld
    },
    holdUnholdDie (state, payload) {
      if (state.rollNumber > 1) {
        const die = state.dice.find(d => d.id === payload.id)
        const dieIndex = state.dice.indexOf(die)
        const held = die.held
        Vue.set(state.dice[dieIndex], 'held', !held)
      }
    }
  },
  actions: {
    newGame ({ commit }) {
      commit('resetState')
    },
    addScore ({ state, commit, dispatch }, { field, value, id }) {
      const player = state.players.find(p => p.id === id)
      const playerIndex = state.players.indexOf(player)
      const score = player.score[field]
      if (isNaN(value)) {
        return
      }
        if (value === 100  && !state.players[playerIndex].score.tristzeeBonus) {
        state.players[playerIndex].score.tristzeeBonus = 100
      } else if (value === 100 && state.players[playerIndex].score.tristzeeBonus) {
        state.players[playerIndex].score.tristzeeBonus += 100
      } else if (!score) {
        state.rollNumber > 1 ? Vue.set(state.players[playerIndex].score, field, value) : ''
      }
      dispatch('switchTurns')
      commit('resetRoll')
    },
    createPlayer ({ state }, name) {
      // const newPlayer = {...state.playerTemplate}
      // const newPlayer = Object.assign(state.playerTemplate)
      // what a weird way to have to deep clone an object...
      let newPlayer = JSON.parse(JSON.stringify(state.playerTemplate))
      newPlayer.id = state.players.length + 1
      newPlayer.name = name
      state.players.push(newPlayer)
    },
    switchTurns ({ state }) {
      const players = state.players.map(p => p.id)
      state.activePlayerIndex++
      state.activePlayerIndex = state.activePlayerIndex % players.length
      state.activePlayerID = players[state.activePlayerIndex]
    },
  }
})
