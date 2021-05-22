<template>
    <div>
        <TheHeader/>
        <div class="addTag">
            <v-row>
                <v-col>
                    <h2>Tag Hinzufügen</h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col>                    
                    <v-card class="generall-card">
                        <v-row>
                            <v-col>
                                <v-text-field 
                                    placeholder="Name" 
                                    label="Name des Tag"
                                    v-model="tagName"/>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-row>
                        <v-col>
                            <v-btn class="cancel-btn" @click="cancel">Abbrechen</v-btn>
                        </v-col>
                        <v-col>
                            <v-btn class="save-btn" @click="save">Speichern</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>
        <TheFooter/>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';

import tagCURLController from '../Helper/Curl/TagController.js'

export default {
    data(){
        return{
            tagName: '',
            check: false,
        }
    },
    created(){
        this.$store.state.tags = [],
        this.$http.get(`${process.env.VUE_APP_BACKEND_URL}/tag`)
        .then((response) => {
            response.data.forEach((tag) => {
                this.$store.dispatch('setManyTags',tag);
            })
        });
    },
    methods:{
        save(){
            var tag = new Object;
            tag.name = this.tagName;

            if(this.tagName != ''){
                this.$store.state.tags.forEach((item) => {
                    if(item.name.toLowerCase() === tag.name.toLowerCase()){
                        this.check = true;
                        return;
                    }
                });
                if(this.check == false){
                    tagCURLController.createTag(tag);
                    setTimeout(function() {window.location.href = "/home?sort=asc"},500);
                }
                else{
                    console.log("Tag ist bereits vorhanden");
                }
            }
            else{
                console.log("Felder müssen gefüllt sein");
            }
        },
        cancel(){
            this.tagName = '',
            setTimeout(function() {window.location.href = "/home?sort=asc"},500);
        },
    },
    components: {
        TheHeader,
        TheFooter,
    },
}
</script>

<style lang="scss" scoped>
.addTag{
    padding: 1rem;
    & .generall-card{
        padding: 5px;
    }
    & .cancel-btn{
        width: 100%;
    }
    & .save-btn{
        width: 100%;
    }
}
</style>