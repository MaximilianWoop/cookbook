<template>
    <div>
        <v-list disabled>
            <v-list-item-group
                color="primary">
                <v-list-item v-for="(item, i) in ingredients" :key="i">
                    <v-list-item-content>
                        <v-row style="font-size: 15px;">
                            <v-col cols="7" class="ingredientName">
                                <div>{{item.name}}</div>
                            </v-col>
                            <v-col cols="2">
                                <div>{{item.portion}}</div>
                            </v-col>
                            <v-col cols="3">
                                <div>{{item.measurement}}</div>
                            </v-col>                            
                        </v-row>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>
export default {
    props: {
        ingredients: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
.v-list{
    & .v-item-group{
        & .v-list-item{
            padding: 0px;
            & .ingredientName{
                text-align: left;
            }
        }
    }
}
</style>