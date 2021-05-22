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
        }
    },
    methods:{
        save(){
            var tag = new Object;
            tag.name = this.tagName;

            tagCURLController.createTag(tag);
            setTimeout(function() {window.location.href = "/home?sort=asc"},500);
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