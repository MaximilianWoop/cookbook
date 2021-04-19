<template>
    <div>
        <NavigationBar></NavigationBar>
        <IngredientDetailView></IngredientDetailView>
    </div>
</template>

<script>

import IngredientDetailView from '@/ViewModel/DetailIngredientView.vue'
import NavigationBar from '@/ViewModel/NavigationBar.vue'

export default {
    components:{
        'IngredientDetailView':IngredientDetailView,
        'NavigationBar':NavigationBar,
    }
}
</script>