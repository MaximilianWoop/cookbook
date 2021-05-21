<template>
    <div>
        <TheHeader/>
        <div class="addRecipe">
            <v-row>
                <v-col>
                    <h2>Rezept Hinzufügen</h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col>                    
                    <v-card class="generall-card">
                        <v-row>
                            <v-col>
                                <v-text-field 
                                    placeholder="Name" 
                                    label="Name des Rezeptes"
                                    v-model="recipeName"/>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field 
                                    placeholder="Dauer" 
                                    label="Dauer des Rezeptes"
                                    type="number"
                                    v-model="recipeDuration"/>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card class="generall-card">
                        <v-row class="ingredient-row">
                            <v-col v-if="ingredients.length != 0">
                                <IngredientList :ingredients="ingredients"/>
                            </v-col>
                            <v-col class="ingredient-col-else" v-else>
                                <a>Keine Zutaten hinzugefügt</a>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-autocomplete
                                    label="Zutaten"                                   
                                    :items="ingredientAutocomplete"   
                                    item-text="name" 
                                    return-object  
                                    v-model="selectIngredient" 
                                    @input="handelInputIngredient"                                                                   
                                    />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="8">
                                <v-text-field
                                    placeholder="Menge"
                                    label="Menge der Zutat"
                                    type="number"
                                    v-model="portionOfSelectedIngredient"
                                    clearable/>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    label="Einheit"
                                    readonly
                                    item.name="name"
                                    :value="selectIngredient.measurement"/>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn @click="addIngredientToList">Add</v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card class="generall-card">
                        <v-row>
                            <v-col>
                                <v-textarea 
                                    height="500px"
                                    label="Beschreibung der Zubereitung"
                                    clearable
                                    outlined
                                    v-model="recipeDescription"/>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card class="generall-card">
                        <v-row class="tag-row">
                            <v-col v-if="tags.length != 0">
                                <TagList :tags="tags"/>
                            </v-col>
                            <v-col class="tag-col-else" v-else>
                                <a>Keine Tags hinzugefügt</a>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-autocomplete
                                    label="Tag"                                   
                                    :items="tagAutocomplete"   
                                    item-text="name" 
                                    return-object  
                                    v-model="selectTag" 
                                    @input="handelInputTag"/>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn @click="addTagToList">Add</v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card class="generall-card">
                        <v-row>
                            <v-col>
                                <ImageGallery :items="images" v:on="changedGalleryImage"/>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn class="cancel-btn" @click="cancel">Abbrechen</v-btn>
                </v-col>
                <v-col>
                    <v-btn class="save-btn" @click="save">Speichern</v-btn>
                </v-col>
            </v-row>
        </div>
        <TheFooter/>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';

import IngredientList from '@/components/IngredientList.vue';
import TagList from '../components/TagList.vue';
import ImageGallery from '../components/imageGallery.vue';

import recipeCURLController from '../Helper/Curl/RecipeController.js'

