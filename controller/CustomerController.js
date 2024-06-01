getAllCustomer();

// ------------ clear btn event ------------
$("#btnClearCustomer").click(function(){
    clearCustomerInputFields();
});

// ------------ clear function ------------
function clearCustomerInputFields(){
    $("#txtCusId, #txtCusName, #txtCusAddress, #txtCusSalary").val("");
    $("#txtCusId").focus();
    setBtnGroupCustomer();
}

// ------------ Get all btn event ------------
$("#getAll").click(function(){
    getAllCustomer();
});

// ------------ Get all function ------------
function getAllCustomer(){
    $("#tblCustomer").empty();
    $("#modalTable").empty();

    for(let i=0; i<customersDB.length;i++){
        let id = customersDB[i].id;
        let name = customersDB[i].name;
        let address = customersDB[i].address;
        let salary = customersDB[i].salary;

        let row = `<tr>
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${address}</td>
                        <td>${salary}</td>
                  </tr>`;

        $("#tblCustomer").append(row);
        $("#modalTable").append(row);

        bindTableRowEventsCustomer();
    }
}

// ------------ Bind row to fields function ------------
function bindTableRowEventsCustomer() {
    $("#tblCustomer>tr").click(function (){
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();

        $("#txtCusId").val(id);
        $("#txtCusName").val(name);
        $("#txtCusAddress").val(address);
        $("#txtCusSalary").val(salary);

        $("#btnRemoveCustomer").prop("disabled", false);
    });
}

// ------------ Remove btn event ------------
$("#btnRemoveCustomer").click(function(){
    let id = $("txtCusId").val();

    let confirmation = confirm("Are you want to delete" + id + "?");
    if(confirmation){
        let response = removeCustomer(id);
        if(response){
            clearCustomerInputFields();
            getAllCustomer();
            alert("Customer Removed Successfully!!!");
        }else{
            alert("Customer Not Removed.Please try again!!!")
        }
    }
});

// ------------ Remove btn event ------------
function removeCustomer(id){
    for(let i = 0; i < customersDB.length; i++){
        if(customersDB[i].id == id){
            customersDB.splice(i,1);
            return true;
        }
    }
    return false;
}




