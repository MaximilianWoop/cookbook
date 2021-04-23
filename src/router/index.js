import Vue from 'vue'
import VueRouter from 'vue-router'
import SignInView from '../Views/SignInView.vue'
import CookBookView from '../Views/CookBookView.vue'
import RecipeDetailView from '../Views/DetailRecipeView.vue'
import IngredientDetailView from '../Views/DetailIngredientView.vue'
import AddRecipeView from '../Views/AddRecipeView.vue'
import AddIngredientView from '../Views/AddIngredientView.vue'
import AddTagView from '../Views/AddTagView.vue'
import SettingView from '../Views/SettingView.vue'

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
    path: '/DetailRecipeView',
    name: 'DetailRecipeView',
    component: RecipeDetailView
  },
  {
    path: '/DetailIngredientView',
    name: 'DetailIngredientView',
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
  {
    path: '/AddTagView',
    name: 'AddTagView',
    component: AddTagView
  },
  {
    path: '/SettingView',
    name: 'SettingView',
    component: SettingView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
