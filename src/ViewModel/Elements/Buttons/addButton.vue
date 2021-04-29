<template>
    <div style="display: flex; justify-content: center;">
        <v-btn class="addButton" @click="getClickEvent">           
            <v-icon>mdi-plus</v-icon> 
        </v-btn>
    </div>
</template>

<script>
export default {
  data(){
        return{

        }
    },
    async mounted(){},
    computed:{},
    methods:{
        getClickEvent(){
            console.log("test");
        }
    },
    props:[],
    components:{},
}
</script>