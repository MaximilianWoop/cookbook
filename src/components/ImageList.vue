<template>
    <div>
        <div v-if="images.length != 0">
            <v-list-item v-for="item in images" :key="item.name">
                <v-list-item-content>
                    <v-card outlined>                           
                        <v-img class="image" src="https://picsum.photos/202">
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
                        </v-img>                                                        -->
                    </v-card>
                </v-list-item-content>
            </v-list-item>
        </div>
        <div v-else>
            <div class="notImageFound">
                <div class="noImageFoundText">No Image Found</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        images: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
.notImageFound{
    width: 260px;
    height: 260px;
    background: black;
    text-align: center;
    padding-top: 110px;
    & .noImageFoundText{
        color: white;
        font-size: 25px;
        font-weight: bolder;
    }
}
</style>