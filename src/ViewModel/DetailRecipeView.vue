<template>
    <div data-app class="detail-recipe-view">
        <v-row>
            <v-col>
                <v-row no-gutters>
                    <v-card outline class="recipeDetailCard" id="recipeDetailCard-Id">
                         <v-card-title class="h2">{{this.name}}</v-card-title>
                         <v-row>
                             <!-- General -->
                             <v-expansion-panels accordion>
                                <v-expansion-panel class="expansion-panel-general">
                                    <v-expansion-panel-header>Allgemeines</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                         <!-- Name -->
                                        <v-row>
                                            <v-col>
                                                <v-text-field 
                                                    label="Name"
                                                    :value="this.name" 
                                                    id="detail-Recipe-Recipe-Name" 
                                                    readonly
                                                    outlined/>
                                            </v-col>
                                        </v-row>
                                        <!-- Duration -->
                                        <v-row>
                                            <v-col>
                                                <v-text-field
                                                    label="Dauer" 
                                                    :value="this.duration"
                                                    id="detail-Recipe-Recipe-Duration"
                                                    readonly
                                                    outlined />
                                            </v-col>
                                        </v-row>                                      
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                             </v-expansion-panels>
                             <!-- Ingredients -->
                             <v-expansion-panels accordion>
                                <v-expansion-panel class="expansion-panel-general">
                                    <v-expansion-panel-header>Zutaten</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <template>
                                            <form>
                                                <v-row>
                                                    <div v-for="ingredient in ingredients" :key=ingredient>
                                                        <v-card>
                                                            <!-- Name -->
                                                            <v-col>                                                                
                                                                <v-text-field 
                                                                    label="Name"
                                                                    :value="ingredient.name"
                                                                    id="detail-Recipe-Ingredient-Name"
                                                                    readonly
                                                                    outlined />
                                                            </v-col> 
                                                            <v-row>
                                                                <v-col>
                                                                    <!-- portion -->
                                                                    <v-text-field
                                                                        label="Menge"
                                                                        :value="ingredient.portion"
                                                                        id="detail-Recipe-Ingredient-Portion"
                                                                        readonly
                                                                        outlined />
                                                                </v-col>
                                                                <v-col>
                                                                    <!-- measurement -->
                                                                    <v-text-field 
                                                                        label="Einheit"
                                                                        :value="ingredient.measurement"
                                                                        id="detail-Recipe-Ingredient-Measurement"
                                                                        class="right"
                                                                        readonly
                                                                        outlined />
                                                                </v-col>
                                                            </v-row>                                                           
                                                        </v-card>
                                                    </div>
                                                </v-row>
                                            </form>
                                        </template>  
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                             </v-expansion-panels>
                            <!-- Beschreibung -->
                             <v-expansion-panels accordion>
                                <v-expansion-panel class="expansion-panel-general">
                                    <v-expansion-panel-header>Zubereitung</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-row>
                                            <v-col>
                                                <v-textarea 
                                                    :value="description"
                                                    id="detail-Recipe-Recipe-Description"
                                                    readonly
                                                    outlined/>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                             </v-expansion-panels>
                             <!-- Tags -->
                            <v-expansion-panels accordion>
                                <v-expansion-panel>
                                    <v-expansion-panel-header>Tags</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <template>
                                            <form>
                                                <v-row>
                                                    <div v-for="tag in tags" :key="tag">                                                    
                                                        <v-col>
                                                            <v-text-field 
                                                                label="Name"
                                                                :value="tag.name"
                                                                id="detail-Recipe-Recipe-Description"
                                                                readonly
                                                                outlined/>
                                                        </v-col>                                                    
                                                    </div>
                                                </v-row>
                                            </form>
                                        </template>
                                    </v-expansion-panel-content>                                    
                                </v-expansion-panel>                                
                            </v-expansion-panels>
                            <!-- Images -->
                            <v-expansion-panels accordion>
                                <v-expansion-panel>
                                    <v-expansion-panel-header>Bilder</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <div v-for="(item, index) in this.images" :key="index">
                                            <v-row> 
                                                <v-img v-bind:src="'data:image/jpeg;base64,'+ item.image"/>
                                                <!-- <ImageGallery :items="images"/> -->
                                            </v-row>
                                        </div>
                                    </v-expansion-panel-content>                                    
                                </v-expansion-panel>                                
                            </v-expansion-panels>
                         </v-row>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </div>            
