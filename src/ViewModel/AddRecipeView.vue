<template>
    <div data-app>
        <v-row>
            <v-col>
                <v-row no-gutters>
                    <v-card outline class="addRecipeCard">
                        <v-card-title class="h2">Neues Rezept</v-card-title>
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
                                                    id="add-Recipe-Recipe-Name"
                                                    v-model="name" 
                                                    counter=50 
                                                    :rules="nameRules" 
                                                    clearable
                                                    outlined/>
                                            </v-col>
                                        </v-row>
                                        <!-- Duration -->
                                        <v-row>
                                            <v-col>
                                                <v-text-field 
                                                    label="Dauer"
                                                    id="add-Recipe-Recipe-Duration"
                                                    v-model="duration"
                                                    type="number"
                                                    counter=4
                                                    :rules="durationRules"
                                                    clearable
                                                    outlined />
                                            </v-col>
                                        </v-row>
                                        <!-- Description -->
                                        <v-row>
                                            <v-col>
                                                <v-textarea 
                                                    label="Beschreibung der Zubereitung"
                                                    id="add-Recipe-Recipe-Description"
                                                    v-model="description"
                                                    :rules="descriptionRules"
                                                    clearable
                                                    outlined/>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>                                    
                                </v-expansion-panel>                                
                            </v-expansion-panels>
                            <!-- Ingredients -->
                            <v-expansion-panels accordion>
                                <v-expansion-panel @click="loadIngredients">
                                    <v-expansion-panel-header>Zutaten</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <template>
                                            <form id="addRecipeIngredientTemplateForm">
                                                <v-row>
                                                    <div style="width:100%">
                                                        <v-card>
                                                            <v-col>
                                                                <v-card>
                                                                    <v-data-table
                                                                        :headers="headers"
                                                                        :items="listOfSelecetIngredient"
                                                                        :items-per-page="10"
                                                                        class="elevation-1">                                                                        
                                                                    </v-data-table>
                                                                </v-card>                                                                
                                                            </v-col>
                                                            <v-card>
                                                                <v-col class="ingredient-col-center">                                                                
                                                                    <v-autocomplete
                                                                        label="Zutaten"                                   
                                                                        :items="ingredients"   
                                                                        item-text="name" 
                                                                        @input="handelInputIngredient"
                                                                        return-object  
                                                                        v-model="selectIngredient"  
                                                                        id="ingredientNameId"                                                                       
                                                                        />                                                                                                                                    
                                                                </v-col>
                                                                <v-col>
                                                                    <v-text-field 
                                                                        label="Menge" 
                                                                        id="ingredientPortionId"
                                                                        type="number"/>
                                                                </v-col>
                                                                <v-col align="center">
                                                                    <v-text-field  
                                                                        :value="selectIngredient.measurement"
                                                                        item.name = "name"
                                                                        label="Einheit" 
                                                                        id="ingredientDurationId"
                                                                        outlined
                                                                        readonly/>                                                                    
                                                                </v-col>
                                                                <v-col>
                                                                    <v-btn @click="addIngredientToList">Add</v-btn>
                                                                </v-col>
                                                            </v-card>
                                                        </v-card>
                                                    </div>
                                                </v-row>
                                            </form>
                                        </template>
                                    </v-expansion-panel-content>                                    
                                </v-expansion-panel>                                
                            </v-expansion-panels>
                            <!-- Tags -->
                            <v-expansion-panels accordion>
                                <v-expansion-panel @click="loadTags">
                                    <v-expansion-panel-header>Tags</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <template>
                                            <form id="add-Recipe-Tag-Template-Form">
                                                <v-row>
                                                    <div v-for="(tagInput, index) in tagsArray" :key="`tagInput-${index}`">                                                    
                                                        <v-col class="add-Recipe-Tag-Template-From-col">
                                                            <v-autocomplete
                                                                v-model="tagInput.tagvalue"                                            
                                                                :items="tags"                                            
                                                                cache-items
                                                                :name="tagId"
                                                                item-text="name"
                                                                class="add-Recipe-Tag-Name"
                                                                flat
                                                                hide-no-data
                                                                @click="addTagTemplate(tagInput, tagsArray)"
                                                                hide-details
                                                                label="Tags"
                                                                solo-inverted/>
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
                                        <v-card>
                                            <ImageGallery :items="imageItems" v-on:changedGalleryImage="changedGalleryImage"/>
                                        </v-card>                                        
                                    </v-expansion-panel-content>                                    
                                </v-expansion-panel>                                
                            </v-expansion-panels>
                        </v-row>
                        <!-- Buttons -->
                        <v-row>
                            <v-col class="button-col-width">
                                <v-btn                
                                    href="/cookbookview"
                                    class="cancelButton"
                                    >Abbrechen                                
                                </v-btn>
                            </v-col>
                            <v-col class="save-button-right button-col-width">
                                <v-btn                
                                    class="saveButton"
                                    @click="getRecipeData"
                                    >Speichern                                
                                </v-btn>
                            </v-col>                            
                        </v-row>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </div>            
</template>

<script defer>

import helper from '@/Helper/dataController'
import service from '@/Helper/serviceHelper'
import ImageGallery from '@/ViewModel/Elements/imageGallery'

