<template>

<div class="index-page">

<transition name="slide-fade" :delay="20000" :duration="0">
<agent-navigation v-if="isLoggedIn"></agent-navigation>
</transition>


<div id="app">
    
         <router-view></router-view>
        
    	<footer class="footer">
    	<spinner v-if="!!$store.state.reqBuffer.length"  message="Loading..." text-fg-color="#00447c" line-fg-color="#00447c" size="50"></spinner>
			<div class="container">
			   <vue-toast ref='toast' position="right bottom"></vue-toast>
			</div>
		</footer>
		
		
		  
</div>

</div>


</template>


<script>
import Auth from './auth'
import AgentNavigation from './zax/AgentNavigation.vue'
import Spinner from 'vue-simple-spinner'

//import 'vue-toast/dist/vue-toast.min.css'
import VueToast from 'vue-toast'

export default {
	name: 'layout',
	props: ['spinning'],
	components: {
		'agent-navigation': AgentNavigation,
		'spinner': Spinner,
		VueToast
	},
    data: function() {
        return {
            auth: Auth,
        }
    },
    methods: {
        logout: function() {
            Auth.logout(this)
        },
        
       
        

    },
    
    computed: {
        isLoggedIn() {
          return this.$store.getters.isLoggedIn;
        },
         notLoginPage () {
            if(this.$router.currentRoute.fullPath == '/eto/login') return false
            else return true
        },
        
        // Lsitening to changes in store - toast
        ToastStore: function() {
          return this.$store.state.toast
        },
      
        
        
    },
    
    
    watch: {
      ToastStore: function() {
        var toast = this.$refs.toast
          toast.setOptions({
                  position: 'bottom right',
                  maxToasts : 4
          })
          
          toast.showToast(this.$store.state.toast[this.$store.state.toast.length-1].msg ,{
            theme: this.$store.state.toast[this.$store.state.toast.length-1].type
          })
          
          
      }
    }
    


}

</script>

<style>
.vue-toast-manager_container {
  position: fixed;
  width: 100%; }
  .vue-toast-manager_container.__top {
    top: 10px; }
  .vue-toast-manager_container.__bottom {
    bottom: 10px; }
  .vue-toast-manager_container.__left {
    left: 10px; }
  .vue-toast-manager_container.__right {
    right: 10px; }

.vue-toast-manager_toasts {
  position: relative; }

.vue-toast_container {
  position: absolute;
  padding-bottom: 4px;
  transform: translateY(0);
  transition: transform .2s ease-out;
  backface-visibility: hidden; }
  .vue-toast_container._default .vue-toast_message {
    background-color: rgba(0, 0, 0, 0.9); }
  .vue-toast_container._info .vue-toast_message {
    background-color: rgba(49, 112, 143, 0.9); }
  .vue-toast_container._success .vue-toast_message {
    background-color: rgb(43, 182, 115); }
  .vue-toast_container._warning .vue-toast_message {
    background-color: rgba(138, 109, 59, 0.9); }
  .vue-toast_container._error .vue-toast_message {
    background-color: rgb(250, 62, 62); }

.vue-toast-manager_container.__top .vue-toast_container {
  top: 0; }

.vue-toast-manager_container.__bottom .vue-toast_container {
  bottom: 0; }

.vue-toast-manager_container.__left .vue-toast_container {
  left: 0; }

.vue-toast-manager_container.__right .vue-toast_container {
  right: 0; }

.vue-toast_message {
  padding: 4px 29px 4px 10px;
  color: white;
  font-family: arial, sans-serif; }

.vue-toast_close-btn {
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 5px;
  width: 14px;
  height: 14px;
  opacity: .7;
  transition: opacity .15s ease-in-out;
  backface-visibility: hidden; }
  .vue-toast_close-btn:hover {
    opacity: .9; }
  .vue-toast_close-btn::before, .vue-toast_close-btn::after {
    content: '';
    position: absolute;
    top: 6px;
    width: 14px;
    height: 2px;
    background-color: white; }
  .vue-toast_close-btn::before {
    transform: rotate(45deg); }
  .vue-toast_close-btn::after {
    transform: rotate(-45deg); }

.vue-toast-enter-active {
  opacity: 0;
  transition: all .2s ease-out; }

.vue-toast-enter-to {
  opacity: 1; }

.vue-toast-leave-active {
  opacity: 1;
  transition: all .1s ease-out; }

.vue-toast-leave-to {
  opacity: 0; }
  
  
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease-in-out;
  transition-delay: 1000ms;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
</style>