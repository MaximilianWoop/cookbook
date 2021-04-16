<template>
    <v-container style="background:black">
        <v-carousel
            :show-arrows=showArrows
            :progress=false
            :continuous=false
            @change="changedImage"
            hide-delimiters-background
        >
            <v-carousel-item
                v-for="(item,i) in imageItems"
                :key="i"
                :src="item.image"
                contain
                reverse-trasition="fade-transition"
                transition="fade-transition"/>
        </v-carousel>
    </v-container>
</template>

<script>
export default{
    data(){
        return{
            showArrows:false,
        }
    },
    computed:{
        imageItems(){
            return this.items;
        }
    },
    methods:{
        changedImage(value){
            this.$emit("changedGalleryImage",value);
        }
    },
    props:['items']
}
</script>