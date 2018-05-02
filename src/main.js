// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'mint-ui/lib/style.css'
import './assets/css/reset.css'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import {Toast , Indicator , MessageBox} from 'mint-ui'
import plus from './public'
// import FastClick from 'fastclick'
plus.set_font(750)   //rem
Vue.config.productionTip = false

Vue.prototype.$toast = Toast
Vue.prototype.$loading = Indicator
Vue.prototype.$msgbox = MessageBox
Vue.prototype.plus = plus

import axiosPlugin from "./server";
Vue.use(axiosPlugin.plugin);

// Vue.prototype.$http = axiosPlugin.plugin


// fastclick,解决移动端300ms延迟
// if ('addEventListener' in document) {
//   document.addEventListener('DOMContentLoaded', function() {
//     FastClick.attach(document.body)
//   }, false)
// }


Vue.filter('formatNumber',function (num) {
  var parts;
  num = parseFloat(num)
  if (!isNaN(parseFloat(num)) && isFinite(num)) {
    num = num.toString();
    parts = num.split('.');
    parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + ',');
    return parts.join('.');
  }
  return 0;
})
Vue.filter('filterHtml',function (str) {
  return str.replace(/<[^>]+>/g,"");
})

router.beforeEach((to,from,next) => {
  if(to.matched.some(res => res.meta.requireLogin)){  //判断页面是否需要登录
    if(store.state.userInfo.account){
      next();
    }else{
      store.commit('SHOW_GLOBAL_LOGIN',true)
    }
  }else{
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
