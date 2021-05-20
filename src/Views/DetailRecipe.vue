<template>
    <div>
        <TheHeader/>
        <h1>Detail</h1>
        <h6>{{recipe}}</h6>
        <router-link :to="`/detailRecipe/${$route.params.id}/ingredients`">Ingredients</router-link>
        <router-link :to="`/detailRecipe/${$route.params.id}/description`">Description</router-link>
        <transition name="fade">
            <router-view></router-view>
        </transition>        
        <TheFooter/>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';
export default {
    data(){
        return{
            id: this.$route.params.id,
            recipe: {},
        }
    },
    created(){
        fetch(`https://cookbook.ryotecx.de/api.php/recipe?recipeID=${this.id}`)
            .then((response) => response.json())
            .then((response) => {
                this.recipe = response;
            }
        );
    },
    components: {
        TheHeader,
        TheFooter,
    }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active{
    transition: opacity .5s ease-out;
}
.fade-enter, .fade-leave-to{
    opacity: 0;
}
</style>