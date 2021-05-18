<template>
    <section id="home">
        <TheHeader/>
        <RecipeList :recipes="recipes"/>
        <TheFooter/>
    </section>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import RecipeList from '../components/RecipeList.vue';
import TheFooter from '../components/TheFooter.vue';

export default{
    data(){
        return{
            recipes: [
                {id: 1, name: 'Kartoffelsalat', tags:[{name: 'Backen'}], images:[{src: 'https://picsum.photos/201'}]},
                {id: 2, name: 'Kartoffelsalat mit Fleisch', tags:[{name: 'Kochen'}, {name: 'ApfelkuchenTeig'}, {name: 'Fleisch'}, {name: 'Fisch'},{name: 'Nudelsalat'}], images:[{src: 'https://picsum.photos/202'}]},
                {id: 3, name: 'Kartoffelsalat mit Fleisch und Tomaten', tags:[ {name: 'ApfelkuchenTeig'}, {name: 'Fleisch'}, {name: 'Fisch'},{name: 'Nudelsalat'}], images:[{src: 'https://picsum.photos/203'}]},
                {id: 4, name: 'Kartoffelsalat mit Fleisch und Tomaten oder Äpfeln', tags:[{name: 'ApfelkuchenTeig'},{name: 'ApfelkuchenTeig'},{name: 'ApfelkuchenTeig'},{name: 'ApfelkuchenTeig'},{name: 'ApfelkuchenTeig'}], images:[{src: 'https://picsum.photos/204'}]},
                {id: 5, name: 'Nudelsalat ohne Fleisch', tags:[{name: 'Kochen'}, {name: 'ApfelkuchenTeig'}, {name: 'Fleisch'}], images:[{src: 'https://picsum.photos/205'}]},
            ],
        };
    },
    components: {
        TheHeader,
        RecipeList,
        TheFooter,
    }
};
</script>
