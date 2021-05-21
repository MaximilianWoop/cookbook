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
//CRUD Funktionen für Tag
async function createTag(tag){
    const url = "https://cookbook.ryotecx.de/api.php/tag";
    const method = "POST";
    const body = JSON.stringify(tag);
    return curlFunction(url,method,body);
}
async function updateTag(tag){
    const url = "https://cookbook.ryotecx.de/api.php/tag";
    const method = "UPDATE";
    const body = JSON.stringify(tag);;
    return curlFunction(url,method,body);
}
async function deleteTag(id){
    const url = "https://cookbook.ryotecx.de/api.php/tag?tagID=" + id;
    const method = "DELETE";
    const body = "";
    return curlFunction(url,method,body);
}

//Funktionen Exportieren
var curlTagController = {
    createTag,
    updateTag,
    deleteTag,
    curlFunction,
}
export default curlTagController;