<template>
    <div>
        <NavigationBar></NavigationBar>
        <AddTagView></AddTagView>
    </div>
</template>

<script>

import AddTagView from '@/ViewModel/AddTagView.vue'
import NavigationBar from '@/ViewModel/NavigationBar.vue'

export default {
    components:{
        'AddTagView':AddTagView,
        'NavigationBar':NavigationBar,
    }
}
</script>