import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameRunning: false,
    activePlayerIndex: 0,
    activePlayerID: 1,
    players: [
      {
        id: 1,
        name: 'Tristin',
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
        },
        tristzeeCounter : 0
      }
    ],
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
        },
        tristzeeCounter : 0
      },
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
    addUpperBonus (state, id) {
      const player = state.players.find(p => p.id === id)
      const playerIndex = state.players.indexOf(player)
      Vue.set(state.players[playerIndex].score, 'upperBonus', 35)
    },
    incrementTristzee (state) {
      const newCount = state.players[0].tristzeeCounter++
      // eslint-disable-next-line no-undef
      Vue.set(state.players[0], tristzeeCounter, newCount)
    },
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
    addScore ({ state, commit, dispatch }, { field, value, id }) {
      const player = state.players.find(p => p.id === id)
      const playerIndex = state.players.indexOf(player)
      const score = player.score[field]
      if (!score) {
        state.rollNumber > 1 ? Vue.set(state.players[playerIndex].score, field, value) : ''
        dispatch('switchTurns')
        commit('resetRoll')
      }
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
