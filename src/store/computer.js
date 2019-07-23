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
        addUpper ({ getters, state, commit, dispatch }, num) {
            console.log(`I'll go for my ${getters.fieldByNumber(num)}` )
            dispatch('addScore', {'field': getters.fieldByNumber(num), 'id': getters.activePlayer.id, 'value': state.potentialScores[getters.fieldByNumber(num)]})
            commit('resetStepNumber')
        },
        fourKindStrategy ({getters, dispatch, rootState, commit, state}) {
            // which roll is it? go for tristzee?
            console.log('I can get behind a four of a kind!')
            if (rootState.rollNumber < 4) {
                console.log('Wonder if I can make this a Tristzee??')
                // hold relevant dice
                dispatch('rollDice', 8)
            } else {
                return
            }
        },
        tristzeeStrategy ({ getters, dispatch, rootState, commit }) {
            console.log('Sweet, I got a Tristzee!')
            if (getters.activePlayer.score.tristzee === null) {
                console.log('I\'ll take the tristzee, please')
                dispatch('addScore', {'field':'tristzee', 'id': getters.activePlayer.id, 'value':getters.kindScore(5)})
                commit('resetStepNumber')
            } else if (getters.activePlayer.score.tristzee >= 50) {
                console.log('I\'ll take the bonus tristzee, baby!')
                dispatch('addScore', {'field':'tristzee', 'id': getters.activePlayer.id, 'value':getters.kindScore(5)})
                commit('resetStepNumber')
            } else if (rootState.dice[0].value >= 4){
                console.log('Yum! High value Tristzee! Let\'s see what\'s available!')
                // make separate action for this
                if (getters.availableFields.includes(getters.fieldByNumber(rootState.dice[0].value))) {
                    // console.log(`I'll go for my ${getters.fieldByNumber(rootState.dice[0].value)}` )
                    // dispatch('addScore', {'field': getters.fieldByNumber(rootState.dice[0].value), 'id': getters.activePlayer.id, 'value': state.potentialScores[getters.fieldByNumber(rootState.dice[0].value)]})
                    // commit('resetStepNumber')
                    dispatch('addUpper', rootState.dice[0].value)
                } else if (getters.available.includes('fourKind')) {
                    console.log('four of a kind aint bad...')
                    dispatch('addScore', {'field':'fourKind', 'id': getters.activePlayer.id, 'value':getters.kindScore(4)})
                    commit('resetStepNumber')
                } else if (getters.available.includes('threeKind')) {
                    console.log('I suppose three of a kind isnt the worst...')
                    dispatch('addScore', {'field':'threeKind', 'id': getters.activePlayer.id, 'value':getters.kindScore(3)})
                    commit('resetStepNumber')
                } else {
                    console.log('Come up with something else, I guess...')
                }
            } else {
                console.log('Bummer! These are some pretty low value dice, let\'s see what else we can do with these...')
                if (getters.available.includes(getters.fieldByNumber(rootState.dice[0].value))) {
                    // console.log(`guess ill just add ${state.potentialScores[getters.fieldByNumber(rootState.dice[0].value)]} to ${getters.fieldByNumber(rootState.dice[0].value)}`)
                    // dispatch('addScore', {'field': getters.fieldByNumber(rootState.dice[0].value), 'id': getters.activePlayer.id, 'value': state.potentialScores[getters.fieldByNumber(rootState.dice[0].value)]})
                    // commit('resetStepNumber')
                    dispatch('addUpper', rootState.dice[0].value)
                } else if (getters.available.includes('fourKind')) {
                    console.log('Four of a kind will have to do...')
                    dispatch('addScore', {'field':'fourKind', 'id': getters.activePlayer.id, 'value':getters.kindScore(4)})
                    commit('resetStepNumber')
                    // check to see if it's smarter to go for fullhouse???
                } else if (getters.available.includes('threeKind')) {
                    console.log('I suppose three of a kind isnt the worst...')
                    dispatch('addScore', {'field':'threeKind', 'id': getters.activePlayer.id, 'value':getters.kindScore(3)})
                    commit('resetStepNumber')
                } else {
                    console.log('out of ideas for now')
                }
            }
        },
        setVal ({state, getters, rootState}) {
            Object.keys(state.potentialScores).forEach(num => {
                state.potentialScores[num] = rootState.dice
                    .filter(d => d.value === getters.numberByField(num))
                    .map(d => d.value)
                    .reduce((a, b) => a + b, 0)
            })
        },
        robotStep ({dispatch, state, commit, rootState}) {
            if (rootState.rollNumber === 1) {
                console.log('They see me rollin')
                dispatch('rollDice', 8)
            } else if (state.stepNumber === 2){
                dispatch('logInfo')
            } else if (state.stepNumber === 3){
                dispatch('optimizeStrategy')
                // happy with roll ? dispatch('addScore', {'field': field, 'id': id, 'value': value})
                // hold dice && roll
            } 
            commit('incrementStepNumber')
        },
        logInfo({state, getters, dispatch}) {
            console.log('heres what im working with', getters.allDiceValues, getters.availableFields)
            dispatch('setVal')
            console.log(getters.lowerPossibilities)
            console.log('Here are the potential scores: ', state.potentialScores)
        },
        optimizeStrategy({state, getters, dispatch}) {
            try {
                switch (getters.lowerPossibilities) {
                    case 'tristzee':
                    dispatch('tristzeeStrategy')
                    break
                    case 'fourKind':
                    dispatch('fourKindStrategy')
                    break
                    case 'fullHouse':
                    dispatch('fullHouseStrategy')
                    break
                    case 'twoPair':
                    dispatch('twoPairStrategy')
                    break
                    case 'threeKind':
                    dispatch('threeKindStrategy')
                    break
                    case 'largeStraight':
                    dispatch('largeStraightStrategy')
                    break
                    case 'smallStraightPair':
                    dispatch('smallStraightPairStrategy')
                    break
                    case 'smallStraight':
                    dispatch('smallStraightStrategy')
                    break
                    case 'onePair':
                    dispatch('onePairStrategy')
                    break
                    case 'nothing':
                    dispatch('nothingStrategy')
                    break
                }
            }
            catch(err) {
                console.log(err.message)
            }
        }
    },
    // if (getters.kindScore(5)) {
    //     console.log('Tristzee!')
    //     if (score.tristzee === null) {
    //         console.log('Ill take the tristzee, please')
    //         dispatch('addScore', {'field':'tristzee', 'id': activePlayer.id, 'value':getters.kindScore(5)})
    //     } else if (score.tristzee >= 50) {
    //         console.log('Ill take the bonus tristzee, baby!')
    //         dispatch('addScore', {'field':'tristzee', 'id': activePlayer.id, 'value':getters.kindScore(5)})
    //     } else if (rootState.dice[0].value >= 4){
    //         console.log('high value tristzee! yum')
    //         if (available.includes('fourKind')) {
    //             console.log('four of a kind aint bad...')
    //             dispatch('addScore', {'field':'fourKind', 'id': activePlayer.id, 'value':getters.kindScore(4)})
    //         } else if (available.includes('threeKind')) {
    //             console.log('I suppose three of a kind isnt the worst...')
    //             dispatch('addScore', {'field':'threeKind', 'id': activePlayer.id, 'value':getters.kindScore(3)})
    //         } else {
    //             console.log('come up with something else, I guess...')
    //         }
    //     } else {
    //         console.log('bummer! lets see what else we can do with this')
    //         if (available.includes(getters.fieldByNumber(rootState.dice[0].value))) {
    //             console.log(`guess ill just add ${state.potentialScores[getters.fieldByNumber(rootState.dice[0].value)]} to ${getters.fieldByNumber(rootState.dice[0].value)}`)
    //             dispatch('addScore', {'field': getters.fieldByNumber(rootState.dice[0].value), 'id': activePlayer.id, 'value': state.potentialScores[getters.fieldByNumber(rootState.dice[0].value)]})
    //         } else if (available.includes('threeKind')) {
    //             console.log('I suppose three of a kind isnt the worst...')
    //             dispatch('addScore', {'field':'threeKind', 'id': activePlayer.id, 'value':getters.kindScore(3)})
    //         } else {
    //             console.log('out of ideas for now')
    //         }
    //     }
    // } else {
    //     console.log('something else')
    // }
    getters: {
        lowerPossibilities: (state, getters) => {
            let possibility = ''
            if (getters.kindScore(5)) {
                possibility = 'tristzee'
            } else if (getters.kindScore(4)) {
                possibility = 'fourKind'
            } else if (getters.fullHouseScore) {
                possibility = 'fullHouse'
            } else if (getters.twoPair) {
                possibility = 'twoPair'
            } else if (getters.kindScore(3)) {
                possibility = 'threeKind'
            } else if (getters.straightScore(5)) {
                possibility = 'largeStraight'
            } else if (getters.smallStraightPair) {
                possibility = 'smallStraightPair'
            } else if (getters.straightScore(4)) {
                possibility = 'smallStraight'
            } else if (getters.onePair) {
                possibility = 'onePair'
            } else {
                possibility = 'nothing'
            }
            return possibility
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
        },
        availableFields: (state, getters) => {
            if (getters.activePlayer) {
                const score = getters.activePlayer.score
                delete score.upperBonus
            return Object.keys(score)
                .filter(val => score[val] === null)
            }
        }
    }
}