<template>
    <div>
        <template>
    <div>
        <TheHeader/>
        <div class="editRecipe">
            <v-row>
                <v-col>
                    <h2>Rezept editieren</h2>
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
                            <v-col v-if="this.recipeIngredients.length != 0">
                                <IngredientList :ingredients="computedIngredients"/>
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
                            <v-col v-if="this.recipeTags.length != 0">
                                <TagList :tags="computedTags"/>
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
                                <ImageGallery :items="this.recipeImages" v:on="changedGalleryImage"/>
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
            recipeIngredients: [],
            recipeTags: [],
            recipeImages: [],
        }
    },
    created(){
        this.$http.get(`${process.env.VUE_APP_BACKEND_URL}/recipe?recipeID=` + this.$route.params.id)
        .then((response) => {
            this.recipeName = response.data[0].name;
            this.recipeDuration = parseInt(response.data[0].duration.replace("Min", "").trim());
            this.recipeDescription = response.data[0].description;
            response.data[0].ingredients.forEach(ingredient => {
                this.recipeIngredients.push(ingredient);
            });
            response.data[0].tags.forEach(tag => {
                this.recipeTags.push(tag);                
            });
            response.data[0].images.forEach(image => {
                this.recipeImages.push(image);
            });
        });
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
            var temp = this.$store.state.ingredients;
            for(var counter = 0; counter < this.$store.state.ingredients.length; counter++){
                this.recipeIngredients.forEach(item => {                    
                    if(this.$store.state.ingredients[counter].ingredientID === item.ingredientID){
                        temp.splice(counter, 1);
                        counter--;
                    }
                });
            }
            return temp;
        },
        tagAutocomplete(){
            var temp = this.$store.state.tags;
            for(var counter = 0; counter < this.$store.state.tags.length; counter++){
                this.recipeTags.forEach(item => {
                    if(this.$store.state.tags[counter].tagID === item.tagID){
                        temp.splice(counter, 1);
                        counter--;
                    }
                });
            }
            return temp;
        },
        computedTags(){
            return this.recipeTags;
        },
        computedIngredients(){
            return this.recipeIngredients;
        },
        computedImages(){   
            return this.recipeImages;
        }
    },
    components: {
        TheHeader,
        IngredientList,
        TagList,
        ImageGallery,
        TheFooter,
    },
    methods:{
        save(){
            try{
                var recipe = new Object;
                var id = this.$route.params.id;
                recipe.recipeID = this.$route.params.id;
                recipe.name = this.recipeName;
                recipe.duration = this.recipeDuration;
                recipe.description = this.recipeDescription;
                recipe.temperature = 0;                
                recipe.ingredients = this.createIngredientObjects();
                recipe.tags = this.createTagObjects();
                recipe.images = this.createImageObjects();
                recipeCURLController.updateRecipe(recipe);
                setTimeout(function() {window.location.href = "/detailRecipe/"+ id +"/ingredients";},500);
            }catch(exception){
                console.log(exception.message);
            }
        },
        cancel(){
            var id = this.$route.params.id;
            setTimeout(function() {window.location.href = "/detailRecipe/" + id +"/ingredients";},500);
        },
        createIngredientObjects(){
            var tempIngredients = [];
            var ingredientCounter;
            for(ingredientCounter = 0; ingredientCounter < this.recipeIngredients.length; ingredientCounter++){
                tempIngredients[ingredientCounter] = new Object();                 
                tempIngredients[ingredientCounter].ingredientID = this.recipeIngredients[ingredientCounter].ingredientID;
                tempIngredients[ingredientCounter].name = this.recipeIngredients[ingredientCounter].name;
                tempIngredients[ingredientCounter].portion = this.recipeIngredients[ingredientCounter].portion; 
                tempIngredients[ingredientCounter].measurement = this.recipeIngredients[ingredientCounter].measurement;
            } 
            return tempIngredients;
        },
        createTagObjects(){
            var tempTags = [];
            var tagCounter;
            for(tagCounter = 0; tagCounter < this.recipeTags.length; tagCounter++){
                tempTags[tagCounter] = new Object();           
                tempTags[tagCounter].name = this.recipeTags[tagCounter].name;
                tempTags[tagCounter].tagID = this.recipeTags[tagCounter].tagID;
            } 
            return tempTags;
        },
        createImageObjects(){
            var tempImages = [];
            var imageCounter;
            for(imageCounter = 0; imageCounter < this.recipeImages.length; imageCounter++){
                tempImages[imageCounter] = new Object();  
                var temp = this.recipeImages[imageCounter].image; 
                // temp = temp.substring(23);       
                tempImages[imageCounter].image = temp;         
            } 
            return tempImages;
        },
        addTagToList(){            
            if(this.selectTag != null && this.selectTag != ''){
                var tag = new Object;
                tag = this.selectTag;
                this.recipeTags.push(tag);
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
            if(this.selectIngredient.name != null && this.selectIngredient.name != "" && this.portionOfSelectedIngredient != null && this.portionOfSelectedIngredient != ""){
                this.selectIngredient.portion = this.portionOfSelectedIngredient;
                this.recipeIngredients.push(this.selectIngredient);
                var counter = 0;
                this.ingredientAutocomplete.forEach(item => {
                    if(item.ingredientID === this.selectIngredient.ingredientID){
                        this.ingredientAutocomplete.splice(counter,1);
                    }
                    counter++;
                });
                this.selectIngredient = {};
                this.portionOfSelectedIngredient = null;
            }
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
.editRecipe{
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