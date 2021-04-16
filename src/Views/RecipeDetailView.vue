<template>
    <div>
        <NavigationBar></NavigationBar>
        <AddRecipeView></AddRecipeView>
    </div>
</template>

<script>

import AddRecipeView from '@/ViewModel/DetailViews/RecipeDetailView.vue'
import NavigationBar from '@/ViewModel/Navigation/NavigationBar.vue'

export default {
    components:{
        'AddRecipeView':AddRecipeView,
        'NavigationBar':NavigationBar,
    }
}
</script>