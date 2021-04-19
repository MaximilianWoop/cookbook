<template>
    <div>
        <NavigationBar></NavigationBar>
        <AddRecipeView></AddRecipeView>
    </div>
</template>

<script>

import AddRecipeView from '@/ViewModel/DetailRecipeView.vue'
import NavigationBar from '@/ViewModel/NavigationBar.vue'

export default {
    components:{
        'AddRecipeView':AddRecipeView,
        'NavigationBar':NavigationBar,
    }
}
</script>