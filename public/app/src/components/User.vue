<template>
  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" >
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					<i class="material-icons">clear</i>
				</button>
				<h4 class="modal-title" v-if="login">Login</h4>
				<h4 class="modal-title" v-if="!login">Register</h4>
				<div class="alert alert-danger" v-if="error">
				    <div class="container-fluid">
					  <div class="alert-icon">
					    <i class="material-icons">error_outline</i>
					  </div>
				      {{errorMessage}}
				    </div>
				</div>
			</div>
			<div class="modal-body" v-if="!login">
				<div class="row">
					<div class="col-sm-7">
						<div class="form-group label-floating">
							<label class="control-label">First Name</label>
							<input type="text" v-model="register.firstName" class="form-control">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-7">
						<div class="form-group label-floating">
							<label class="control-label">Last Name</label>
							<input type="text" v-model="register.lastName" class="form-control">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-7">
						<div class="form-group label-floating">
							<label class="control-label">Email</label>
							<input type="text" class="form-control" v-model="register.email">
						</div>
					</div>
				</div>
				<div class="row">

					<div class="col-sm-7">
						<div class="form-group label-floating">
							<label class="control-label">Password</label>
							<input type="password" class="form-control" v-model="register.password">
						</div>
					</div>
				</div>	
				<div class="row">
					<div class="col-sm-7">
						<div class="form-group label-floating">
							<label class="control-label">Confirm Password</label>
							<input type="password" class="form-control" v-model="register.confirmPassword">
						</div>
					</div>
				</div>	
			</div>
			<div class="modal-footer" v-if="!login">
				<span v-if="loading">Registering...</span>
				<button class="btn btn-info" v-on:click ="createUser">Register</button>
				<button type="button" class="btn btn-simple" v-on:click="toggle">Log In</button>
			</div>
			
		
			<!-- Login Template Begins  -->
			
			<div class="modal-body" v-if="login">
				<div class="row">
					<div class="col-sm-7">
						<div class="form-group label-floating">
							<label class="control-label">Email</label>
							<input type="text" class="form-control" v-model="user.username">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-7">
						<div class="form-group label-floating">
							<label class="control-label">Password</label>
							<input type="password" class="form-control" v-model="user.password" required>
						</div>
					</div>
				</div>	
			</div>
			<div class="modal-footer" v-if="login">
				<span>Signing In...</span>
				<button class="btn btn-info" v-on:click ="loginUser">Sign In</button>
				<button type="button" class="btn btn-simple" v-on:click="toggle">Register</button>
			</div>
		</div>
	</div>
</div>
</template>

<script>

import Auth from '../auth'

  export default {
  	name: 'user-modal',
    data: function() {
      return {

        subTitle: 'Login',

        register: {
          firstName: 'Husni',
          lastName: 'Nazer',
          email: 'husninazer@gmail.com',
          password: '',
          confirmPassword: ''
        },

        user: {
          username: 'husninazer@gmail.coms',
          password: 'as'
        },

        login: true,
        loading: false,
        error: false,
        errorMessage: ''

      }
    },

    methods: {
      toggle: function() {
        this.login = !this.login
        this.error = false
        this.loading = false
      },

      cleanForm: function() {
        this.register = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
        this.user = {
          username: '',
          password: ''
        }
      },

      createUser: function() {

        var vm = this

        vm.error = vm.loading = false

        if (vm.register.password != vm.register.confirmPassword) {
          vm.error = true
          vm.errorMessage = "Passwords do not match"
          return
        }

        vm.$parent.loading = true
        vm.$http.post("/users/create", vm.register).then(response => {
          vm.$parent.loading = false
          vm.user = {
            username: vm.register.email,
            password: vm.register.password
          }
          vm.loginUser(function() {
            vm.cleanForm()
            window.location.href = "/"
          })


        }, response => {
          vm.$parent.loading = false
          vm.errorMessage = "Username Already exists, please use another username"
          vm.error = true
        })
      },


      loginUser: function(callback) {
        if (this.user.email == '' || this.user.password == '') return

        Auth.authenticate(this, this.user, '/')
     
      }
    }
  }
</script>

<style scoped>

</style>
