//Hauptfunktion
async function curlFunction(url, method, body){
    const settings = {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    try{
        const response = await fetch(url, settings);
        if(response.status == 200){
            return true;
        }    
        else{
            return false;
        }   
    }
    catch(exception){
        console.log(exception);
        return -1;
    }
}
//CRUD Funktionen für Recipe
async function createRecipe(recipe){
    const url = "https://cookbook.ryotecx.de/api.php/recipe";
    const method = "POST";
    const body = JSON.stringify(recipe);
    return curlFunction(url,method,body);
}
async function updateRecipe(recipe){
    const url = "https://cookbook.ryotecx.de/api.php/recipe";
    const method = "UPDATE";
    const body = JSON.stringify(recipe);;
    return curlFunction(url,method,body);
}
async function deleteRecipe(id){
    const url = "https://cookbook.ryotecx.de/api.php/recipe?recipeID=" + id;
    const method = "DELETE";
    const body = "";
    return curlFunction(url,method,body);
}

//Funktionen Exportieren
var curlRecipeController = {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    curlFunction,
}
export default curlRecipeController;


//#region Alt
// async function createRecipe(recipe){
//     var request = new XMLHttpRequest();
//     request.open('POST','https://cookbook.ryotecx.de/api.php/recipe');
//     request.setRequestHeader("Content-Type", "application/json");
//     var recipeJson = JSON.stringify(recipe);
//     request.send(recipeJson); 
// }
// async function updateRecipe(recipe){
//     console.log("update");
//     console.log(recipe);
// }
// async function deleteRecipe(id){
//     var request = new XMLHttpRequest();
//     request.open('DELETE','https://cookbook.ryotecx.de/api.php/recipe',true);
//     request.setRequestHeader("Content-Type", "application/json");
//     var recipeJson = "{\"recipeID\":" + id + "}";
//     request.send(recipeJson); 
// }
//#endregion