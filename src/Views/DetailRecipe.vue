<template>
    <div class="detailRecipe">
        <TheHeader/>
        <div class="detailRecipeContent">
            <v-row class="recipeName-row">
                <v-col cols="10">
                    <p class="recipeName">{{recipe.name}}</p>
                </v-col>
                <v-col cols="1">
                    <v-btn class="button" @click="deleteItem" icon>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="1">
                    <v-btn class="button" @click="editItem" icon>
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="recipeInformationSelectorLeft" id="recipeInformationSelectorLeft">
                    <router-link class="recipeInformationSelectorLink" :to="`/detailRecipe/${$route.params.id}/ingredients`" id="ingredientSelector">
                        <span v-on:click="ingredientClicked">Zutaten</span>
                    </router-link>   
                </v-col>  
                <v-col class="recipeInformationSelectorMiddle" id="recipeInformationSelectorMiddle">
                    <router-link class="recipeInformationSelectorLink" :to="`/detailRecipe/${$route.params.id}/description`">
                        <span v-on:click="descriptionClicked">Zubereitung</span>
                    </router-link>
                </v-col>    
                <v-col class="recipeInformationSelectorRight" id="recipeInformationSelectorRight">
                    <router-link class="recipeInformationSelectorLink" :to="`/detailRecipe/${$route.params.id}/images`">
                        <span v-on:click="imageClicked">Bilder</span>
                    </router-link>    
                </v-col>            
            </v-row>
            <v-row>
                <v-col class="recipeInformationContent">
                    <router-view></router-view>
                </v-col>                
            </v-row>
        </div>              
        <TheFooter/>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';

import recipeCURLController from '../Helper/Curl/RecipeController.js'

export default {
    data(){
        return{
            id: this.$route.params.id,
        }
    },
    created(){
        this.$http.get(`${process.env.VUE_APP_BACKEND_URL}/recipe?recipeID=${this.id}`)
        .then((response) => {
            response.data.forEach((recipe) => {
                this.$store.dispatch('setOneRecipe',recipe);
            })
        });
    },
    mounted(){
        document.getElementById("ingredientSelector").click();
    },
    computed:{
        recipe(){
            return this.$store.state.recipe;
        }
    },
    components: {
        TheHeader,
        TheFooter,
    },
    methods:{
        ingredientClicked(){
            document.getElementById("recipeInformationSelectorLeft").style.backgroundColor  = "white";
            document.getElementById("recipeInformationSelectorMiddle").style.backgroundColor  = "rgb(230, 230, 230)";
            document.getElementById("recipeInformationSelectorRight").style.backgroundColor  = "rgb(230, 230, 230)";
        },
        descriptionClicked(){
            document.getElementById("recipeInformationSelectorLeft").style.backgroundColor  = "rgb(230, 230, 230)";
            document.getElementById("recipeInformationSelectorMiddle").style.backgroundColor  = "white";
            document.getElementById("recipeInformationSelectorRight").style.backgroundColor  = "rgb(230, 230, 230)";
        },
        imageClicked(){
            document.getElementById("recipeInformationSelectorLeft").style.backgroundColor  = "rgb(230, 230, 230)";
            document.getElementById("recipeInformationSelectorMiddle").style.backgroundColor  = "rgb(230, 230, 230)";
            document.getElementById("recipeInformationSelectorRight").style.backgroundColor  = "white";
        },
        deleteItem(){
            recipeCURLController.deleteRecipe(this.$store.state.recipe.recipeID);
            setTimeout(function() {window.location.href = "/home?sort=asc"},500);
        },
        editItem(){
            window.location.href = "/editRecipe/" + this.$store.state.recipe.recipeID;
        },
    }
}
</script>

<style lang="scss" scoped>
.detailRecipe{
    min-height: 100vh;
    & .detailRecipeContent{
        width: 100%;
        min-height: 87.5vh;
        padding: 0 1rem 1rem 1rem;
        & .recipeName-row{
            & .col{
                padding-left: 0;
                padding-right: 0;
            }
            & .recipeName{
                font-size: 30px;
                font-weight: bold;
                word-wrap: break-word;
            }
        }
        & .button{
            float: right;
        }
        & .row{
            margin: 0px;
        }        
        & .recipeInformationSelectorLeft{
            background-color: rgb(255, 255, 255);
            opacity: 0.85;
            padding: 5px;    
            font-size: 1rem;
            font-weight: bold;
            line-height: 20px;
            border-top: 2px solid rgba(2, 76, 140, 1);
            border-left: 2px solid rgba(2, 76, 140, 1);
            border-top-right-radius: 15px;
            border-top-left-radius: 15px;
            text-align: center;
            padding-top: 10px;
        }
        & .recipeInformationSelectorMiddle{
            background-color: rgb(230, 230, 230);
            opacity: 0.85;
            padding: 5px;    
            font-size: 1rem;
            font-weight: bold;
            line-height: 20px;
            border-top: 2px solid rgba(2, 76, 140, 1);
            border-left: 2px solid rgba(2, 76, 140, 1);
            border-right: 2px solid rgba(2, 76, 140, 1);
            border-top-right-radius: 15px;
            border-top-left-radius: 15px;
            text-align: center;
            padding-top: 10px;
            
        }
        & .recipeInformationSelectorRight{
            background-color: rgb(230, 230, 230);
            opacity: 0.85;
            padding: 5px;    
            font-size: 1rem;
            font-weight: bold;
            line-height: 20px;
            border-top: 2px solid rgba(2, 76, 140, 1);
            border-right: 2px solid rgba(2, 76, 140, 1);
            border-top-right-radius: 15px;
            border-top-left-radius: 15px;
            text-align: center;
            padding-top: 10px;
        }
        & .recipeInformationSelectorLink{
            color: black;
            text-decoration: none;
        }
        & .recipeInformationContent{
            border-right: 2px solid rgba(2, 76, 140, 1);
            border-left: 2px solid rgba(2, 76, 140, 1);
            border-bottom: 2px solid rgba(2, 76, 140, 1);
        }
    }
}
</style>