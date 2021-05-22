<template>
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
</template>

<script>
export default {
     data(){
        return{
            addItems: [ 
                {title: 'Rezept'},
                {title: 'Zutat'},
                {title: 'Tag'},
            ],
        }
     },
}
</script>
