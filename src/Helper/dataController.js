//CRUD functions
async function createRecipe(recipe){
    var request = new XMLHttpRequest();
    request.open('POST','http://cookbook.ryotecx.de/api.php/recipe');
    request.setRequestHeader("Content-Type", "application/json");
    var recipeJson = JSON.stringify(recipe);
    console.log(recipeJson);
    request.send(recipeJson);    
}
async function updateRecipe(recipe){
    console.log("update");
    console.log(recipe);
}
async function deleteRecipe(id){
    console.log("delete");
    console.log(id);
}

//Get data 
async function getRecipesFromURL(ref){
    return await fetch('http://cookbook.ryotecx.de/api.php/recipe')
        .then(response => response.json())
        .then(data => data.forEach((recipe) => {  
            ref.$store.dispatch('setRecipe',recipe);
        }));
}

// const axios = require('axios').default;
// async function getRecipesFromURL(ref){
//     axios.get('http://cookbook.ryotecx.de/api.php/recipe')
//     .then(response => {
//         var data = JSON.stringify(response.data);
//         data = JSON.parse(data);
//         data.forEach((recipe) => {       
//             ref.$store.dispatch('setRecipe',recipe);
//         }); 
//     })
//     .catch(err => {
//         // Handle Error Here
//         console.error(err);
//     });
// } 

// async function getRecipesFromURL(ref){
//     var request = new XMLHttpRequest();
//     request.open('GET','http://cookbook.ryotecx.de/api.php/recipe',true);
//     request.onload = async function(){
//         var data = JSON.parse(this.response);
//         data.forEach((recipe) => {            
//             ref.$store.dispatch('setRecipe',recipe);
//         });  
//     }
//     request.send();
// } 

const axios = require('axios').default;
async function getIngredientsFromURL(ref){
    axios.get('http://cookbook.ryotecx.de/api.php/ingredient')
    .then(response => {
        var data = JSON.stringify(response.data);
        data = JSON.parse(data);
        data.forEach((ingredient) => {       
            ref.$store.dispatch('setIngredient',ingredient);
        }); 
    })
    .catch(err => {
        // Handle Error Here
        console.error(err);
    });
}

async function getTagsFromURL(ref){
    axios.get('http://cookbook.ryotecx.de/api.php/tag')
    .then(response => {
        var data = JSON.stringify(response.data);
        data = JSON.parse(data);
        data.forEach((tag) => {       
            ref.$store.dispatch('setTag',tag);
        }); 
    })
    .catch(err => {
        // Handle Error Here
        console.error(err);
    });
}



//export data
var helper = {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipesFromURL,
    getIngredientsFromURL,
    getTagsFromURL,
}
export default helper;