//CRUD functions for recipe
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
//CRUD functions for ingredient
async function createIngredient(Ingredient){
    var request = new XMLHttpRequest();
    request.open('POST','http://cookbook.ryotecx.de/api.php/ingredient');
    request.setRequestHeader("Content-Type", "application/json");
    var ingredientJson = JSON.stringify(Ingredient);
    console.log(ingredientJson);
    request.send(ingredientJson);
}
async function updateIngredient(Ingredient){
    console.log("update");
    console.log(Ingredient);
}
async function deleteIngredient(id){
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
async function getIngredientsFromURL(ref){
    return await fetch('http://cookbook.ryotecx.de/api.php/ingredient')
        .then(response => response.json())
        .then(data => data.forEach((ingredient) => {  
            ref.$store.dispatch('setIngredient',ingredient);
        }));
}
async function getTagsFromURL(ref){
    return await fetch('http://cookbook.ryotecx.de/api.php/tag')
        .then(response => response.json())
        .then(data => data.forEach((tag) => {  
            ref.$store.dispatch('setTag',tag);
        }));
}

//export data
var helper = {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipesFromURL,
    getIngredientsFromURL,
    getTagsFromURL,
    createIngredient,
    updateIngredient,
    deleteIngredient,
}
export default helper;