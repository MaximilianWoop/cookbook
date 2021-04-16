function getRecipeFromURL(store){
    console.log(store.state.recipes);
    const currentURL = new URL(document.location.href);
    var id = currentURL.searchParams.get("recipeId");
    var recipe = store.getters.getSelectedRecipe(id);
    return recipe;
}

var urlHelper = {
    getRecipeFromURL,
}
export default urlHelper