function getNameOfArrayObjects(data){
    var name = [];
    var counter = 0;
    data.forEach(item =>{
        if(item.value != null && item.value != "" && item.value != "[object Object]"){
            var check = false;
            name.forEach(temp => {
                if(temp == item.value){
                    check = true;
                    return;
                }
            })
            if(check != true){
                name[counter] = item.value;
                counter++;
            }
        }
    });
    return name;
}




var service = {
    getNameOfArrayObjects,
}
export default service;