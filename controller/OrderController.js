



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