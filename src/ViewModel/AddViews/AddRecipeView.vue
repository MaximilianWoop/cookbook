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
                                                    <div v-for="(ingredientInput, index) in ingredientsArray" :key="`ingredientInput-${index}`" style="width:100%">
                                                        <v-card>
                                                            <v-col class="ingredient-col-center">
                                                                <v-autocomplete
                                                                    v-model="ingredientInput.ingredientvalue"                                            
                                                                    :items="ingredients"   
                                                                    class="add-Recipe-Ingredient-Name"                                         
                                                                    cache-items
                                                                    flat
                                                                    hide-no-data
                                                                    @click="addIngredientTemplate(ingredientInput, ingredientsArray)"
                                                                    hide-details
                                                                    label="Zutaten"
                                                                    solo-inverted/>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-field 
                                                                    label="Menge" 
                                                                    type="number"
                                                                    class="add-Recipe-Ingredient-Portion"/>
                                                            </v-col>
                                                            <v-col align="center">
                                                                <v-select
                                                                    :items="ingredientsUnit"
                                                                    label="Einheit"
                                                                    class="add-Recipe-Ingredient-Unit"
                                                                    dense
                                                                    solo/>
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
            tagCounter: 0,
            // ingredients
            selectIngredient: null,
            loadingIngredients: false,
            ingredients: [],
            searchIngredient: null,
            //tags
            selectTag: null,
            loadingTags: false,
            tags: [],
            searchTag: null,
            //generator
            ingredientsArray: [{test: ""}],
            tagsArray: [{test: ""}],
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
        }
    },
    methods:{
        loadIngredients(){
            var i = 0;
                this.$store.state.ingredients.forEach((ingredient) => {      
                    this.ingredients[i] = ingredient.name;
                    i++;
                }); 
        },
        loadTags(){
            var i = 0;
            this.$store.state.tags.forEach((tag) => {      
                this.tags[i] = tag.name;
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
        // removeIngredientTemplate(index, fieldType){
        //     fieldType.splice(index, 1);
        // }
    },
    props:[],
    components:{},
}
export default vueModel
</script>