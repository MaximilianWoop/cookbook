<template>
    <div>
        <NavigationBar></NavigationBar>
        <SettingView></SettingView>
    </div>
</template>

<script>

import SettingView from '@/ViewModel/SettingView.vue'
import NavigationBar from '@/ViewModel/NavigationBar.vue'

export default {
    components:{
        'SettingView':SettingView,
        'NavigationBar':NavigationBar,
    }
}
</script>