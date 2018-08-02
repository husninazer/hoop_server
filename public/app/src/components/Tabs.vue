<template>
    	<div class="card card-nav-tabs card-plain si-card">
                    <div class="card-header card-header-danger">
                        <!-- colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" -->
                        <div class="nav-tabs-navigation">
                            <div class="nav-tabs-wrapper">
                                <ul class="nav nav-tabs tabs-light" data-tabs="tabs">
                                    <li v-for="(tab, index) in tabs" class="nav-item" :class="{active: index == 0 ? true: false}">
                                        <a class="nav-link" :href="'#' + tab.href" data-toggle="tab">{{tab.name}}<div class="ripple-container"></div></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                   <slot/>
         </div>
</template>


<script>
export default {
    data() {
         return { }
    },
    
    props: {
       tabs: {
            type: Array,
            required: true
        },
    },
    
    computed: {
       // Filtering the suggestion based on the input
      
    
     },
     
     methods: {

        
    },
      watch: {
      
      }
}
</script>