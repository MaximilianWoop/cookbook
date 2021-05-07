//Bekommt alle Tags vom Backend
async function getTagsFromURL(){
    return await fetch('https://cookbook.ryotecx.de/api.php/tag')
        .then(response => {
            response.json();
        })
        .then(data => data.forEach((tag) => {            
            console.log(tag);
        })
    );
}
//Bekommt ein Tag per ID vom Backend
async function getTagWithIdFromURL(id){
    return await fetch('https://cookbook.ryotecx.de/api.php/tag?tagID=' + id)
        .then(response => {
            response.json();
        })
        .then(data => data.forEach((tag) => {  
            console.log(tag);
        }));
}