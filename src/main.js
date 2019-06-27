import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate() {
		this.$store.commit('initializeStore');
	},
  render: h => h(App)
}).$mount('#app')

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state))
})