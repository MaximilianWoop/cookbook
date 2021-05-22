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
//CRUD Funktionen für Ingredient
async function createIngredient(ingredient){
    const url = "https://cookbook.ryotecx.de/api.php/ingredient";
    const method = "POST";
    const body = JSON.stringify(ingredient);
    return curlFunction(url,method,body);
}
async function updateIngredient(ingredient){
    const url = "https://cookbook.ryotecx.de/api.php/ingredient";
    const method = "UPDATE";
    const body = JSON.stringify(ingredient);;
    return curlFunction(url,method,body);
}
async function deleteIngredient(id){
    const url = "https://cookbook.ryotecx.de/api.php/ingredient?ingredientID=" + id;
    const method = "DELETE";
    const body = "";
    return curlFunction(url,method,body);
}

//Funktionen Exportieren
var curlIngredientController = {
    createIngredient,
    updateIngredient,
    deleteIngredient,
    curlFunction,
}
export default curlIngredientController;