
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

// ------------ Get all btn event ------------
$("#btnGetAllItem").click(function (){
    getAllItem();
})

// --------------Get all  function---------------------------
function getAllItem(){
    $("#tblItem").empty();
    $("#modalItemTable").empty();

    for(let i=0; i<itemsDB.length; i++){
        let id = itemsDB[i].code;
        let name = itemsDB[i].name;
        let price = itemsDB[i].price;
        let quantity = itemsDB[i].quantity;

        let row = `<tr>
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${price}</td>
                        <td>${quantity}</td>
                   </tr>`;

        $("#tblItem").append(row);
        $("#modalItemTable").append(row);

        bindTableRowEventsItem();
    }
}