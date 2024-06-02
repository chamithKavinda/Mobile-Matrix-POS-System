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

setBtnGroupItem();

$("#txtItemCode, #txtItemName, #txtItemPrice, #txtItemQuantity").on("keydown keyup", function (e){
    let indexNo = item_vArray.indexOf(item_vArray.find((c) => c.field.attr("code") === e.target.code));

    if (e.key == "Tab") {
        e.preventDefault();
    }
    checkValidationsItem(item_vArray[indexNo]);

    setBtnGroupItem();

    if (e.key == "Enter") {
        if (e.target.code != item_vArray[item_vArray.length-1].field.attr("code")) {
            if (checkValidationsItem(item_vArray[indexNo])) {
                item_vArray[indexNo+1].field.focus();
            }
        }else {
            if (checkValidationsItem(item_vArray[indexNo])) {
                saveItem();
            }
        }
    }
});

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

function setBtnGroupItem() {
    $("#btnDeleteItem").prop("disabled", true);
    $("#btnUpdateItem").prop("disabled", true);

    if (checkAllItems()){
        $("#btnSaveItem").prop("disabled", false);
    }else{
        $("#btnSaveItem").prop("disabled", true);
    }

    let code = $("#txtItemCode").val();
    if (searchItem(code) == undefined) {
        $("#btnDeleteItem").prop("disabled", true);
        $("#btnUpdateItem").prop("disabled", true);
    }else {
        $("#btnDeleteItem").prop("disabled", false);
        $("#btnUpdateItem  ").prop("disabled", false);
    }
}