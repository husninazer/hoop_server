<template>
<div class="wrapper  main bg" style="padding-top: 100px;background-image: url('/img/bg_movenpick.jpg');">

    <div class="container">
        <div class="row vertical-offset-100">
        	<div class="col-md-4 col-md-offset-4">
        		<div class="panel panel-default login-panel" style="border: 1px solid #e0dbdb;border-radius: 3px;">
    			  	<div class="card-header card-header-primary text-center">
                        <h4 style="color:white;">Sign In</h4>
                    </div>
    			  	<div class="panel-body">
    			  	<img src="/img/login-logo.jpg" style="width: 100%;">
    			    
                        <fieldset>
    			    	  	<div class="form-group form-group-front-page">
    			    		    <input class="form-control" placeholder="E-mail" name="email" type="text" v-model="user.username">
    			    		</div>
    			    		<div class="form-group">
    			    			<input class="form-control" placeholder="Password" name="password" type="password" v-model="user.password">
    			    		</div>
    			    		<div class="checkbox">
    			    	    	<label>
    			    	    		<input name="remember" type="checkbox" value="Remember Me"> Remember Me
    			    	    	</label>
    			    	    </div>
    			    		<button class="btn btn-lg btn-primary btn-block" v-on:click="loginUser">Login</button>
    			    	</fieldset>
    			    
    			    </div>
    			</div>
    		</div>
	    </div>
	</div>
</div>
</template>


<script>

import Auth from '../auth.js'

export default { 
  name: 'login-agent',
  components: {
   
  },
  
  data () {
    return {
       user: {
          username: '',
          password: ''
        }
    }
  },
  
  methods: {
        loginUser: function(callback) {
         this.$store.dispatch("login", this.user).then(() => {
            switch(this.$store.getters.currentUser.type) {
                case 'admin': 
                    this.$router.push("/eto/travel-orders")
                    break;
                    
                case 'agent':
                    this.$router.push("/eto/travel-orders")
                    break;
                    
                
                case 'client': 
                   this.$router.push("/eto/travel-orders")
                    break;
                    
                default: 
                   this.$router.push("/eto/travel-orders")
            }
            
            
          });
         }
    },
    
    mounted: function() {
       // Auth.checkAuth(this)
    }
    
    
}
</script>

