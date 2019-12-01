import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import '@/assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css';
// 引入axios
import  '@/assets/js/axios.config.js'
Vue.use(ElementUI);
// 时间过滤器
import Moment from 'moment'
Vue.filter('convertTime', function(data, formatStr){
   return Moment(data).format(formatStr+' h:mm:ss')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
