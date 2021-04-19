<template>
    <div>
        <v-row>
            <v-col>
                <v-row no-gutters>
                    <v-card outline class="cookbookCard">
                        <div class="cookbook-Header">
                            <v-row no-gutters>
                                <v-col>
                                    <v-text-field label="Name"/>
                                </v-col>
                                <v-col>
                                    <v-text-field label="Tags"/>
                                </v-col>
                                <v-col>
                                    <v-text-field label="Dauer"/>
                                </v-col>
                            </v-row>
                        </div> 
                        <div class="cookbook-list">
                            <v-list three-line>
                                <template v-for="item in recipes">
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

import helper from '@/Helper/dataController'

var vueModel = {
    data(){
        return{

        }
    },
    async mounted(){
        if(this.$store.state.recipes.length === 0)
        {
            await helper.getRecipesFromURL(this);
        }                 
    },
    computed:{
        recipes(){
            return this.$store.state.recipes;
        }
    },
    methods:{},
    props:[],
    components:{},
}
export default vueModel
</script>