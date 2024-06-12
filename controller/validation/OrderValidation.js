const CUS_ID_ORDER_REGEX = /^C\d{3}$/;
const ITEM_CODE_ORDER_REGEX = /^I\d{3}$/;

let order_vArray = new Array();
order_vArray.push({field: $("#cusId"), regex: CUS_ID_ORDER_REGEX});
order_vArray.push({field: $("#itemId"), regex: ITEM_CODE_ORDER_REGEX});

$("#cusId,#itemId").on("keydown keyup", function (e) {
    //get the index number of data input fields indexNo
    let indexNo = order_vArray.indexOf(order_vArray.find((c) => c.field.attr("cusId") == e.target.id));

    //Disable tab key
    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkOrderValidations(item_vArray[indexNo]);

    //If the enter key pressed cheque and focus
    if (e.key == "Enter") {

        if (e.target.id != order_vArray[order_vArray.length - 1].field.attr("cusId")) {
            //check validation is ok
            if (checkOrderValidations(order_vArray[indexNo])) {
                order_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkOrderValidations(order_vArray[indexNo])) {
                addToPlaceOrderTable();
            }
        }
    }
});

function clearPlaceOrderTextFields() {
    $("#cusId,#cusName, #cusAddress,#cusSalary,#selectItemFormItem,#selectFormCustomer,#itemId,#itemName,#price,#quantity,#orderQty,#cash,#balance,#discount").val("");
    $("#total").text(0.00);
    $("#subTotal").text(0.00);
}

function checkOrderValidations(object) {
    if (object.regex.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid purple");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }

}


function enabledOrDisabledBtn() {
    if (($("#selectFormCustomer").val() !== null) && ($("#selectItemFormItem").val() !== null) &&  ($("#cash").val().length!= 0) ){
        $("#btnPurchase").prop("disabled",false);
    }else {
        $("#btnPurchase").prop("disabled",true);
    }
}

function enabledCartBtn() {
    if (($("#selectFormCustomer").val() !== null) && ($("#selectItemFormItem").val() !== null) && ($("#orderQty").val().length!= 0)  ){
        $("#btnPlaceOrder").prop("disabled",false);
    }else {
        $("#btnPlaceOrder").prop("disabled",true);
    }
}

$("#orderQty").on("keydown keyup input", function (e){
    let qty = parseInt($("#quantity").val());
    let orderQty = parseInt($("#orderQty").val());
    if (qty >= orderQty && qty > 0){
        $("#orderQty").css("border", "2px solid purple");
        $("#orderQtyError").text("");
        $("#btnPlaceOrder").prop("disabled", false);
    }
    else if (qty < orderQty){
        $("#orderQty").css("border", "2px solid red");
        $("#orderQtyError").text(`Please Enter Amount lower than: ${qty}!`);
        $("#btnPlaceOrder").prop("disabled", true);
    }
    else if (orderQty <= 0){
        $("#orderQty").css("border", "2px solid red");
        $("#orderQtyError").text(`Please Enter Valid Amount!`);
        $("#btnPlaceOrder").prop("disabled", true);
    }
    else if(isNaN(orderQty)){
        $("#orderQtyError").text("Please Input Quantity!");
        $("#btnPlaceOrder").prop("disabled", true);
    }else{
        $("#orderQtyError").text("");
    }
});
