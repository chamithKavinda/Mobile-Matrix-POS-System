// ------ regex for text fields -----
const ITEM_CODE_REGEX = /^I\d{3}$/;
const ITEM_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const ITEM_PRICE_REGEX =/^[0-9]{2,}([.][0-9]{2})?$/;
const ITEM_QUANTITY_REGEX = /^\d+(\.\d+)?/;

// ------- add validations to the text fields ----------
let item_vArray = new Array();
item_vArray.push({field: $("#txtItemCode"), regex: ITEM_CODE_REGEX});
item_vArray.push({field: $("#txtItemName"), regex: ITEM_NAME_REGEX});
item_vArray.push({field: $("#txtItemPrice"), regex: ITEM_PRICE_REGEX});
item_vArray.push({field: $("#txtItemQuantity"), regex: ITEM_QUANTITY_REGEX});


function checkValidationsItem(object){
    if(object.regex.test(object.field.val())){
        setBorderItem(true, object)
        return true;
    }
    setBorderItem(false, object)
    return false;
}

function checkAllItems(){
    for (let i = 0; i < item_vArray.length; i++) {
        if (!checkValidationsItem(item_vArray[i])) return false;
    }
    return true;
}

function setBorderItem(bool, object) {
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