export default {
    data(){
        return{
            ingredients:[],
            tags: [],
            images: [],

            selectTag: {},
            tagString: null,

            selectIngredient: {},
            portionOfSelectedIngredient: null,            

            recipeName: null,
            recipeDuration: null,
            recipeDescription: null,
        }
    },
    created(){
        this.$http.get(`${process.env.VUE_APP_BACKEND_URL}/ingredient`)
        .then((response) => {
            response.data.forEach((ingredient) => {
                this.$store.dispatch('setManyIngredients',ingredient);
            })
        });
        this.$http.get(`${process.env.VUE_APP_BACKEND_URL}/tag`)
        .then((response) => {
            response.data.forEach((tag) => {
                this.$store.dispatch('setManyTags',tag);
            })
        });
    },
    computed:{
        ingredientAutocomplete(){
            return this.$store.state.ingredients;
        },
        tagAutocomplete(){
            return this.$store.state.tags;
        },
    },
    components: {
        TheHeader,
        IngredientList,
        TagList,
        ImageGallery,
        TheFooter,
    },
    methods: {
        save(){
            try{
                var recipe = new Object;
                recipe.name = this.recipeName;
                recipe.duration = this.recipeDuration;
                recipe.description = this.recipeDescription;
                recipe.temperature = 0;                
                recipe.ingredients = this.createIngredientObjects();
                recipe.tags = this.createTagObjects();
                recipe.images = this.createImageObjects();
                recipeCURLController.createRecipe(recipe);
            }catch(exception){
                console.log(exception.message);
            }
        },
        createIngredientObjects(){
            var tempIngredients = [];
            var ingredientCounter;
            for(ingredientCounter = 0; ingredientCounter < this.ingredients.length; ingredientCounter++){
                tempIngredients[ingredientCounter] = new Object();                 
                tempIngredients[ingredientCounter].ingredientID = this.ingredients[ingredientCounter].ingredientID;
                tempIngredients[ingredientCounter].name = this.ingredients[ingredientCounter].name;
                tempIngredients[ingredientCounter].portion = this.ingredients[ingredientCounter].portion; 
                tempIngredients[ingredientCounter].measurement = this.ingredients[ingredientCounter].measurement;
            } 
            return tempIngredients;
        },
        createTagObjects(){
            var tempTags = [];
            var tagCounter;
            for(tagCounter = 0; tagCounter < this.tags.length; tagCounter++){
                tempTags[tagCounter] = new Object();           
                tempTags[tagCounter].name = this.tags[tagCounter].name;
                tempTags[tagCounter].tagID = this.tags[tagCounter].tagID;
            } 
            return tempTags;
        },
        createImageObjects(){
            var tempImages = [];
            var imageCounter;
            for(imageCounter = 0; imageCounter < this.images.length; imageCounter++){
                tempImages[imageCounter] = new Object();  
                var temp = this.images[imageCounter].image; 
                // temp = temp.substring(23);       
                tempImages[imageCounter].image = temp;         
            } 
            return tempImages;
        },
        getNameOfArrayObjects(data){
            var name = [];
            var counter = 0;
            data.forEach(item =>{
                if(item.value != null && item.value != "" && item.value != "[object Object]"){
                    var check = false;
                    name.forEach(temp => {
                        if(temp == item.value){
                            check = true;
                            return;
                        }
                    })
                    if(check != true){
                        name[counter] = item.value;
                        counter++;
                    }
                }
            });
            return name;
        },
        cancel(){
            this.recipeName = null;
            this.recipeDuration = null;
            this.recipeDescription = null;
            this.tagString = null;
            this.tags = [];
            this.selectIngredient = {};
            this.portionOfSelectedIngredient = null;
            this.ingredients = [];
            this.images = [];
        },
        addTagToList(){            
            if(this.selectTag != null && this.selectTag != ''){
                var tag = new Object;
                tag = this.selectTag;
                this.tags.push(tag);
                var counter = 0;
                this.tagAutocomplete.forEach(item => {
                    if(item.tagID === this.selectTag.tagID){
                        this.tagAutocomplete.splice(counter,1);
                    }
                    counter++;
                });
                this.selectTag = {};
            }      
        },
        addIngredientToList(){
            this.selectIngredient.portion = this.portionOfSelectedIngredient;
            this.ingredients.push(this.selectIngredient);
            var counter = 0;
            this.ingredientAutocomplete.forEach(item => {
                if(item.ingredientID === this.selectIngredient.ingredientID){
                    this.ingredientAutocomplete.splice(counter,1);
                }
                counter++;
            });
            this.selectIngredient = {};
            this.portionOfSelectedIngredient = null;

        },
        handelInputIngredient(value){
            this.selectIngredient = value;
        },
        handelInputTag(value){
            this.selectTag = value;
        },
        changedGalleryImage(value){
            this.selectedImage = value;
        },
    }
}
</script>

<style lang="scss" scoped>
.addRecipe{
    padding: 1rem;
    & .generall-card{
        padding: 5px;
        & .tag-row{
            text-align: center;
        }        
        & .ingredient-row{
            text-align: center;
        }
    }
    & .cancel-btn{
        width: 100%;
    }
    & .save-btn{
        width: 100%;
    }
}
</style>