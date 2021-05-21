<template>
    <div>
        <IngredientList :ingredients="ingredients"/>    
    </div>
</template>

<script>
import IngredientList from '@/components/IngredientList.vue';

export default {
    data(){
        return{
            id: this.$route.params.id,
            ingredients:[
                {name: "Tomate",measurement:"ml",portion:999},
                {name: "Mehl",measurement:"L",portion:9999},
                {name: "Vanillepulver",measurement:"TL",portion:100},
                {name: "Tomatenmark",measurement:"EL",portion:10},
                {name: "Schokoladenkovertüre",measurement:"STK",portion:10},
            ]
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