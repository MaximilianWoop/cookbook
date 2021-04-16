<template>
    <div>
        <NavigationBar></NavigationBar>
        <AddIngredientView></AddIngredientView>
    </div>
</template>

<script>

import AddIngredientView from '@/ViewModel/AddViews/AddIngredientView.vue'
import NavigationBar from '@/ViewModel/Navigation/NavigationBar.vue'

export default {
    components:{
        'AddIngredientView':AddIngredientView,
        'NavigationBar':NavigationBar,
    }
}
</script>