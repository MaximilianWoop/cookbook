<template>
    <div class="container" data-app>
        <v-row>
            <v-col>
                <v-row no gutters>
                    <v-card outlined class="addIngredientCard">
                        <v-card-title class="h2">Neue Zutat</v-card-title>
                        <v-row>
                            <v-card style="width:100%" outlined>
                                <v-col>
                                    <v-text-field 
                                        label="Name" 
                                        v-model="ingredientName"
                                        id="ingredientNameId"
                                        outlined/>
                                </v-col>
                                <v-col>
                                    <v-text-field 
                                        label="Menge" 
                                        v-model="ingredientPortion"
                                        id="ingredientPortionId"
                                        outlined
                                        type="number"/>
                                </v-col>
                                <v-col align="center">
                                    <v-select
                                        :items="measurements"
                                        label="Einheit"
                                        id="ingredientMeasurementId"
                                        dense
                                        solo
                                        ></v-select>                                                                   
                                </v-col>
                                <v-col>
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
                                </v-col>
                            </v-card>
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
                                    @click="getIngredientData"
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
import ImageGallery from '@/ViewModel/Elements/Images/imageGallery'

function setCamSource(ref, stream){
    document.querySelector('video').srcObject = stream;
    document.querySelector('video').play();
}

var vueModel = {
    data(){
        return{
            ingredientName: '',
            ingredientPortion: '',
            ingredientMeasurement: '',
            measurements: ['STK','TL','EL','g','Kg','ml','l'],
            //image
            imageItems:[],
            selectedImage: 0,
            cameraDialog: false,
        }
    },
    async mounted(){},
    computed:{},
    methods:{
        getIngredientData(){            
            try{
                var ingredient = new Object();
                //general
                ingredient.name = this.ingredientName;
                ingredient.protion = this.ingredientPortion;
                ingredient.measurement = this.ingredientMeasurement;
                //images
                var images = [];
                var imageCounter;
                for(imageCounter = 0; imageCounter < this.imageItems.length; imageCounter++){
                    images[imageCounter] = new Object();  
                    var temp = this.imageItems[imageCounter].image;  
                    temp = temp.substring(23);       
                    images[imageCounter] = temp;
                } 
                ingredient.images = images;
                //create ingredient
                helper.createIngredient(ingredient);
            }
            catch(exception){
                console.log("error by creating an ingredient");
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
        // addIngredientTemplate(value, fieldType) {      
        //     fieldType.push({value: ""});       
        // },
    },
    props:[],
    components:{
        'ImageGallery':ImageGallery,
    },
}
export default vueModel
 </script>