//Bekommt alle Recipes vom Backend
async function getRecipesFromURL(ref){
    return await fetch('https://cookbook.ryotecx.de/api.php/recipe')
        .then((response) => response.json())
        .then(data => {
           ref = data;
        });
}
//Bekommt ein Recipe per ID vom Backend
async function getRecipeWithIdFromURL(id){
    return await fetch('https://cookbook.ryotecx.de/api.php/recipe?recipeID=' + id)
        .then(response => {
            response.json();
        })
        .then(data => data.forEach((recipe) => {  
            console.log(recipe);
        }));
}

//Funktionen Exportieren
var getRecipeController = {
    getRecipesFromURL,
    getRecipeWithIdFromURL,
}
export default getRecipeController;