<template>
    <!-- Navbar -->
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">ETO</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><router-link :to="'/eto'">TRAVEL</router-link></li>
        <li v-if="false" class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
          <ul class="dropdown-menu">
            <li><a href="#">Reports</a></li>
            <li class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>

      <ul class="nav navbar-nav navbar-right">
        <li><a>Welcome {{ $store.getters.currentUser.firstName }} - {{$store.getters.currentUser.organization?$store.getters.currentUser.organization.name: ''}}</a></li>
        <li class="dropdown">
              <a href="#pablo" class="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false">
                  <i class="material-icons">face</i>
                  <b class="caret"></b>
              <div class="ripple-container"></div></a>
           <ul class="dropdown-menu">
            <li v-if="$store.getters.currentUser.type === 'admin'"><router-link to="/admin">Admin Panel</router-link></li>
            <li><a href="#">Profile </a></li>
            <li class="divider"></li>
            <li><a  @click="logout" style="cursor: pointer;">Logout</a></li>
          </ul>
          </li>

      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
    <!-- End Navbar -->
</template>

<script>
    
import Auth from '../auth'

export default {
  name: 'navigation',
  data: function() {
      return {
           user: ''
      }
  },
  methods: {
      logout: function() {
           this.$store.dispatch('logout');
           this.$router.push({path: '/eto-login'})
      }
  },
  
  mounted: function(){
     
  }
}
</script>