<template>
    <div>
        <IngredientList :ingredients="this.$store.state.recipe.ingredients"/>    
    </div>
</template>

<script>
import IngredientList from '@/components/IngredientList.vue';

export default {
    data(){
        return{
            id: this.$route.params.id,
        }
    },
    created(){
        this.$http.get(`${process.env.VUE_APP_BACKEND_URL}/recipe?recipeID=${this.id}`)
        .then((response) => {
            response.data.forEach((recipe) => {
                this.$store.dispatch('setOneRecipe',recipe);
            })
        });
    },
    computed:{
        recipe(){
            return this.$store.state.recipe;
        }
    },
    components: {
        IngredientList,
    }
}
</script>