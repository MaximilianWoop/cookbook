<template>
    <div>
        <TheHeader/>
        <div class="addIngredient">
            <v-row>
                <v-col>
                    <h2>Zutat Hinzufügen</h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col>                    
                    <v-card class="generall-card">
                        <v-row>
                            <v-col>
                                <v-text-field 
                                    placeholder="Name" 
                                    label="Name der Zutat"
                                    v-model="ingredientName"/>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field 
                                    placeholder="Einheit" 
                                    label="Einheit der Zutat"
                                    v-model="ingredientMeasurement"/>
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

import ingredientCURLController from '../Helper/Curl/IngredientController.js'

export default {
    data(){
        return{
            ingredientName: '',
            ingredientMeasurement: '',
        }
    },
    methods:{
        save(){
            var ingredient = new Object;
            ingredient.name = this.ingredientName;
            ingredient.measurement = this.ingredientMeasurement;

            ingredientCURLController.createIngredient(ingredient);
            setTimeout(function() {window.location.href = "/home?sort=asc"},500);
        },
        cancel(){
            this.ingredientName = '',
            this.ingredientMeasurement = '',
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
.addIngredient{
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