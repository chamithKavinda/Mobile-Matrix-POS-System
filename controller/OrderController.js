$("#orderId").val(generateNextOrderId());
$("#total").text(0.00);
$("#subTotal").text(0.00);
var date = new Date();
$("#orderDate").val(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
loadCustomerIds();
loadItemCodes();
$("#discount").val(0.00);
$("#balance").val(0.00);
$("#btnPlaceOrder").prop("disabled",true);
$("#btnPurchase").prop("disabled",true);
let orderQty;



$("#selectFormCustomer").on('click', function(){
    setCustomerDetails();
    enabledOrDisabledBtn();
    enabledCartBtn()
});

$("#selectItemFormItem").on('click', function () {
    setItemDetails();
    quantityManage();
    enabledOrDisabledBtn()
    enabledCartBtn()
});

$("#btnPlaceOrder").on('click', function () {
    $("#tblPlaceOrder").empty();
    addToPlaceOrderTable();
});

$("#btnPurchase").on('click', function () {
    if (parseFloat($("#cash").val())>= parseFloat($("#subTotal").text())){
        placeOrderDetails();
        clearPlaceOrderTextFields();
        $("#tblPlaceOrder").empty();
        cartDetails = [];
        $("#orderId").val(generateNextOrderId());
    }else {
        alert("Insufficient credit! please check cash...");
    }
    loadAllOrderDetails();
});

$("#orderQty").on("keydown keyup", function (e) {
    enabledOrDisabledBtn();
    enabledCartBtn();
});

$("#discount").on("keydown keyup", function (e) {
    calculateSubTotal();
});

$("#cash").on("keydown keyup", function (e) {
    calculateBalance();
    enabledOrDisabledBtn()
});

function generateNextOrderId() {
    let orderId = ordersDB[ordersDB.length-1].oid;
    if (orderId!=null){
        let strings = orderId.split("OID-");
        let id= parseInt(strings[1]);
        ++id;
        let digit = id.toString().padStart(3, '0');
        return "OID-" + digit;
    }else {
        return "OID-001";
    }
}

function loadCustomerIds() {
    $("#selectFormCustomer").empty();
    $("#selectFormCustomer").append(`<option selected disabled>Select here</option>`);
    for (const customer of customersDB) {
        $("#selectFormCustomer").append(`<option>${customer.id}</option>`);
    }
}