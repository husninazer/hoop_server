<template>

<div class="index-page">

<main-navigation> </main-navigation>

<!-- Mobile Navbar -->
<header class="visible-xs">
      <div class="fixed-announcement">
        
      </div>
      <nav class="top-nav">
        <div >
        <a href="#" data-activates="nav-mobile" class="button-collapse top-nav full hide-on-large-only"><i class="material-icons">menu</i></a>
          <div class="nav-wrapper"><a class="page-title">Siyaaha</a></div>
        </div>
      </nav>
      
      <ul id="nav-mobile" class="side-nav fixed" style="transform: translateX(-100%);">
        <li class="logo"><a id="logo-container" href="/" class="brand-logo">
            </a>
            <img src="/img/logo-1.png" alt="Logo"  data-placement="bottom" data-html="true" width="90%">
        </li>
        
        <li class="bold"><a href="" class="waves-effect waves-teal">Sign In</a></li>
        <li class="bold"><a href="" class="waves-effect waves-teal">Hotels</a></li>
        <li class="bold"><a href="" class="waves-effect waves-teal">Flights</a></li>
        <li class="bold"><a href="" class="waves-effect waves-teal">Packages</a></li>
        <li class="bold"><a href="" class="waves-effect waves-teal">Social Page</a></li>
        
      </ul>
      
</header>
<!-- End Mobile Navbar -->

<div id="app">
    <router-view></router-view>
    
    	<footer class="footer">
			<div class="container">
				<nav class="pull-left">
					<ul>
						
						<li>
							<a href="">
						   About Us
						</a>
						</li>
						<li>
							<a href="">
						   Blog
						</a>
						</li>
						<li>
							<a href="">
						   Packages
						</a>
						</li>
					
					</ul>
				</nav>
				<div class="col-md-offset-4">
					<img src="/img/payment-options.png">
				</div>
				<div class="copyright pull-right">
					&copy; 2017
				</div>
			</div>
		</footer>
        	<div class='mask' v-if="loading">
          		<div class="loader">Loading...</div>
        	</div>
        	
        	<user-modal></user-modal>
</div>



</div>
	


</template>


<script>
import Auth from './auth'
import UserModal from './components/User.vue'
import MainNavigation from './zax/MainNavigation.vue'

export default {
	name: 'layout',
	components: {
		'main-navigation': MainNavigation,
		UserModal
	
	},
    data: function() {
        return {
            user: Auth.user
        }
    },
    methods: {
        logout: function() {
            Auth.logout(this)
        }
    },
    
    mounted: function(){
        Auth.checkAuth(this)
    },

}

</script>

