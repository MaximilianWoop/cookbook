<template>
    <div class="container">
        
    </div>            
</template>

<script defer>

import helper from '@/Helper/dataController'

var vueModel = {
    data(){
        return{}
    },
    async mounted(){
        await helper.getRecipesFromURL(this);
    },
    computed:{
        recipes(){
            return this.$store.state.recipes;
        }
    },
    methods:{},
    props:[],
    components:{},
}
export default vueModel
 </script>