<template>
    <div data-app >
        <!-- Header -->
        <v-row>
            <v-col>
                <v-card>
                    <v-toolbar style="background: rgba(2, 76, 140, 1); color: white">
                        <v-app-bar-nav-icon @click="drawer = true" large style="color: white"/>
                        <strong class="headerTitle">Kochbuch</strong>
                        <v-spacer></v-spacer>
                        <!-- <AddItemMenu/> -->
                    </v-toolbar>
                </v-card>
            </v-col>
        </v-row>
        <!-- Sidebar -->
        <v-navigation-drawer v-model="drawer" absolute temporary style="background: rgba(2, 76, 140, 1);">
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
                        <router-link style="color:white;text-decoration: none;font-size:15px" :to="item.route">{{item.title}}</router-link>
                        <!-- <v-list-item-title id="item.title">{{item.title}}</v-list-item-title> -->
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
// import AddItemMenu from '../components/AddItemMenu.vue';
export default {
    data(){
        return{
            drawer: false,
            mini: false,
            tagDialog: false,
            MenuPoints: [
                {title: 'Übersicht', icon: 'mdi-clipboard-list-outline',route: '/home'},
                {title: 'Mein Account', icon: 'mdi-account',route: '/user'},   
                {title: 'Rezept hinzufügen', icon: 'mdi-notebook-edit-outline', route: '/addRecipe'},
                {title: 'Zutat hinzufügen', icon: 'mdi-bottle-tonic-plus-outline',route: '/addIngredient'}, 
                {title: 'Tag hinzufügen', icon: 'mdi-code-tags',route: '/addTag'}, 
                {title: 'Einstellungen', icon: 'mdi-cog',route: '/settings'},   
            ],
        }
    },
    async mounted(){},
    computed:{},
    methods: {},
    props:[],
    components: {
        // AddItemMenu,
    }
}
</script>

<style lang="scss" scoped>
.headerTitle{
    font-size: 1.3rem;
}
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
            color: white;       
        }   
    }
}
.v-list-item__content{
    color: white;
}

.v-list-item__icon{
    margin-right: 5px;
    & .v-icon{
        color: white;
    }
}
.v-navigation-drawer {
    max-width: 200px;
}    
</style>