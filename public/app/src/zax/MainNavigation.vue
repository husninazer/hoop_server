<template>
    <!-- Navbar -->
    <nav class="navbar navbar-transparent navbar-fixed-top navbar-color-on-scroll hidden-xs">
    	<div class="container">
            <div class="navbar-header">
    	    	<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-index">
    	        	<span class="sr-only">Toggle navigation</span>
    	        	<span class="icon-bar"></span>
    	        	<span class="icon-bar"></span>
    	        	<span class="icon-bar"></span>
    	    	</button>
    	    	<a>
    	        	<div class="logo-container">
    	                <div class="logo">
    	                    <img src="/img/logo-1.png" alt="Logo"  data-placement="bottom" data-html="true">
    	                </div>
    	                <div class="brand">
    	                    
    	                </div>
    
    
    				</div>
    	      	</a>
    	    </div>
    
    	    <div class="collapse navbar-collapse" id="navigation-index">
    	    	<ul class="nav navbar-nav navbar-left">
    				<li>
    				        <a  href="#" >HOME</a>
    				</li>
    				<li>
    				        <a  href="#" >HOTEL</a>
    				</li>
    				<li>
    				        <a  href="#" >FLIGHTS</a>
    				</li>
    				<li>
    				        <a  href="#" >PACKAGES</a>
    				</li>
    	    	</ul>
    	    	
    	    	
    	    	
    	    	<ul class="nav navbar-nav navbar-right">
    				<li>
    				
    				        <a v-if="user.authenticated" href="#" class=" dropdown-toggle" data-toggle="dropdown">
    					    	<i class="fa fa-user"> </i> <b>{{user.firstName}} {{user.lastName}}</b> 
    					    	<b class="caret"></b>
    						</a>
    						
    						<ul v-if="user.authenticated" class="dropdown-menu">
    						    <li><a href="#/profile/343">My Profile</a></li>
    						    <li><a v-on:click="logout()">Logout</a></li>
    						</ul>
    						
    					  	<a v-if="!user.authenticated" href="#" class=" dropdown-toggle" data-toggle="modal" data-target="#loginModal">
    					    	<i class="fa fa-user"> </i> Sign In 
    					    	<b class="caret"></b>
    						</a>
    
    				</li>
    				
    				<li>
    				       						
    					  	<a href="#" class=" dropdown-toggle" data-toggle="dropdown" >
    					    	 Change Language
    					    	<b class="caret"></b>
    						</a>
    	
    						<ul class="dropdown-menu">
    						    <li><a href="">عربى</a></li>
    						    <li><a >English</a></li>
    						</ul>
    
    
    				</li>
    			
    				<li>
    					<a rel="tooltip" title="Follow us on Twitter" data-placement="bottom" href="https://twitter.com/" target="_blank" class="btn btn-white btn-simple btn-just-icon">
    						<i class="fa fa-twitter"></i>
    					</a>
    				</li>
    				<li>
    					<a rel="tooltip" title="Like us on Facebook" data-placement="bottom" href="https://www.facebook.com/" target="_blank" class="btn btn-white btn-simple btn-just-icon">
    						<i class="fa fa-facebook-square"></i>
    					</a>
    				</li>
    				<li>
    					<a rel="tooltip" title="Follow us on Instagram" data-placement="bottom" href="https://www.instagram.com/" target="_blank" class="btn btn-white btn-simple btn-just-icon">
    						<i class="fa fa-instagram"></i>
    					</a>
    				</li>
    
    	    	</ul>
    	    </div>
    	</div>
    </nav>
    <!-- End Navbar -->
</template>

<script>
    
    import Auth from '../auth'
    export default {
        name: 'navigation',
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