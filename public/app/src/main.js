// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json

'use strict'
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueHighcharts from 'vue-highcharts';
import routes from './routes'
import stores from './stores'
import wysiwyg from "vue-wysiwyg";


import Layout from './Layout.vue'
import LayoutAgent from './LayoutAgent.vue'
import Auth from './auth.js'
const Home = {template: '<div id="app"><router-view></router-view></div>'}

import Moment from 'moment'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueHighcharts)
Vue.use(wysiwyg, {});

const router = new VueRouter({
  routes,
  // mode:   'history'
  
})
const store = new Vuex.Store(stores);  





Vue.http.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('token') 


Vue.http.interceptors.push((request, next) => {
    store.dispatch('loading');
    next((response)=>{
         store.dispatch('idle');
      });
});
 
Vue.filter('fromUTC', function (value) {
  if (!value) return ''
  return moment.utc(value).format("DD/MM/YYYY")
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    var role = to.meta
    Auth.checkAuth(store, role, function(status, redirect) {
      if(status) next()
      else next({path:'/eto-login'})
    })
  } else {

    next() // make sure to always call next()!
  }
})


var _vue = new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  render: (h) => h(LayoutAgent),
})

