<template>
    	<div class="form-group ">
  	  	<label for="txt_org_code" class=" col-md-3 form-label" style="text-align: left;">{{label}}</label>
  	  	<div :class="'col-md-' + width">
  			  <textarea @input="updateValue($event.target.value)" :value="value" type="text"  class="form-control" > </textarea>
  			</div>
  		</div>	
</template>


<script>
export default {
    data() {
         return {  }
    },
    
    props: {
        label: {
            type: String,
            required: true
        },
         value: {
            type: String,
            required: true
        },
        width: {
            type: String,
            default: '8'
        },

    },
    
    computed: {
       // Filtering the suggestion based on the input
      
    
     },
     
     methods: {
        updateValue(val) {
            this.$emit('input', val);
        }
        
    }
}
</script>