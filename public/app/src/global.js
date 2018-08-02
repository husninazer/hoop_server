const shared = {
  message: "my global message"
}

shared.install = function(){
  Object.defineProperty(Vue.prototype, '$myGlobalStuff', {
    get () { return shared }
  })
}

Vue.use(shared);

Vue.component("my-fancy-component",{
  template: "<div>My Fancy Stuff: {{$myGlobalStuff.message}}</div>"
})

new Vue({
  el: "#app"
})