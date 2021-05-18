<template>
    <div class="cookbook-view">
        <v-row>
            <v-col>
                <v-row no-gutters>
                    <v-card outline class="cookbookCard">
                        <div class="cookbook-Header">
                            <v-row no-gutters>
                                <v-col>
                                    <v-text-field id="cookbook-filter-by-name" label="Name" @input="filterByName" v-model="name"/>
                                </v-col>
                                <v-col>
                                    <v-text-field id="cookbook-filter-by-tag" label="Tags" @input="filterByTag" v-model="tag"/>
                                </v-col>
                                <v-col>
                                    <v-text-field id="cookbook-filter-by-duration" label="Dauer" @input="filterByDuration" v-model="duration"/>
                                </v-col>
                            </v-row>
                        </div> 
                        <div class="cookbook-list">
                            <v-list three-line>
                                <template v-for="item in filtered">
                                    <v-list-item 
                                        :key="item.name"
                                        :href="'/DetailRecipeView?recipeId='+item.recipeID">
                                        <v-list-item-content>
                                            <v-card outlined>
                                                <v-row>    
                                                    <v-col class="image" v-if="item.images[0] != null">
                                                        <v-img v-bind:src="'data:image/jpeg;base64,'+ item.images[0].image"/>
                                                    </v-col>                                          
                                                    <v-col class="parent">
                                                        <v-row>
                                                            <v-col>
                                                                <a class="h3 left" v-html="item.name"/> 
                                                            </v-col>   
                                                            <v-col>
                                                                <p class="right">{{item.duration}}</p>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="bottom"> 
                                                            <v-col v-if="item.tags[0] != null">
                                                                <a class="left tag" v-if="item.tags != null">{{item.tags[0].name}}</a>
                                                                <a class="left tag" v-else></a>
                                                            </v-col>
                                                            <v-col v-if="item.tags[1] != null">
                                                                <a class="left  tag" v-if="item.tags.length > 1">{{item.tags[1].name}}</a>
                                                                <a class="left" v-else></a>
                                                            </v-col>
                                                            <v-col v-if="item.tags[2] != null">
                                                                <a class="left  tag" v-if="item.tags.length > 2">{{item.tags[2].name}}</a>
                                                                <a class="left" v-else></a>
                                                            </v-col>
                                                            <v-col v-if="item.tags[3] != null">
                                                                <a class="left  tag" v-if="item.tags.length > 3">{{item.tags[3].name}}</a>
                                                                <a class="left" v-else></a>
                                                            </v-col>
                                                            <v-col v-if="item.tags[4] != null">
                                                                <a class="left  tag" v-if="item.tags.length > 4">{{item.tags[4].name}}</a>
                                                                <a class="left" v-else></a>
                                                            </v-col> 
                                                        </v-row>  
                                                    </v-col>                                                                                                                                        
                                                </v-row>                                      
                                            </v-card>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-list> 
                        </div>                                     
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script defer>

import RecipeController from '@/Helper/Getter/RecipeController'
import IngerdientController from '@/Helper/Getter/IngerdientController'
import TagController from '@/Helper/Getter/TagController'

var vueModel = {
    data(){
        return{
            name: '',
            tag: '',
            duration: '',
        }
    },
    async mounted(){
        if(this.$store.state.recipes.length === 0)
        {
            document.getElementById("loadingCircle").style.display = "inline";
            await RecipeController.getRecipesFromURL(this);
            document.getElementById("loadingCircle").style.display = "none";
        }                 
    },
    computed:{
        filtered(){
            if(this.name != ""){
                return this.filterByName();
            }
            if(this.tag != ""){
                return this.filterByTag();
            }
            if(this.duration != ""){
                return this.filterByDuration();
            }
            return this.$store.state.recipes
        }
    },
    methods:{
        filterByName(){
            return this.$store.state.recipes.filter(recipe => !recipe.name.toLowerCase().indexOf(this.name.toLowerCase()));
        },
        filterByTag(){
            return this.$store.state.recipes.filter(recipe => recipe.tags.some(tag => tag.name.toLowerCase().includes(this.tag.toLowerCase())));            
        },
        filterByDuration(){
            return this.$store.state.recipes.filter(recipe => !recipe.duration.indexOf(this.duration));
        }
    },
    props:[],
    components:{},
}
export default vueModel
</script>