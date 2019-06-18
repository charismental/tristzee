import Vue from 'vue'
import Router from 'vue-router'
import Game from './views/Game.vue'
import Score from './views/Score.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Game',
      component: Game
    },
    {
      path: '/Score',
      name: 'score',
      component: Score
    }
  ]
})
