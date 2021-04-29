<template>
    <div style="display: flex; justify-content: center;">
        <v-btn class="cancelButton" @click="getClickEvent">           
            <v-icon>mdi-cancel</v-icon> 
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
            window.location.href = "http://localhost:8080/cookbookview";
        }
    },
    props:[],
    components:{},
}
</script>