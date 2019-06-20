import Vue from 'vue'
import Router from 'vue-router'
import UpperScore from './views/UpperScore.vue'
import LowerScore from './views/LowerScore.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'upper score',
      component: UpperScore
    },
    {
      path: '/lower',
      name: 'lower score',
      component: LowerScore
    }
  ]
})
