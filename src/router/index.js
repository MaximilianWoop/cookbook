import Vue from 'vue'
import VueRouter from 'vue-router'
import SignInView from '../Views/SignInView.vue'
import CookBookView from '../Views/CookBookView.vue'
import RecipeDetailView from '../Views/RecipeDetailView.vue'
import IngredientDetailView from '../Views/IngredientDetailView.vue'
import AddRecipeView from '../Views/AddRecipeView.vue'
import AddIngredientView from '../Views/AddIngredientView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignInView',
    component: SignInView
  },
  {
    path: '/cookbookview',
    name: 'CookBookView',
    component: CookBookView,
  },
  {
    path: '/RecipeDetailView',
    name: 'RecipeDetailView',
    component: RecipeDetailView
  },
  {
    path: '/IngredientDetailView',
    name: 'IngredientDetailView',
    component: IngredientDetailView
  },
  {
    path: '/AddRecipeView',
    name: 'AddRecipeView',
    component: AddRecipeView
  },
  {
    path: '/AddIngredientView',
    name: 'AddIngredientView',
    component: AddIngredientView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
