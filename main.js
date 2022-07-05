import App from './App'
import userRuleMixin from '@/common/rulesMixin.js'
import commonMixin from '@/common/commonMixin.js'
import store from './store'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.use(userRuleMixin)
Vue.use(commonMixin)
Vue.use(store)
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(userRuleMixin)
  app.use(commonMixin)
  app.use(store)
  return {
    app
  }
}
// #endif