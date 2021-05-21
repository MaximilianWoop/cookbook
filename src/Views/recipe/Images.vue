<template>
    <div>
        <ImageList :images="recipe.images"/>
    </div>
</template>

<script>
import ImageList from '@/components/ImageList.vue';
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
        ImageList,
    }
}
</script>

<style lang="scss" scoped>
.notImageFound{
    width: 260px;
    height: 260px;
    background: black;
    text-align: center;
    padding-top: 110px;
    & .noImageFoundText{
        color: white;
        font-size: 25px;
        font-weight: bolder;
    }
}
</style>