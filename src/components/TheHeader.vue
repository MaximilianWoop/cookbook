<template>
    <div class="nav-bar" data-app>
        <!-- Header -->
        <v-row>
            <v-col>
                <v-card>
                    <v-toolbar>
                        <v-app-bar-nav-icon @click="drawer = true" large/>
                        <v-toolbar-title class="h1">Kochbuch</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-menu
                            transition="slide-y-transition"
                            bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    v-bind="attrs"
                                    v-on="on">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item
                                v-for="item in addItems"
                                :key="item.title"
                                link
                                :to="item.route">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-toolbar>
                </v-card>
            </v-col>
        </v-row>
        <!-- Sidebar -->
        <v-navigation-drawer v-model="drawer" absolute temporary dark>
            <v-list class="py-0" nav dense>
                <!-- User informations -->
                <v-list-item two-line :class="mini && 'px-0'">
                    <v-list-item-content>
                        <!-- User image -->
                        <v-row>
                            <v-col>
                                <v-img src="https://randomuser.me/api/portraits/women/85.jpg"/>
                            </v-col>
                        </v-row>
                        <!-- Username -->
                        <v-row class="nav-drawer-content-row">
                            <v-col class="nav-drawer-content-row-col">
                                <v-list-item-title class="nav-drawer-content-username">Username</v-list-item-title>
                            </v-col>
                        </v-row>
                    </v-list-item-content>
                </v-list-item>
                <!-- Menu-Points -->
                <v-list-item :to="item.route" v-for="item in MenuPoints" :key="item.title" link :id="item.title">
                    <v-list-item-icon>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title id="item.title">{{item.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            drawer: false,
            mini: false,
            tagDialog: false,
            MenuPoints: [
                {title: 'Übersicht', icon: 'mdi-clipboard-list-outline', route: '/cookbookview'},
                {title: 'Mein Account', icon: 'mdi-account', route: ''},   
                {title: 'Rezept hinzufügen', icon: 'mdi-notebook-edit-outline', route: '/AddRecipeView'},
                {title: 'Zutat hinzufügen', icon: 'mdi-bottle-tonic-plus-outline', route: '/AddIngredientView'}, 
                {title: 'Einstellungen', icon: 'mdi-cog', route: '/SettingView'},   
            ],
            addItems: [ 
                {title: 'Rezept', route: '/AddRecipeView'},
                {title: 'Zutat', route: '/AddIngredientView'},
                {title: 'Tag', route: '/AddTagView'}
            ]
        }
    },
    async mounted(){},
    computed:{},
    methods: {},
    props:[],
    components:{},
}
</script>

<style lang="scss" scoped>
.row + .row{
    margin-top: 0;
}
.nav-drawer-content-row{
    margin-top: 0px;
    margin-bottom: 10px;
    .nav-drawer-content-row-col{
        padding-top:0;
        & .v-list-item__title{
            font-size: 1rem;
            font-weight: bold;
        }    
    }
}

.v-list-item__icon{
    margin-right: 5px;
}
.v-navigation-drawer {
    max-width: 200px;
}    
</style>