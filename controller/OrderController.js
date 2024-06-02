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