var vueModel = {
    data(){
        return{
            //Datatable
            headers: [
                { text: 'Index', value: 'ingredientID' },
                { text: 'Name', value: 'name' },
                { text: 'Menge', value: 'portion' },
                { text: 'Einheit', value: 'measurement' },
            ],
            // general
            name: '',
            duration: '',
            description: '',
            nameRules: [v => v.length <= 50 || 'Maximale Zeichenanzahl ist 50'],
            durationRules: [v => v.length <= 4 || 'Maximale Zeichenanzahl ist 4'],
            descriptionRules: [v => v.length <= 60000 || 'Maximale Zeichenanzahl ist 60000'],
            tagCounter: 0,
            // ingredients
            selectIngredient: {},
            ingredients: [],
            listOfSelecetIngredient: [],
            //tags
            selectTag: null,
            loadingTags: false,
            tags: [],
            searchTag: null,
            tagId: 'tagObjects',
            //image
            imageItems:[],
            selectedImage: 0,
            //generator
            ingredientsArray: [{}],
            tagsArray: [{}],
        }
    },
    async mounted(){
        if(this.$store.state.ingredients.length === 0)
        {
            await helper.getIngredientsFromURL(this);
        }
        if(this.$store.state.tags.length === 0)
        {
            await helper.getTagsFromURL(this);
        }
    },
    computed:{
        recipes(){
            return this.$store.state.recipes;
        },
        ingredients(){
            return this.$store.state.ingredients;
        },
        tags(){
            return this.$store.state.tags;
        },
    },
    methods:{
        addIngredientToList(){
            var selectedIngredientPortion = document.getElementById("ingredientPortionId");    
            this.selectIngredient.portion = selectedIngredientPortion.value;
            this.listOfSelecetIngredient.push(this.selectIngredient);
            var counter = 0;
            this.ingredients.forEach(item => {
                if(item.ingredientID === this.selectIngredient.ingredientID){
                    this.ingredients.splice(counter,1);
                }
                counter++;
            });
            document.getElementById("ingredientDurationId").value ="";
            document.getElementById("ingredientPortionId").value ="";
        },
        handelInputIngredient(value){
            this.selectIngredient = value;
        },
        loadIngredients(){
            var i = 0;
                this.$store.state.ingredients.forEach((ingredient) => {     
                    this.ingredients[i] = ingredient;
                    i++;
                }); 
        },
        loadTags(){
            var i = 0;
            this.$store.state.tags.forEach((tag) => {      
                this.tags[i] = tag;
                i++;
            }); 
        },
        addTagTemplate(value, fieldType) {
            this.tagCounter++;
            if(this.tagCounter <= 4){
                fieldType.push({value: ""});                
            }            
        },
        changedGalleryImage(value){
            this.selectedImage = value;
        },
        getRecipeData(){
            //general
            try{
                var name = document.getElementById('add-Recipe-Recipe-Name').value;
                var duration = document.getElementById('add-Recipe-Recipe-Duration').value;
                var description = document.getElementById('add-Recipe-Recipe-Description').value;
            }
            catch(exception){
                console.log("there is something missing");
            }
            //ingredients
            try{
                var ingredients = [];
                var ingredientCounter;
                for(ingredientCounter = 0; ingredientCounter < this.listOfSelecetIngredient.length; ingredientCounter++){
                    ingredients[ingredientCounter] = new Object();                 
                    ingredients[ingredientCounter].id= this.listOfSelecetIngredient[ingredientCounter].ingredientID;
                    ingredients[ingredientCounter].name = this.listOfSelecetIngredient[ingredientCounter].name;
                    ingredients[ingredientCounter].portion = this.listOfSelecetIngredient[ingredientCounter].portion; 
                    ingredients[ingredientCounter].measurement = this.listOfSelecetIngredient[ingredientCounter].measurement;
                } 
            }
            catch(exception){
                console.log("ingredient has an error");
            }
           
            //tags
            var selectedTags = document.getElementsByName("tagObjects");

            var tags = [];
            var tagCounter;
            for(tagCounter = 0; tagCounter < service.getNameOfArrayObjects(selectedTags).length; tagCounter++){
                tags[tagCounter] = new Object();           
                tags[tagCounter].name = service.getNameOfArrayObjects(selectedTags)[tagCounter];
                //get tagId
                var tempTag = this.$store.state.tags.find(x => x.name === tags[tagCounter].name);
                var tagId = tempTag.tagID;
                tags[tagCounter].tagID = tagId;
            } 
            //images
            var images = [];
            var imageCounter;
            for(imageCounter = 0; imageCounter < this.imageItems.length; imageCounter++){
                images[imageCounter] = new Object();  
                var temp = this.imageItems[imageCounter].image;  
                temp = temp.substring(23);       
                images[imageCounter].image = temp;         
            } 
            //Put all informations to one recipe together
            try{
                var recipe = new Object();
                recipe.name = name;
                recipe.duration = duration;
                recipe.description = description;
                recipe.ingredients = ingredients;
                recipe.tags = tags;
                recipe.images = images;
                recipe.temperature = null;
                console.log(recipe);
                helper;
                // helper.createRecipe(recipe);
            }
            catch(exception){
                console.log("error");
            }
        },
    },
    props:[],
    components:{
        'ImageGallery':ImageGallery,
    },
}
export default vueModel
</script>