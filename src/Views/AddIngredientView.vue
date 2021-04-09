<template>
    <div>
        <AddIngredientView></AddIngredientView>
    </div>
</template>

<script>

import AddIngredientView from '@/ViewModel/AddViews/AddIngredientView.vue'

export default {
    components:{
        'AddIngredientView':AddIngredientView,
    }
}
</script>