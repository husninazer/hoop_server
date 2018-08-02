<template>
  <div id="hello">
    <h2>{{ msg }}</h2>
    <h3>Go back, or try another </h3>
  </div>
</template>

<script>
export default {
  name: 'nopage',
  data () {
    return {
      msg: 'Invalid Page'
    }
  }
}
</script>

<style scoped>
#hello {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