</template>

<script defer>

import helper from '@/Helper/dataController'
import ImageGallery from '@/ViewModel/Elements/imageGallery'

var vueModel = {
    data(){
        return{
            id: 0,
            name: '',
            duration: 0,
            temperature: 0,
            description: '',    
            createDate: null,
            changeDate: null,
            user: null,
            ingredients: [],
            tags:[],
            images: [],
        }
    },
    async mounted(){
        //get data
        if(this.$store.state.recipes.length<=0){
            document.getElementById("recipeDetailCard-Id").style.display = "none"
            document.getElementById("loadingCircle").style.display = "inline";
            await helper.getRecipesFromURL(this);
            document.getElementById("loadingCircle").style.display = "none";
            document.getElementById("recipeDetailCard-Id").style.display = "inline"
        }          
        const currentURL = new URL(document.location.href);
        var id = currentURL.searchParams.get("recipeId");
        var recipe = this.$store.getters.getSelectedRecipe(id);   

        //general
        this.id = recipe.recipeID;
        this.name = recipe.name;
        this.duration = recipe.duration;
        this.description = recipe.description;
        this.temperature = recipe.temperature;
        this.createDate = recipe.created;
        this.changeDate = recipe.updated;
        
        //ingredients
        var ingredientIndex;
        for(ingredientIndex = 0; ingredientIndex < recipe.ingredients.length; ingredientIndex++){
            try{
                this.ingredients[ingredientIndex] = new Object();
                this.ingredients[ingredientIndex].id = recipe.ingredients[ingredientIndex].ingredientID;
                this.ingredients[ingredientIndex].name = recipe.ingredients[ingredientIndex].name;
                this.ingredients[ingredientIndex].portion = recipe.ingredients[ingredientIndex].portion;
                this.ingredients[ingredientIndex].measurement = recipe.ingredients[ingredientIndex].measurement;
                if(recipe.ingredients[ingredientIndex].images.length != 0){
                    var ingredientImageIndex;
                    for(ingredientImageIndex = 0; ingredientImageIndex <= recipe.ingredients[ingredientIndex].images.length; ingredientIndex++){
                        this.ingredients[ingredientIndex].images[ingredientImageIndex] = new Object;
                        this.ingredients[ingredientIndex].images[ingredientImageIndex].image = recipe.ingredients[ingredientIndex].images[ingredientIndex].image;
                    }
                }
            }
            catch(exception){
                console.error("Error:");
                console.error(exception.message);
            }                
        }         
        //tags
        var tagIndex;
        for(tagIndex = 0; tagIndex < recipe.tags.length; tagIndex++){
            try{
                this.tags[tagIndex] = new Object();
                this.tags[tagIndex].id = recipe.tags[tagIndex].tagID;
                this.tags[tagIndex].name = recipe.tags[tagIndex].name;
            }
            catch(exception){
                console.error("Error:");
                console.error(exception.message);
            }                
        }
        //images 
        var imageIndex;
        for(imageIndex = 0; imageIndex < recipe.images.length; imageIndex++){
            try{
                this.images[imageIndex] = new Object();
                this.images[imageIndex].id = recipe.images[imageIndex].imageID;
                this.images[imageIndex].image = recipe.images[imageIndex].image;
            }
            catch(exception){
                console.error("Error:");
                console.error(exception.message);
            }                
        }
    },
    computed:{},
    methods:{},
    props:[],
    components:{
        'ImageGallery':ImageGallery,
    },
}
export default vueModel
</script>