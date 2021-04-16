<template>
    <div>
        <NavigationBar></NavigationBar>
        <IngredientDetailView></IngredientDetailView>
    </div>
</template>

<script>

import IngredientDetailView from '@/ViewModel/DetailViews/IngredientDetailView.vue'
import NavigationBar from '@/ViewModel/Navigation/NavigationBar.vue'

export default {
    components:{
        'IngredientDetailView':IngredientDetailView,
        'NavigationBar':NavigationBar,
    }
}
</script>