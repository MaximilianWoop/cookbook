<template>
    <div class="detail-ingredient-view">
        <v-row>
            <v-col>
                <v-row no-gutters>
                    <v-card outline class="ingredientDetailCard">
                        <div id="test" style="display:inline">hallo</div>
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
        return{}
    },
    async mounted(){
        await helper.getRecipesFromURL(this);
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