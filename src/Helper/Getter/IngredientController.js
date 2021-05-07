//Bekommt alle Ingredients vom Backend
async function getIngredientsFromURL(){
    return await fetch('https://cookbook.ryotecx.de/api.php/ingredient')
        .then(response => {
            response.json();
        })
        .then(data => data.forEach((ingredient) => {            
            console.log(ingredient);
        })
    );
}
//Bekommt ein Ingredient per ID vom Backend
async function getIngredientWithIdFromURL(id){
    return await fetch('https://cookbook.ryotecx.de/api.php/ingredient?ingredientID=' + id)
        .then(response => {
            response.json();
        })
        .then(data => data.forEach((ingredient) => {  
            console.log(ingredient);
        }));
}