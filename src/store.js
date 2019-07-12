import Vue from 'vue'
import Vuex from 'vuex'
import initial from './store/initialState'
import computer from './store/computer'
// import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    initial,
    computer
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
        isComputer: false,
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
        dispatch('switchTurns')
      } else if (!score) {
        state.rollNumber > 1 ? Vue.set(state.players[playerIndex].score, field, value) : ''
        getters.upperTotal(id) >= 63 ? commit('addUpperBonus', id) : ''
        dispatch('switchTurns')
      }
    },
    createPlayer ({ state }, {name, isComputer}) {
      let newPlayer = JSON.parse(JSON.stringify(state.playerTemplate))
      newPlayer.id = state.players.length + 1
      newPlayer.name = name ? name : 'Derp-Derp'
      newPlayer.isComputer = isComputer
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
    allHeld: state => {
      return state.dice.every(v => v.held === true)
    },
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
    },
    allDiceValues: state => {
      return state.dice
        .map(d => d.value)
        .sort((a, b) => a-b)
    },
    potentialUpperItemScore: state => (number) => {
      if (state.rollNumber > 1) {
        return state.dice
          .filter(d => d.value === number)
          .map(d => d.value)
          .reduce((a, b) => a + b, 0)
      }
    },
    kindScore: (state, getters) => (number) => {
      if (state.rollNumber > 1) {
          const arr = [1, 2, 3, 4, 5, 6]
          const newArr = []
          const countInArray = (array, num) => {
            return array.filter(x => x === num).length
          }
          arr.forEach(val => {
              newArr.push(countInArray(getters.allDiceValues, val))
          })
          // does this work for finding activeplayer?
          if (number === 5 && newArr.find(c => c >= number) && state.players[state.activePlayerIndex].score.tristzee >= 50) {
              return 100
          } else if (number === 5 && newArr.find(c => c >= number)) {
              return 50
          } else if (newArr.find(c => c >= number)) {
              return getters.allDiceValues.reduce((a, b) => a + b, 0)
          } else {
              return 0
          }
      }
    },
    fullHouseScore: (state, getters) => {
      if (state.rollNumber > 1) {
          const arr = [1, 2, 3, 4, 5, 6]
          const countInArray = (array, num) => {
            return array.filter(x => x === num).length
          }
          const newArr = []
          arr.forEach(val => {
              newArr.push(countInArray(getters.allDiceValues, val))
          })
          return newArr.includes(3) && newArr.includes(2) ? 25 : 0
          // add rule to accept tristzee as valid full house when tristzee assigned 0 ?
      }
    },
    straightScore: (state, getters) => (num) => {
      if (state.rollNumber > 1) {
          const uniques = Array.from(new Set(getters.allDiceValues))
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
})
