<template>
    <div>
        <NavigationBar></NavigationBar>
        <CookBookView></CookBookView>
    </div>
</template>

<script>

import CookBookView from '@/ViewModel/CookBookView.vue'
import NavigationBar from '@/ViewModel/NavigationBar.vue'

export default {
    components:{
        'CookBookView':CookBookView,
        'NavigationBar':NavigationBar,
    }
}
</script>