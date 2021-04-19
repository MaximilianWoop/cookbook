<template>
    <v-card class="imageGallery-Card">
        <v-toolbar class="imageGallery-toolbar">                                                
            <v-row>
                <v-col class="addImage-col">
                    <v-toolbar-title>Bilder</v-toolbar-title>                                                    
                </v-col>
                <v-col class="btn-col">
                    <v-btn persistent @click="toggleCamDialog" icon>
                        <v-icon>mdi-camera</v-icon>
                    </v-btn>  
                </v-col>                                                          
                <v-col class="btn-col">
                    <v-file-input :multiple="true" :hide-input="true" @change="onChangeImageFile" prepend-icon="mdi-plus" accept="image/*"/>
                </v-col>
                <v-col class="btn-col">
                    <v-btn icon id="deleteImageButton" @click="deleteImage">
                        <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </v-col>
            </v-row>                                                
        </v-toolbar>
        <v-container class="imageGallery-container">
            <v-carousel
                :show-arrows=showArrows
                :progress=false
                :continuous=false
                @change="changedImage"
                hide-delimiters-background>
                <v-carousel-item
                    v-for="(item,i) in imageItems"
                    :key="i"
                    :src="item.image"
                    contain
                    reverse-trasition="fade-transition"
                    transition="fade-transition"/>
            </v-carousel>
        </v-container>
        <div>
            <v-dialog v-model="cameraDialog" persistent >
                <template>
                    <v-card class="cam-Dialog">
                        <v-card-title>Bilder hinzufügen</v-card-title>
                        <v-card-text>
                            <v-row>
                                <video/>
                                <canvas style="display:none"/>
                            </v-row>
                            <v-row>
                                <v-col class="btn-col">
                                    <v-btn icon @click="toggleCamDialog">
                                        <v-icon>mdi-cancel</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col class="btn-col">
                                    <v-btn icon @click="cameraUseScreenShot">
                                        <v-icon>mdi-camera</v-icon>
                                    </v-btn>                                    
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </template>
            </v-dialog>
        </div>
    </v-card>       
</template>

<script>
function setCamSource(stream){
    document.querySelector('video').srcObject = stream;
    document.querySelector('video').play();
}
export default{
    data(){
        return{
            showArrows:false,
            cameraDialog: false,
        }
    },
    async mounted(){},
    computed:{
        imageItems(){
            return this.items;
        }
    },
    methods:{
        changedImage(value){
            this.$emit("changedGalleryImage",value);
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
    },
    props:['items']
}
</script>
