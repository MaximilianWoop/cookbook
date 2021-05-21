import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        //Arrays
        recipes:[],
        tags:[],
        ingredients:[],
        //Objects
        recipe:{},        
        user:{
            id: 1,
            name: 'Maximilian Woop'
        },
    },
    mutations:{
        setManyRecipes(state, recipe){
            state.recipes.push(recipe);
        },
        setOneRecipe(state, recipe){
            state.recipe = recipe;
        },
        setManyIngredients(state, ingredient){
            state.ingredients.push(ingredient);
        },
        setManyTags(state, tag){
            state.tags.push(tag);
        },
    },
    actions:{
        setManyRecipes: ({commit, state}, recipe) => {
            commit('setManyRecipes',recipe);
            return state.recipe;
        },
        setOneRecipe: ({commit, state}, recipe) => {
            commit('setOneRecipe',recipe);
            return state.recipe;
        },
        setManyIngredients: ({commit, state}, ingredient) => {
            commit('setManyIngredients',ingredient);
            return state.ingredient;
        },
        setManyTags: ({commit, state}, tag) => {
            commit('setManyTags',tag);
            return state.tag;
        },
    },
    getters:{
        getInitials(state){
            const splittedName = state.user.name.split(' ');
            return splittedName[0].charAt(0) + splittedName[1].charAt(0);
        }
    },
    modules:{},
})