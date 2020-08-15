import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
Vue.prototype.$http = axios;
//平行组件通信时用中央器
Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')