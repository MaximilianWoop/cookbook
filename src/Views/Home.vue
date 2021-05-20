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
            recipes: [],
        };
    },
    created(){
        console.log(`${process.env.VUE_APP_BACKEND_URL}`);
        fetch('https://cookbook.ryotecx.de/api.php/recipe')
            .then((response) => response.json())
            .then((data) => {
                this.recipes = data;
            }
        );
    },
    computed:{
        sortedRecipe(){
            const sort = this.$route.query.sort;
            if(!sort){
                return this.recipes;
            }
            const sorted = this.recipes;
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
