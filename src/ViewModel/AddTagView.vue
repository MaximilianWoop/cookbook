<template>
    <div>
        <v-btn
            @click="test"
        >test</v-btn>
    </div>
</template>

<script>

import recipeController from '@/Helper/Curl/RecipeController'

export default {
  data(){
        return{

        }
    },
    async mounted(){},
    computed:{},
    methods:{
        async test(){
            var recipe = new Object();
            recipe.name = "name";              
            recipe.duration = 123;
            recipe.description = "description";
            recipe.ingredients = null;
            recipe.tags = null;
            recipe.images = null;
            recipe.temperature = null;
            var temp = await recipeController.createRecipe(recipe);
            console.log(temp);
        }
    },
    props:[],
    components:{},
}
</script>

