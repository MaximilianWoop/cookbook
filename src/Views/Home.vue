<template>
    <section id="home">
        <TheHeader/>
        <RecipeList :recipes="sortedRecipe"/>
        <TheFooter/>
    </section>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import RecipeList from '../components/RecipeList.vue';
import TheFooter from '../components/TheFooter.vue';

export default{
    data(){
        return{
            
        };
    },
    created(){
        this.$http.get(`${process.env.VUE_APP_BACKEND_URL}/recipe`)
        .then((response) => {
            response.data.forEach((recipe) => {
                this.$store.dispatch('setManyRecipes',recipe);
            })
        });    
        console.log(this.$store.state.recipes);   
    },
    computed:{
        sortedRecipe(){
            const sort = this.$route.query.sort;
            if(!sort){
                return this.$store.state.recipes;
            }
            const sorted = this.$store.state.recipes;
            return sorted.sort((a,b) => {
                if(a.name < b.name){
                    return sort === 'asc' ? -1 : 1;
                }
                if(a.name > b.name){
                    return sort === 'desc' ? 1 : -1;
                }
                return 0;
            });
        },
    },
    components: {
        TheHeader,
        RecipeList,
        TheFooter,
    }
};
</script>
