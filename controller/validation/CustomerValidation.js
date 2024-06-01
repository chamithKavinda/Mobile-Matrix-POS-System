




function checkValidationsCustomer(object){
    if(object.regex.test(object.field.val())){
        setBorderCustomer(true,object)
        return true;
    }
    setBorderCustomer(false, object)
    return false;
}


function setBorderCustomer(bool, object) {
    if (!bool){
        if(object.field.val().length >=1){
            object.field.css("border", "2px solid red");
        }else{
            object.field.css("border", "1px solid #ced4da");
        }
    }else{
        if(object.field.val().length >=1){
            object.field.css("border", "2px solid green");
        }else{
            object.field.css("border", "1px solid #ced4da");
        }
    }
}


function checkAllCustomer(){
    for(let i=0; i< cus_vArray.length; i++){
        if(!checkValidationsCustomer(cus_vArray[i]))
            return false;
    }
    return true;
}


