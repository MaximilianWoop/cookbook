<template>
    <div class="Arial">
        <!-- Header -->
        <v-row>
            <v-col>
                <v-card>
                    <v-toolbar>
                        <v-app-bar-nav-icon @click="drawer = true" large/>
                        <v-toolbar-title class="h1">Kochbuch</v-toolbar-title>
                        <v-spacer></v-spacer>
                         <v-btn icon>
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
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
            MenuPoints: [
                {title: 'Übersicht', icon: 'mdi-view-dashboard', route: '/cookbookview'},
                {title: 'Mein Account', icon: 'mdi-account', route: ''},   
                {title: 'Rezept hinzufügen', icon: 'mdi-account', route: '/AddRecipeView'},
                {title: 'Zutat hinzufügen', icon: 'mdi-account', route: '/AddIngredientView'}, 
                {title: 'Einstellungen', icon: 'mdi-marker', route: ''},             
            ]
        }
    }
}
</script>