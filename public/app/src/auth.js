import Vue from 'vue'
export default {
    user: {
        authenticated: false,
        firstName: null,
        lastName: null,
        role: null
    },
    
    authenticate: function(vm, creds, redirect) {
          vm.$http.post('/users/authenticate', creds).then(response => {
              localStorage.setItem('token', response.data.user.token)
              this.user.authenticated = true
              localStorage.setItem('firstName', response.data.user.firstName)
              localStorage.setItem('lastName', response.data.user.lastName)
                
            vm.$router.push({path: redirect})  
            //  location.reload() 
             
        }, response => {
          vm.error = response.error
        })
    },
    
    checkAuth: function(store, role, callback) {
        var jwt= localStorage.getItem('token')
        if (!jwt) return callback(false)
         Vue.http.get('/users/checkAuth').then(response => {
             // console.log(response.body.msg)
           
           if (response.body.msg==="success") {
                store.dispatch("updateCurrentUser", response.body.user.user)
                if(role === undefined) return callback(false)
                switch (response.body.user.user.type)  {
                    
                    case 'admin': 
                        if(role.adminAuth) return callback(true)
                        else return callback(false)
                        break;
                        
                    case 'agent':
                        if(role.agentAuth) return callback(true)
                        else return callback(false)
                        break;
                        
                    
                    case 'client': 
                        if(role.clientAuth) return callback(true)
                        else return callback(false)
                        break;
                        
                    default: 
                        return callback(false)
   
                }
           }
          
           else
           return callback(false)
        }, response => {
            return callback(false)
        })  
        
        if(jwt) {
            if ('JWT ' + jwt === Vue.http.headers.common['Authorization']) {
                
            }
        }
        else {
            return callback(false)    
        }
        
    },
    
    
    // @TODO Add path for redirecting as secong arguement
    logout: function(vm, redirect) { 
        localStorage.removeItem('token')
        localStorage.removeItem('firstName')
        localStorage.removeItem('lastName')
        
        this.user.authenticated = false
        
        if (redirect != null) {
          // location.reload()
            vm.$router.push({path: redirect})
        }
        
    }
    
    
} 