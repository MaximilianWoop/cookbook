import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        recipes:[],
        ingredients:[],
        tags:[],
    },
    mutations:{
        setRecipe(state, recipe){
            state.recipes.push(recipe);
        },
        setIngredient(state, ingredient){
            state.ingredients.push(ingredient);
        },
        setTag(state, tag){
            state.tags.push(tag);
        },
    },
    actions:{
        setRecipe: ({commit, state}, recipe) => {
            commit('setRecipe',recipe);
            return state.recipe;
        },
        setIngredient: ({commit, state}, ingredient) =>{
            commit('setIngredient', ingredient);
            return state.ingredient;
        },
        setTag: ({commit, state}, tag) =>{
            commit('setTag', tag);
            return state.tag;
        }
    },
})