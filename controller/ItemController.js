
// ------------ clear btn event ------------
$("#btnClearItem").click(function(){
    clearItemInputFields();
});

// ------------ clear function ------------
function clearItemInputFields(){
    $("#txtItemCode, #txtItemName, #txtItemPrice, #txtItemQuantity").val("");
    $("#txtItemCode").focus();
    setBtnGroupItem();
}
