



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