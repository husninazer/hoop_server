<template>
    <div class="form-group" v-bind:class="{'has-error': validate}">
  	  	<label for="txt_org_code" class=" col-md-3 form-label">{{label}}</label>
  	  	<div :class="'col-md-' + width">
            <div style="position:relative;" v-bind:class="{'open':openSuggestion}">
                <input class="form-control" style="padding: 5px;" type="text" :value="value" @input="updateValue($event.target.value)"
                  @keydown.tab = "enter"
                  @keydown.enter = 'enter'
                  @keydown.down = 'down'
                  @keydown.up = 'up'
                  @blur = "handleBlur"
                >
                <ul ref="dropdownBox" class="dropdown-menu" style="width:140%; max-height: 250px; overflow: scroll;  overflow-x:hidden; text-overflow: ellipsis; margin-top: 2px; ">
                    <li v-for="(suggestion, index) in matches"
                        v-bind:class="{'active': isActive(index)}"
                        @mousedown="suggestionClick(index)" 
                    >
                      <a style="height:24px; padding: 5px;" >{{ getStringFormat(suggestion)  }} 
                      </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
</template>


<script>
export default {
    data() {
        return {
            open: false,
            current: 0,
            suggestions: [],
            minLength: 2,
            
            selectedVal : this.selected
        }
    },
    
    props: {
        value: {
            type: String,
            required: true
        },
         label: {
            type: String,
        },
         width: {
            type: String
        },
        
        url: {
          type: String,
          required: true
        },
        
        keyString: {
            type: Array,
            default: function () {return ['label']}
        },
        
        selectedObj: {
            type: Object
        }
        
    },
    
    computed: {
       // Filtering the suggestion based on the input
       matches () {
        //  return this.suggestions.filter((obj) => {
        //   return obj.label.indexOf(this.value) >= 0 
        //  })
        return this.suggestions
       },
       
    
       openSuggestion () {
         return this.selection !== '' &&
                this.matches.length !== 0 &&
                this.open === true
       }
    
     },
     
     methods: {

          // Triggered the input event to cascade the updates to 
          // parent component
          updateValue (value) {
          
            this.$emit('input', value)
            if(value.length < this.minLength) {
                this.open = false
                return
            }
            
            if (this.open === false) {
              this.open = true
              this.current = 0
            }
            this.current = 0
            this.$emit('input', value)
            //this.$emit('fetch', value)
            this.getData(value)
              
          },
        
          // When enter key pressed on the input
          enter () {
         
            if (!this.matches.length == 0) 
            this.$emit('input', this.getStringFormat(this.matches[this.current]))
            this.open = false
            
            // For getting the selected object
            this.$emit('selection', this.matches[this.current])

          },
        
          // When up arrow pressed while suggestions are open
          up () {
            if (this.current > 0) {
              this.current--
              this.$refs.dropdownBox.scrollTop -= 25
            }
          },
        
          // When down arrow pressed while suggestions are open
          down () {
            if (this.current < this.matches.length - 1) {
              this.current++
              this.$refs.dropdownBox.scrollTop += 25;
            }
            
          },
        
          // For highlighting element
          isActive (index) {
            return index === this.current
          },
        
          // When one of the suggestion is clicked
          suggestionClick(index) {
           
            this.$emit('input', this.getStringFormat(this.matches[index]))
            this.open = false
              // For getting the selected object
            this.$emit('selection', this.matches[index])
          },
          
          //Get the data from server AKA Fetch
           getData (searchString) {
                
               this.$http.post(this.url, {'str': searchString}).then(response => {
                         this.suggestions = response.body
                        
                    }, response => {
                       // alert(JSON.stringify(response))
                    })                  
            },
            

          
          
          //Handle Blur
          handleBlur (e) {
            
              if(this.suggestions.length == 0) {
                    this.$emit('input', '')
                    this.open = false;
                    return;
              }
              
              if (this.open == false) return
              
            this.$emit('input', this.getStringFormat(this.matches[this.current]))
            this.open = false
            this.$emit('selection', this.matches[this.current])
              
              
              
            //  var list =  this.suggestions.filter((obj) => {
            //   return obj.label.indexOf(this.selection) >= 0 
            //  })
             
            //  if (list.length == 0){
            //       this.selection = ''; return;
            //   }
          },
          
          //Return the parsed String format
          getStringFormat(suggestion) {
            var result = '';
            for (var i =0; i < this.keyString.length; i++) {
                if (suggestion[this.keyString[i]])
                result += suggestion[this.keyString[i]] + ': '
            }
                result = result.substring(0, result.length - 2)
              return result;
          }
    },
    
    mounted() {
    
        // In EDIT mode, the obj assigned to selectedObj shall be loaded
        if(this.selectedObj) {
           this.$emit('input', this.getStringFormat(this.selectedObj))
        }
    }
}
</script>