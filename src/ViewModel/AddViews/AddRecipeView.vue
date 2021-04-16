<template>
    <div class="container" data-app>
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
                                                    <div v-for="(ingredientInput,index) in ingredientsArray" :key=index style="width:100%">
                                                        <v-card>
                                                            <v-col class="ingredient-col-center">
                                                                <v-autocomplete
                                                                    v-model="ingredientInput.name"                                            
                                                                    :items="ingredients"   
                                                                    class="add-Recipe-Ingredient-Name" 
                                                                    :name="ingredientNameId" 
                                                                    item-text="name"                                       
                                                                    cache-items
                                                                    flat
                                                                    return-object
                                                                    hide-no-data
                                                                    @click="addIngredientTemplate(ingredientInput, ingredientsArray)"
                                                                    hide-details
                                                                    label="Zutaten"
                                                                    solo-inverted/>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-field 
                                                                    label="Menge" 
                                                                    :name="ingredientPortionId"
                                                                    type="number"
                                                                    class="add-Recipe-Ingredient-Portion"/>
                                                            </v-col>
                                                            <v-col align="center">
                                                                <!-- <v-select
                                                                    :items="ingredientsUnit"
                                                                    :name="ingredientUnitId"
                                                                    label="Einheit"
                                                                    class="add-Recipe-Ingredient-Unit"
                                                                    dense
                                                                    solo/> -->
                                                                <!-- <v-text-field  
                                                                    :value="ingredientInput.name"
                                                                    label="Einheit" 
                                                                    :name="ingredientDurationId"
                                                                    class="add-Recipe-Ingredient-Unit"
                                                                    outlined
                                                                    readonly/>                                                                     -->
                                                            </v-col>
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
                                            <v-toolbar>                                                
                                                <v-row>
                                                    <v-col>
                                                        <v-toolbar-title>Bilder</v-toolbar-title>                                                    
                                                    </v-col>
                                                    <v-spacer></v-spacer>
                                                    <v-col>
                                                        <v-btn persistent @click="toggleCamDialog" icon>
                                                            <v-icon>mdi-camera</v-icon>
                                                        </v-btn>  
                                                    </v-col>                                                          
                                                    <v-col>
                                                        <v-file-input :multiple="true" :hide-input="true" @change="onChangeImageFile" prepend-icon="mdi-plus" accept="image/*"/>
                                                    </v-col>
                                                    <v-col>
                                                        <v-btn icon id="deleteImageButton" @click="deleteImage">
                                                            <v-icon>mdi-trash-can-outline</v-icon>
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>                                                
                                            </v-toolbar>
                                            <ImageGallery :items="imageItems" v-on:changedGalleryImage="changedGalleryImage"/>
                                        </v-card>                                        
                                    </v-expansion-panel-content>                                    
                                </v-expansion-panel>                                
                            </v-expansion-panels>
                            <v-dialog v-model="cameraDialog" persistent>
                                <template>
                                    <v-card>
                                        <v-card-title>Bilder hinzufügen</v-card-title>
                                        <v-card-text>
                                            <v-row>
                                                <video/>
                                                <canvas style="display:none"/>
                                            </v-row>
                                            <v-row>
                                                <v-btn text @click="cameraUseScreenShot">Foto aufnehmen</v-btn>
                                                <v-btn text @click="toggleCamDialog">Abbrechen</v-btn>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </template>
                            </v-dialog>
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
import ImageGallery from '@/ViewModel/Elements/Images/imageGallery'

function setCamSource(ref, stream){
    document.querySelector('video').srcObject = stream;
    document.querySelector('video').play();
}

var vueModel = {
    data(){
        return{
            selected: '',
            // general
            name: '',
            duration: '',
            description: '',
            nameRules: [v => v.length <= 50 || 'Maximale Zeichenanzahl ist 50'],
            durationRules: [v => v.length <= 4 || 'Maximale Zeichenanzahl ist 4'],
            descriptionRules: [v => v.length <= 60000 || 'Maximale Zeichenanzahl ist 60000'],
            tagCounter: 0,
            // ingredients
            selectIngredient: null,
            loadingIngredients: false,
            ingredients: [],
            searchIngredient: null,
            ingredientNameId: 'ingredientNameObjects',
            ingredientPortionId: 'ingredientPortionObjects',
            ingredientUnitId: 'ingredientUnitObjects',
            //tags
            selectTag: null,
            loadingTags: false,
            tags: [],
            searchTag: null,
            tagId: 'tagObjects',
            //image
            imageItems:[],
            selectedImage: 0,
            cameraDialog: false,
            //generator
            ingredientsArray: [{}],
            tagsArray: [{}],
            //menu
            ingredientsUnit: ['STK','EL','TL','g','KG','ml','L'],
            offset: true,
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
        addIngredientTemplate(value, fieldType) {      
            fieldType.push({value: ""});       
        },
        addTagTemplate(value, fieldType) {
            this.tagCounter++;
            if(this.tagCounter <= 4){
                fieldType.push({value: ""});                
            }            
        },
        toggleCamDialog(){
            this.cameraDialog = !this.cameraDialog;
            if(this.cameraDialog){
                navigator.mediaDevices.getUserMedia({video: true}).then(setCamSource.bind(null.this));
            }
            else{
                var stream = document.querySelector('video').srcObject;
                stream.getTracks().forEach(function(track){
                    track.stop();
                });
                document.querySelector('video').pause();
            }
            setTimeout(() => {
                document.getElementById("deleteButton").style.display = 'inline';
            },100);
        },
        cameraUseScreenShot(){
            var video = document.querySelector('video');
            var canvas = document.querySelector('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video,0,0);
            var dataURL = canvas.toDataURL('image/webp');
            var newImage = {
                image: dataURL
            }
            this.imageItems.push(newImage);
            this.toggleCamDialog();
        },
        deleteImage(){
            this.imageItems.splice(this.selectedImage,1);
        },
        changedGalleryImage(value){
            this.selectedImage = value;
        },
        onChangeImageFile(files){
            files.forEach(file=>{
                if(file.type.match('image.*')){
                    var reader = new FileReader();
                    reader.onload = (function(thisFile, ref){
                        return function(e){
                            ref.imageItems.push({
                                image: e.target.result,
                            });
                        }
                    })(file,this);
                    reader.readAsDataURL(file);
                }
                else{
                    this.fileNotImage = true;
                }
            });
        },
        // removeIngredientTemplate(index, fieldType){
        //     fieldType.splice(index, 1);
        // }
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
            var selectedIngredientNames = document.getElementsByName("ingredientNameObjects");
            var selectedIngredientPortions = document.getElementsByName("ingredientPortionObjects");       

            var ingredients = [];
            var ingredientCounter;
            for(ingredientCounter = 0; ingredientCounter < service.getNameOfArrayObjects(selectedIngredientNames).length; ingredientCounter++){
                ingredients[ingredientCounter] = new Object();                 
                ingredients[ingredientCounter].name = service.getNameOfArrayObjects(selectedIngredientNames)[ingredientCounter];
                ingredients[ingredientCounter].portion = service.getNameOfArrayObjects(selectedIngredientPortions)[ingredientCounter]; 
                //get ingredientId
                var tempIngredient = this.$store.state.ingredients.find(x => x.name === ingredients[ingredientCounter].name);
                var ingredientId = tempIngredient.ingredientID;
                ingredients[ingredientCounter].ingredientID = ingredientId;
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
                images[imageCounter] = this.imageItems[imageCounter]; // image muss converted werden
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
            
                helper.createRecipe(recipe);
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