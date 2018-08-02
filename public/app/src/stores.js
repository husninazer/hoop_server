
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const LOADING = "LOADING"
const IDLE = "IDLE"
const PUSHTOAST = "PUSHTOAST"
const CURRENT_USER = "CURRENT_USER"

import Vue from 'vue'

export default {
    
  state: {
    currentUser: {}, 
    isLoggedIn: !!localStorage.getItem("token"),
    reqBuffer: [],
    toast: []
  },
  
  mutations: {
    [LOGIN] (state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGOUT](state) {
      state.isLoggedIn = false;
    },
    
    [LOADING] (state) {
      state.reqBuffer.push("REQ")
    },
    
    [IDLE] (state) {
      state.reqBuffer.pop()
    },
    
    [PUSHTOAST] (state, {msg: msg, type: type}) {
        state.toast.push({msg: msg, type: type})
    },
    
    [CURRENT_USER] (state, {user: user}) {
        state.currentUser = user
    }
  },
  
  actions: {
   login({ commit }, creds) {
     commit(LOGIN); // show spinner
     return new Promise(resolve => {
       
        Vue.http.post('/users/authenticate', creds).then(response => {
              localStorage.setItem('token', response.data.user.token)
              localStorage.setItem('firstName', response.data.user.firstName)
              localStorage.setItem('lastName', response.data.user.lastName)
              Vue.http.headers.common['Authorization'] = 'JWT ' + response.data.user.token
              
              
              commit(CURRENT_USER, {user: response.data.user.user})
              commit(LOGIN_SUCCESS);
             resolve();
        }, response => {
          commit(PUSHTOAST, {msg: "Username / Password Incorrect", type: "error"})
        })

     });
   },
   logout({ commit }) {
     localStorage.removeItem('token')
      localStorage.removeItem('firstName')
      localStorage.removeItem('lastName')
     commit(LOGOUT);
   },
   updateCurrentUser({ commit }, user) {
       commit(CURRENT_USER, {user: user})
   },
   
   loading({commit}) {
     commit(LOADING)
   },
   
   idle({commit}) {
     commit(IDLE)
   },
   
   pushToast({commit}, {msg, type}) {
       commit(PUSHTOAST, {msg: msg, type: type})
   },
   
 },
 getters: {
  isLoggedIn: state => {
    return state.isLoggedIn
   },
   
   isLoading: state => {
     return state.isLoading
   },
   
   currentUser: state => {
       return state.currentUser
   }
}
}