// Core
import Vue from 'vue';

// Components
import App from './App.vue';

export const eventEmitter = new Vue();

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
