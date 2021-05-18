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
//CRUD Funktionen für User
async function createUser(user){
    const url = "https://cookbook.ryotecx.de/api.php/user";
    const method = "POST";
    const body = JSON.stringify(user);
    return curlFunction(url,method,body);
}
async function updateUser(user){
    const url = "https://cookbook.ryotecx.de/api.php/user";
    const method = "UPDATE";
    const body = JSON.stringify(user);;
    return curlFunction(url,method,body);
}
async function deleteUser(id){
    const url = "https://cookbook.ryotecx.de/api.php/user?userID=" + id;
    const method = "DELETE";
    const body = "";
    return curlFunction(url,method,body);
}


//Funktionen Exportieren
var curlUserController = {
    createUser,
    updateUser,
    deleteUser,
    curlFunction,
}
export default curlUserController;