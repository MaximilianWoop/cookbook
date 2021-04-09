//CRUD functions
async function createRecipe(recipe){
    console.log("create");
    console.log(recipe);
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
    var request = new XMLHttpRequest();
    request.open('GET','http://cookbook.ryotecx.de/api.php/recipe',true);
    request.onload = async function(){
        var data = JSON.parse(this.response);
        data.forEach((recipe) => {            
            ref.$store.dispatch('setRecipe',recipe);
        });  
    }
    request.send();
} 

async function getIngredientsFromURL(ref){
    var request = new XMLHttpRequest();
    request.open('GET','http://cookbook.ryotecx.de/api.php/ingredient',true);
    request.onload = function(){
        var data = JSON.parse(this.response);
        data.forEach((ingredient) => {            
            ref.$store.dispatch('setIngredient',ingredient);
        }); 
        console.log(ref.$store.state.ingredients.length);          
    };
    request.send();
}

//export data
var helper = {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipesFromURL,
    getIngredientsFromURL,
}
export default helper;