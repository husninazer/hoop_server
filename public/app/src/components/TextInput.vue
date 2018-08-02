<template>
    	<div class="form-group" v-bind:class="{'has-error': validate}">
  	  	<label for="txt_org_code" class="form-label" :class="{'col-md-3': !labelTop}" style="text-align: left;">{{label}}</label>
  	  	<div :class="{'col-md-8' : !labelTop}">
  			  <input  @input="updateValue($event.target.value)" :value="value" :type="type"  class="form-control" ref="input">
  			</div>
  		</div>	
</template>


<script>
export default {
    data() {
         return {}
    },
    
    props: {
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: "text"
        },
        value: {
            type: String,
            required: true,
            default: ''
        },
        validate: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '8'
        },
        labelTop: {
            type: Boolean,
            default: false
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