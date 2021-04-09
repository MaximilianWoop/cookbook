<template>
    <div class="container" data-app>
        <v-row>
            <v-col>
                <v-row no-gutters>
                    <v-card outline class="addRecipeCard">
                        <v-card-title class="h2">Neues Rezept</v-card-title>
                        <v-row>
                            <v-expansion-panels accordion>
                                <v-expansion-panel class="expansion-panel-general">
                                    <v-expansion-panel-header>Allgemeines</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-row>
                                            <v-col>
                                                <v-text-field 
                                                    label="Name" 
                                                    v-model="name" 
                                                    counter=50 
                                                    :rules="nameRules" 
                                                    clearable
                                                    outlined/>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-text-field 
                                                    label="Dauer"
                                                    v-model="duration"
                                                    type="number"
                                                    counter=4
                                                    :rules="durationRules"
                                                    clearable
                                                    outlined />
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-textarea 
                                                    label="Beschreibung der Zubereitung"
                                                    v-model="description"
                                                    :rules="descriptionRules"
                                                    clearable
                                                    outlined/>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>                                    
                                </v-expansion-panel>                                
                            </v-expansion-panels>
                            <v-expansion-panels accordion>
                                <v-expansion-panel>
                                    <v-expansion-panel-header>Zutaten</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-autocomplete
                                            v-model="selectIngredient"                                            
                                            :items="ingredients"                                            
                                            cache-items
                                            class="mx-4"
                                            flat
                                            hide-no-data
                                            hide-details
                                            label="Zutaten"
                                            solo-inverted/>
                                    </v-expansion-panel-content>                                    
                                </v-expansion-panel>                                
                            </v-expansion-panels>
                            <v-expansion-panels accordion>
                                <v-expansion-panel>
                                    <v-expansion-panel-header>Tags</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-text-field 
                                            label="Tags"
                                            clearable
                                            outlined />
                                    </v-expansion-panel-content>                                    
                                </v-expansion-panel>                                
                            </v-expansion-panels>
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
                        <v-row>
                            <v-col>
                                <v-btn                
                                    href="/cookbookview"
                                    class="cancelButton"
                                    >Abbrechen                                
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn                
                                    href="/cookbookview"
                                    class="saveButton"
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
        return{
            // general
            name: '',
            duration: '',
            description: '',
            nameRules: [v => v.length <= 50 || 'Maximale Zeichenanzahl ist 50'],
            durationRules: [v => v.length <= 4 || 'Maximale Zeichenanzahl ist 4'],
            descriptionRules: [v => v.length <= 60000 || 'Maximale Zeichenanzahl ist 60000'],
            // ingredients
            selectIngredient: null,
            loadingIngredients: false,
            ingredients: [],
            searchIngredient: null,
        }
    },
    async mounted(){
        if(this.$store.state.ingredients.length === 0)
        {
            console.log("befor");
            await helper.getIngredientsFromURL(this);
            console.log("after");
            var i = 0;
            this.$store.state.ingredients.forEach((ingredient) => {        
                this.ingredients[i] = ingredient.name;
                i++;
            }); 
        }   
        
        //TODO ging bei 2 elementen
    },
    computed:{
        recipes(){
            return this.$store.state.recipes;
        },
        ingredients(){
            return this.$store.state.ingredients;
        }
    },
    methods:{},
    props:[],
    components:{},
}
export default vueModel
</script>