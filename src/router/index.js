import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/Views/Login.vue'
import Home from '@/Views/Home.vue'
import PageNotFound from '@/Views/PageNotFound.vue'
import DetailRecipe from '@/Views/DetailRecipe.vue'
import DetailRecipeIngredients from '@/Views/recipe/Ingredients.vue'
import DetailRecipeDescription from '@/Views/recipe/Description.vue'
import DetailRecipeImages from '@/Views/recipe/Images.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
  },
  //Loading Page async to save Mobiledata
  {
    path: '/addRecipe',
    component: () => import(/*webpackChunkName: "addRecipe"*/ '../Views/AddRecipe.vue'),
  },
  {
    path: '/addIngredient',
    component: () => import(/*webpackChunkName: "AddIngredient"*/ '../Views/AddIngredient.vue'),
  },
  {
    path: '/addTag',
    component: () => import(/*webpackChunkName: "AddTag"*/ '../Views/AddTag.vue'),
  },
  {
    path: '/settings',
    component: () => import(/*webpackChunkName: "Settings"*/ '../Views/Settings.vue'),
  },
  {
    path: '/user',
    component: () => import(/*webpackChunkName: "User"*/ '../Views/User.vue'),
  },
  {
    path: '/detailRecipe/:id',
    component: DetailRecipe,
    children: [
      {
        path: 'ingredients',
        component: DetailRecipeIngredients,
      },
      {
        path: 'description',
        component: DetailRecipeDescription,
      },
      {
        path: 'images',
        component: DetailRecipeImages,
      }
    ],
  },
  {
    path: '*',
    component: PageNotFound,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
