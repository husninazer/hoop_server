import App from './App.vue'
import Vue from 'vue'

export const routes = [
    {path: '/eto-login', component: App, beforeEnter: (to, from, next) => {
        if (!!localStorage.getItem('token')) next({path: '/eto/travel-orders'})
        else next()
      }}
]
