/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
export default {
    state: {
        turnStrategy: null,
    },
    mutations: {
        setTurnStrategy1 (state, payload) {
            state.turnStrategy = payload
        }
    },
    actions: {
        robotStep ({dispatch, rootState}) {
            if (rootState.rollNumber === 1) {
                console.log('They see me rollin')
                dispatch('rollDice', 8)
            } else {
                dispatch('setTurnStrategy')
            }
        },
        setTurnStrategy ({state, rootState, commit}) {
            const diceValues = rootState.dice.map(d => d.value)
            const score = rootState.players[0].score
                delete score.upperBonus
            const available = Object.keys(score)
                .filter(val => !score[val])
            console.log('heres what im working with', diceValues, available)
        },
        // damageControl ({state, rootState, commit}) {

        // }
    },
    // getters: {
    //     currentDiceValues: rootState => rootState.dice.map(d => d.value)
    // }
}