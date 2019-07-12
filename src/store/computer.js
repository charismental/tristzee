/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
export default {
    state: {
        turnStrategy: null,
        stepNumber: 1,
        potentialScores: {
            one: null,
            two: null,
            three: null,
            four: null,
            five: null,
            six: null  
        }
    },
    mutations: {
        setTurnStrategy1 (state, payload) {
            state.turnStrategy = payload
        },
        incrementStepNumber (state) {
            state.stepNumber++
        },
        resetStepNumber (state) {
            state.stepNumber = 1
        }
    },
    actions: {
        setVal ({state, getters, rootState}) {
            Object.keys(state.potentialScores).forEach(num => {
                state.potentialScores[num] = rootState.dice
                    .filter(d => d.value === getters.numberByField(num))
                    .map(d => d.value)
                    .reduce((a, b) => a + b, 0)
            })
        },
        robotStep ({dispatch, commit, rootState}) {
            if (rootState.rollNumber === 1) {
                console.log('They see me rollin')
                dispatch('rollDice', 8)
                commit('incrementStepNumber')
            } else {
                dispatch('setTurnStrategy')
            }
        },
        setTurnStrategy ({state, rootState, getters, dispatch, commit}) {
            // const diceValues = rootState.dice.map(d => d.value)
            const activePlayer = rootState.players[rootState.activePlayerIndex]
            const score = activePlayer.score
                delete score.upperBonus
            const available = Object.keys(score)
                .filter(val => score[val] === null)
            if (state.stepNumber === 2) {
                console.log('heres what im working with', getters.allDiceValues, available)
                commit('incrementStepNumber')
            } else if (state.stepNumber > 2) {
                try {
                    dispatch('setVal')
                    if (getters.kindScore(5)) {
                        console.log('Tristzee!')
                        if (score.tristzee === null) {
                            console.log('Ill take the tristzee, please')
                            dispatch('addScore', {'field':'tristzee', 'id': activePlayer.id, 'value':getters.kindScore(5)})
                        } else if (score.tristzee >= 50) {
                            console.log('Ill take the bonus tristzee, baby!')
                            dispatch('addScore', {'field':'tristzee', 'id': activePlayer.id, 'value':getters.kindScore(5)})
                        } else if (rootState.dice[0].value >= 4){
                            console.log('high value tristzee! yum')
                            if (available.includes('fourKind')) {
                                console.log('four of a kind aint bad...')
                                dispatch('addScore', {'field':'fourKind', 'id': activePlayer.id, 'value':getters.kindScore(4)})
                            } else if (available.includes('threeKind')) {
                                console.log('I suppose three of a kind isnt the worst...')
                                dispatch('addScore', {'field':'threeKind', 'id': activePlayer.id, 'value':getters.kindScore(3)})
                            } else {
                                console.log('come up with something else, I guess...')
                            }
                        } else {
                            console.log('bummer! lets see what else we can do with this')
                            if (available.includes(getters.fieldByNumber(rootState.dice[0].value))) {
                                console.log(`guess ill just add ${state.potentialScores[getters.fieldByNumber(rootState.dice[0].value)]} to ${getters.fieldByNumber(rootState.dice[0].value)}`)
                                dispatch('addScore', {'field': getters.fieldByNumber(rootState.dice[0].value), 'id': activePlayer.id, 'value': state.potentialScores[getters.fieldByNumber(rootState.dice[0].value)]})
                            } else if (available.includes('threeKind')) {
                                console.log('I suppose three of a kind isnt the worst...')
                                dispatch('addScore', {'field':'threeKind', 'id': activePlayer.id, 'value':getters.kindScore(3)})
                            } else {
                                console.log('out of ideas for now')
                            }
                        }
                    } else if (getters.kindScore(4)) {
                        console.log('fourKind')
                    } else if (getters.fullHouseScore) {
                        console.log('fullHouse')
                    } else if (getters.twoPair) {
                        console.log('twoPair')
                    } else if (getters.kindScore(3)) {
                        console.log('threeKind')
                    } else if (getters.straightScore(5)) {
                        console.log('largeStraight')
                    } else if (getters.smallStraightPair) {
                        console.log('smallStraightPair')
                    } else if (getters.straightScore(4)) {
                        console.log('smallStraight')
                    } else if (getters.onePair) {
                        console.log('onePair')
                    } else {
                        console.log('something else')
                    }
                }
                catch(err) {
                    console.log(err.message)
                }
            }
                // tristzee && (!score.tristzee || score.tristzee !== 0)
                // highStraight && (!score.highStraight || !score.lowStraight)
                // fourKind(n) && ((!score.tristzee || score.tristzee !== 0) !score.n || !score.fourKind || !score.threeKind)
                // threeKind(n) && (!score.n || !score.fullHouse || (n >=4 && (!score.fourKind || !score.threeKind)
        }
        // damageControl ({state, rootState, commit}) {

        // }
    },
    getters: {
        proxy: (state, getters, rootState) => val => {
            const values = rootState.dice.map(d => d.value)
                .filter(d => d.value === val)
                .map(d => d.value)
                .reduce((a, b) => a + b, 0)
            return values
        },
        fieldByNumber: state => value => {
            let field = ''
            switch (value) {
                case 1:
                field = 'one'
                break
                case 2:
                field = 'two'
                break
                case 3:
                field = 'three'
                break
                case 4:
                field = 'four'
                break
                case 5:
                field = 'five'
                break
                case 6:
                field = 'six'
                break
            }
            return field
        },
        numberByField: state => field => {
            let num = ''
            switch (field) {
                case 'one':
                num = 1
                break
                case 'two':
                num = 2
                break
                case 'three':
                num = 3
                break
                case 'four':
                num = 4
                break
                case 'five':
                num = 5
                break
                case 'six':
                num = 6
                break
            }
            return num
        },
        onePair: (state, getters) => {
              return new Set(getters.allDiceValues).size !== getters.allDiceValues.length
        },
        twoPair: (state, getters) => {
            const findDuplicates = (arr) => {
                const object = {};
                const result = [];
                arr.forEach(val => !object[val] ? object[val] = 1 : object[val] += 1)
                for (let prop in object) {
                    object[prop] >= 2 ? result.push(prop): ''
                }
                return result
            }
            return findDuplicates(getters.allDiceValues).length >= 2
        },
        smallStraightPair: (state, getters) => {
            return getters.straightScore(4) && getters.onePair
        }
    }
}