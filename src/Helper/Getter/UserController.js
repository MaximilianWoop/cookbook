async function getLogin(user){
    const url = "https://cookbook.ryotecx.de/api.php/login"
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
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

//Funktionen Exportieren
var getUserController = {
    getLogin,
}
export default getUserController;