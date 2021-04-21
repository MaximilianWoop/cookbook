<template>
    <div class="setting-view">
        <v-row>
            <v-col>
                <v-row no-gutters>
                    <v-card class="setting-Card" id="setting-Card-Id">
                        <!-- Recipe -->
                        <v-row>
                            <v-col>
                                <v-expansion-panels accordion>
                                    <v-expansion-panel>
                                        <v-expansion-panel-header>Alle Rezepte</v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-data-table
                                                :headers="headersOfRecipe"
                                                :items="recipeDatatableItems"
                                                :items-per-page="25"
                                                class="elevation-1">                                                                        
                                            </v-data-table>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-col>
                        </v-row>
                        <!-- Ingredients -->
                        <v-row>
                            <v-col>
                                <v-expansion-panels accordion>
                                    <v-expansion-panel>
                                        <v-expansion-panel-header>Alle Zutaten</v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-data-table
                                                :headers="headersOfIngredient"
                                                :items="ingredientDatatableItems"
                                                :items-per-page="25"
                                                class="elevation-1">                                                                        
                                            </v-data-table>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-col>
                        </v-row>
                        <!-- Tags -->
                        <v-row>
                            <v-col>
                                <v-expansion-panels accordion>
                                    <v-expansion-panel>
                                        <v-expansion-panel-header>Alle Tags</v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-data-table
                                                :headers="headersOfTags"
                                                :items="tagDatatableItems"
                                                :items-per-page="25"
                                                class="elevation-1">                                                                        
                                            </v-data-table>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import helper from '@/Helper/dataController'
export default {
  data(){
        return{
            //Datatable
            headersOfRecipe: [
                { text: 'Index', value: 'recipeID' },
                { text: 'Name', value: 'name' },
                { text: 'Beschreibung', value: 'description' },
                { text: 'Dauer', value: 'duration' },
                { text: 'Temperatur', value: 'temperature' },
            ],
            headersOfIngredient: [
                { text: 'Index', value: 'ingredientID' },
                { text: 'Name', value: 'name' },
                { text: 'Einheit', value: 'measurement' },
            ],
            headersOfTags: [
                { text: 'Index', value: 'tagID' },
                { text: 'Name', value: 'name' },
            ],
        }
    },
    async mounted(){
        document.getElementById("loadingCircle").style.display = "inline";
        document.getElementById("setting-Card-Id").style.display = "none";
        if(this.$store.state.recipes.length === 0)
        {
            await helper.getRecipesFromURL(this);
        }
        if(this.$store.state.ingredients.length === 0)
        {
            await helper.getIngredientsFromURL(this);
        }
        if(this.$store.state.tags.length === 0)
        {
            await helper.getTagsFromURL(this);
        }
        document.getElementById("loadingCircle").style.display = "none";
        document.getElementById("setting-Card-Id").style.display = "inline";
    },
    computed:{
        recipeDatatableItems(){
            return this.$store.state.recipes;
        },
        ingredientDatatableItems(){
            return this.$store.state.ingredients;
        },
        tagDatatableItems(){
            return this.$store.state.tags;
        }
    },
    methods:{},
    props:[],
    components:{},
}
</script>
