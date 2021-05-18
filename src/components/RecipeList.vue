<template>
    <div class="cookbook-list">
        <v-list three-line>
            <template v-for="item in recipes">
                <v-list-item 
                    :key="item.name">
                    <v-list-item-content>
                        <v-card outlined>                           
                            <v-img class="image" v-bind:src="item.images[0].src">
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
                            <div class="tag__container">
                                <v-row>
                                    <v-col v-if="item.tags[0] != null">
                                        <a class="tag" v-if="item.tags != null">{{item.tags[0].name}}</a>
                                        <a class="tag" v-else></a>
                                    </v-col>
                                    <v-col v-if="item.tags[1] != null">
                                        <a class="tag" v-if="item.tags.length > 1">{{item.tags[1].name}}</a>
                                        <a class="tag" v-else></a>
                                    </v-col>
                                    <v-col v-if="item.tags[2] != null">
                                        <a class="tag" v-if="item.tags.length > 2">{{item.tags[2].name}}</a>
                                        <a class="tag" v-else></a>
                                    </v-col>
                                    <v-col v-if="item.tags[3] != null">
                                        <a class="tag" v-if="item.tags.length > 3">{{item.tags[3].name}}</a>
                                        <a class="tag" v-else></a>
                                    </v-col>
                                    <v-col v-if="item.tags[4] != null">
                                        <a class="tag" v-if="item.tags.length > 4">{{item.tags[4].name}}</a>
                                        <a class="tag" v-else></a>
                                    </v-col> 
                                </v-row>
                            </div>                                                       
                        </v-card>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list> 
    </div>                     
</template>

<script>
export default{
    data(){
        return{
            icon: `mdi-heart-outline`,
        };
    },
    // Props als Object dem ein datentype mitgegeben wird (Zusätzliche Werte wie default-Wert oder required-Wert möglich)
    props: {
        recipes: {
            type: Array,
            required: true,
        },
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
    }
}
</script>

<style lang="scss" scoped>
.image{
    .row{
        padding: 0;
        margin: 0;
        .col{
            padding: 0;
            margin: 0;
            .heart__button{
                height: 30px;
                width: 30px;
                background-color: rgb(247, 247, 247);
                opacity: 0.85;
                float: right;
                color:rgb(230, 0, 0);
            }
            .name{
                background-color: rgb(247, 247, 247);
                opacity: 0.85;
                padding: 5px;    
                font-size: 1rem;
                font-weight: bold;
                line-height: 20px;
            }
        }
    }    
}
.tag__container{
    .row{
        margin: 0;
        .col{
            padding: 1px;   
            flex-grow: 0;    
            .tag{
                border: 1px solid rgba(2, 76, 140, 1);
                border-radius: 15px;
                background: rgba(2, 76, 140, 1); 
                color: whitesmoke;
                display: inline-block;
                font-size: 14px;
                line-height: 20px;
                padding: 5px 8px;
                text-decoration: none;
                -webkit-font-smoothing: antialiased;
            } 
        }
    }
}
</style>
