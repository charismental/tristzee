import Vue from 'vue'
import Vuex from 'vuex'
import initial from './store/initialState'
// import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    initial
  },
  state: {
    gameRunning: false,
    activePlayerIndex: 0,
    activePlayerID: 1,
    finishedPlayers: [],
    players: [],
    playerTemplate: 
      {
        id: null,
        name: '',
        score: {
          one: null,
          two: null,
          three: null,
          four: null,
          five: null,
          six: null,
          upperBonus: null,
          threeKind: null,
          fourKind: null,
          fullHouse: null,
          lowStraight: null,
          highStraight: null,
          tristzee: null,
          chance: null
        }
      },
    dice: [
      {
        id: 1,
        value: 1,
        held: false
      },
      {
        id: 2,
        value: 2,
        held: false
      },
      {
        id: 3,
        value: 3,
        held: false
      },
      {
        id: 4,
        value: 4,
        held: false
      },
      {
        id: 5,
        value: 5,
        held: false
      }
    ],
    rollNumber: 1,
    rolling: false
  },
  mutations: {
    setRolling(state, payload) {
      state.rolling = payload
    },
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
    gameRunningToggle (state, bool) {
      state.gameRunning = bool
    },
    incrementRollNumber (state) {
      state.rollNumber++
    },
    randomizeDice (state) {
      state.dice.map(d => !d.held ? d.value = Math.floor((Math.random() * 6) + 1) : null)
    },
    addUpperBonus (state, id) {
      const player = state.players.find(p => p.id === id)
      const playerIndex = state.players.indexOf(player)
      state.players[playerIndex].score.upperBonus === null ? Vue.set(state.players[playerIndex].score, 'upperBonus', 35) : ''
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
    removePlayer({ state, getters }, id) {
      const player = state.players.find(p => p.id === id)
      player.grandTotal = getters.grandTotal(id)
      state.finishedPlayers.push(player)
      const playerIndex = state.players.indexOf(player)
      state.players.splice(playerIndex, 1)
    },
    playerGameOverCheck ({ state, commit, dispatch }, id) {
      const player = state.players.find(p => p.id === id)
      const score = JSON.parse(JSON.stringify(player.score))
      delete score.upperBonus
      const shouldHaveMoreTurns = Object.values(score).some(x => x === null)
      if (!shouldHaveMoreTurns && state.players.length > 1) {
        dispatch('removePlayer', id)
      } else if (!shouldHaveMoreTurns) {
        commit('gameRunningToggle', false)
        dispatch('removePlayer', id)
      }
    },
    rollDice ({ commit, state, dispatch }, num) {
      if (state.rollNumber <= 3) {
        commit('setRolling', true)
        commit('randomizeDice')
        num--
        if (num < 1) {
          commit('incrementRollNumber')
          commit('setRolling', false)
          return
        }
        setTimeout(() => dispatch('rollDice', num), 100)
      }
    },
    newGame ({ commit }) {
      commit('resetState')
    },
    addScore ({ state, dispatch, getters, commit }, { field, value, id }) {
      const player = state.players.find(p => p.id === id)
      const playerIndex = state.players.indexOf(player)
      const score = player.score[field]
      if (isNaN(value)) {
        return
      }
      if (value === 100) {
        state.players[playerIndex].score.tristzee += 100
      } else if (!score) {
        state.rollNumber > 1 ? Vue.set(state.players[playerIndex].score, field, value) : ''
        getters.upperTotal(id) >= 63 ? commit('addUpperBonus', id) : ''
      }
      dispatch('switchTurns')
    },
    createPlayer ({ state }, name) {
      let newPlayer = JSON.parse(JSON.stringify(state.playerTemplate))
      newPlayer.id = state.players.length + 1
      newPlayer.name = name ? name : 'Derp-Derp'
      state.players.push(newPlayer)
    },
    switchTurns ({ state, commit, dispatch }) {
      const players = state.players.map(p => p.id)
      setTimeout(()=>{
        state.activePlayerIndex++
        dispatch('playerGameOverCheck', state.activePlayerIndex)
        state.activePlayerIndex = state.activePlayerIndex % players.length
        state.activePlayerID = players[state.activePlayerIndex]
        commit('resetRoll')
      }, 500)
    }
  },
  getters: {
    activePlayer: state => {
      return state.players.find(p => p.id === state.activePlayerID)
    },
    upperTotal: state => (id) => {
      const player = state.players.find(p => p.id === id)
      const score = player.score
      const total = score.one + score.two + score.three + score.four + score.five + score.six
      return total
    },
    upperTotalWithBonus: (state, getters) => (id) => {
      const player = state.players.find(p => p.id === id)
      return getters.upperTotal(id) + player.score.upperBonus
    },
    lowerTotal: state => (id) => {
      const player = state.players.find(p => p.id === id)
      const score = player.score
      const total = score.threeKind + score.fourKind + score.fullHouse + score.lowStraight + score.highStraight + score.tristzee + score.chance
      return total
    },
    grandTotal: state => (id) => {
      const player = state.players.find(p => p.id === id)
      const score = player.score
      const total = Object.values(score)
        .reduce((a,b) => a + b, 0)
      return total
    }
  }
})
