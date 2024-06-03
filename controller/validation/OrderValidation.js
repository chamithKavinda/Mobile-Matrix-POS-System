const CUS_ID_ORDER_REGEX = /^C\d{3}$/;
const ITEM_CODE_ORDER_REGEX = /^I\d{3}$/;

let order_vArray = new Array();
order_vArray.push({field: $("#cusId"), regex: CUS_ID_ORDER_REGEX});
order_vArray.push({field: $("#itemId"), regex: ITEM_CODE_ORDER_REGEX});

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


