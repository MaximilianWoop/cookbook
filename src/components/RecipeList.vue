<template>
    <div class="cookbook-list">
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
        <v-list three-line>
            <template v-for="item in filtered">
                <v-list-item 
                    :key="item.name"
                    :href="'/detailRecipe/'+item.recipeID">
                    <v-list-item-content>
                        <v-card outlined> 
                            <v-row class="image-row">
                                <v-col class="image-col" v-if="item.images.length != 0">
                                    <v-img class="image" :src="`https://cookbook.ryotecx.de/` + item.images[0].thumbnailPath">
                                    <!-- <v-img class="image" :src="`${process.env.VUE_APP_BACKEND_IMAGE_URL}` + item.images[0].thumbnailPath"> -->
                                        <v-row>
                                            <v-col>
                                                <div class="name">{{item.name}}</div>  
                                            </v-col>
                                            <v-col>
                                                <v-btn icon @click="addFavorite" class="heart__button">
                                                    <v-icon class="icon">{{icon}}</v-icon>
                                                </v-btn>  
                                            </v-col>
                                        </v-row>                               
                                    </v-img>                                     
                                </v-col>
                                <v-col class="image-col" v-else>
                                    <div>
                                        <div class="notImageFound">
                                            <v-row style="padding: 0; margin: 0;">
                                                <v-col style="padding: 0; margin: 0;">
                                                    <v-btn icon @click="addFavorite" class="heart__button">
                                                        <v-icon class="icon">{{icon}}</v-icon>
                                                    </v-btn> 
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <div class="noImageFoundText">No Image Found</div>
                                                </v-col>
                                            </v-row>                                            
                                        </div>
                                    </div>
                                </v-col>
                                <v-col class="sideContainer-col">
                                    <v-row>
                                        <v-col>
                                            <a class="item-duration">{{item.duration}}</a>
                                        </v-col>                                        
                                    </v-row>
                                    <v-row>
                                        <v-col class="item-description">
                                            <Description :description="item.description"/>
                                        </v-col>                                        
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <TagList :tags="item.tags"/>
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
</template>

<script>

import TagList from '../components/TagList.vue';
import Description from '../components/Description.vue';

export default{
    data(){
        return{
            icon: `mdi-heart-outline`,
            name: '',
            tag: '',
            duration: '',
        };
    },
    // Props als Object dem ein datentype mitgegeben wird (Zusätzliche Werte wie default-Wert oder required-Wert möglich)
    props: {
        recipes: {
            type: Array,
            required: true,
        },
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
        addFavorite(){
            if(this.icon == `mdi-heart`){
                this.icon = `mdi-heart-outline`;
            }
            else{
                this.icon = `mdi-heart`;
            }            
        },
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
    components: {
        TagList,
        Description,
    }
}
</script>

<style lang="scss" scoped>
.image-row{
    margin: 0;
    .image-col{
        max-width: 310px;
        .notImageFound{
            width: 285px;
            height: 285px;
            background: black;
            text-align: center;            
            & .heart__button{
                height: 30px;
                width: 30px;
                // background-color: rgb(255, 255, 255);
                opacity: 0.85;
                float: right;
                color:rgb(230, 0, 0);
            }
            & .noImageFoundText{
                color: white;
                font-size: 25px;
                font-weight: bolder;
                margin-top: 70px;
            }
        }    
        .image{
            height: 286px;
            width: 286px;
            .row{
                padding: 0;
                margin: 0;
                .col{
                    padding: 0;
                    margin: 0;
                    .heart__button{
                        height: 30px;
                        width: 30px;
                        // background-color: rgb(255, 255, 255);
                        opacity: 0.85;
                        float: right;
                        color:rgb(230, 0, 0);
                    }
                    .name{
                        background-color: rgb(255, 255, 255);
                        opacity: 0.85;
                        padding: 5px;    
                        font-size: 1rem;
                        font-weight: bold;
                        line-height: 20px;
                        border-bottom: 2px solid rgba(2, 76, 140, 1);
                        border-right: 2px solid rgba(2, 76, 140, 1);
                        border-bottom-right-radius: 15px;
                    }
                }
            }    
        }
    }
}



.sideContainer-col{
    padding: 17px;
    display: none;
    & .item-duration{
        float: right; 
        font-size:1rem;
    }
    & .item-description{
        height: 150px;
    }
}
@media screen and (min-width: 430px) {
    .sideContainer-col{
        display: inline
    }
}
</style>
