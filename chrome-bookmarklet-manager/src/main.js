import Vue from 'vue'
import App from './App.vue'
import BookmarkStore from './util/BookmarkStore'

Vue.config.productionTip = false

new Vue({
  data: {
    sharedState: BookmarkStore.state
  },
  render: h => h(App)
}).$mount('#app')
