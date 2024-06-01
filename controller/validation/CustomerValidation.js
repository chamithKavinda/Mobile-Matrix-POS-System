




function checkValidationsCustomer(object){
    if(object.regex.test(object.field.val())){
        setBorderCustomer(true,object)
        return true;
    }
    setBorderCustomer(false, object)
    return false;
}






function checkAllCustomer(){
    for(let i=0; i< cus_vArray.length; i++){
        if(!checkValidationsCustomer(cus_vArray[i]))
            return false;
    }
    return true;
}


