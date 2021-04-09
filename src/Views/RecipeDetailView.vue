<template>
    <div>
        <AddRecipeView></AddRecipeView>
    </div>
</template>

<script>

import AddRecipeView from '@/ViewModel/DetailViews/RecipeDetailView.vue'

export default {
    components:{
        'AddRecipeView':AddRecipeView,
    }
}
</script>