<template>
    <div style="display: flex; justify-content: center;">
        <v-btn class="saveButton" @click="getClickEvent">           
            <v-icon>mdi-content-save</v-icon> 
        </v-btn>
    </div>
</template>

<script>
import helper from '@/Helper/dataController'
export default {
  data(){
        return{
            buttonText: 'Speichern'
        }
    },
    async mounted(){},
    computed:{},
    methods:{
        getClickEvent(){
            const currentURL = new URL(document.location.href);
            var id = currentURL.searchParams.get("recipeId");
            if(id != null){
                console.log("Update Recipe");  
                helper;              
            }
            else if(id == null){
                console.log("Create Recipe");
            }
        },
    },
    props:[],
    components:{},
}
</script>
