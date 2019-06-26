const state = () => ({
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
          chance: null,
          tristzeeBonus: null
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
  })
  
  export default { state: state() }