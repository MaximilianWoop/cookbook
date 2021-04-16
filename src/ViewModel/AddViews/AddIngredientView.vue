<template>
    <div class="container" data-app>
        <v-row>
            <v-col>
                <v-row no gutters>
                    <v-card outlined class="addIngredientCard">
                        <v-card-title class="h2">Neue Zutat</v-card-title>
                        <v-row>
                            <v-expansion-panels accordion>
                                <!-- General -->
                                <v-expansion-panel class="expansion-panel-general">
                                    <v-expansion-panel-header>Allgemeines</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <!-- Name -->
                                        <v-row>
                                            <v-col>
                                                <v-text-field 
                                                    label="Name" 
                                                    id="add-Ingredient-IngredientName"
                                                    v-model="name" 
                                                    counter=50 
                                                    :rules="nameRules" 
                                                    clearable
                                                    outlined/>
                                            </v-col>
                                        </v-row>
                                        <!-- Measurement -->
                                        <v-row>
                                            <v-col>
                                                <v-text-field 
                                                    label="Einheit"
                                                    id="add-Ingredient-IngredientMeasurement"
                                                    v-model="measurement"
                                                    counter=50
                                                    :rules="measurementRules"
                                                    clearable
                                                    outlined />
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                            <!-- Images -->
                            <v-expansion-panels accordion>
                                <v-expansion-panel>
                                    <v-expansion-panel-header>Bilder</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-text-field 
                                            label="Bilder"
                                            clearable
                                            outlined />
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

var vueModel = {
    data(){
        return{}
    },
    async mounted(){
        await helper.getRecipesFromURL(this);
    },
    computed:{
        recipes(){
            return this.$store.state.recipes;
        }
    },
    methods:{
        getIngredientData(){
            console.log("save");
        }
    },
    props:[],
    components:{},
}
export default vueModel
 </script>