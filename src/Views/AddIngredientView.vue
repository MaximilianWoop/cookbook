<template>
    <div>
        <NavigationBar></NavigationBar>
        <AddIngredientView></AddIngredientView>
    </div>
</template>

<script>

import AddIngredientView from '@/ViewModel/AddIngredientView.vue'
import NavigationBar from '@/ViewModel/NavigationBar.vue'

export default {
    components:{
        'AddIngredientView':AddIngredientView,
        'NavigationBar':NavigationBar,
    }
}
</script>