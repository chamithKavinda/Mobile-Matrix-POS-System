// ------------ clear btn event ------------
$("#btnClearCustomer").click(function(){
    clearCustomerInputFields();
});

// ------------ clear btn function ------------
function clearCustomerInputFields(){
    $("#txtCusId, #txtCusName, #txtCusAddress, #txtCusSalary").val("");
    $("#txtCusId").focus();
    setBtnGroupCustomer();
}

// ------------ save btn event ------------