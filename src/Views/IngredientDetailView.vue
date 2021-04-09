<template>
    <div>
        <IngredientDetailView></IngredientDetailView>
    </div>
</template>

<script>

import IngredientDetailView from '@/ViewModel/DetailViews/IngredientDetailView.vue'

export default {
    components:{
        'IngredientDetailView':IngredientDetailView,
    }
}
</script>