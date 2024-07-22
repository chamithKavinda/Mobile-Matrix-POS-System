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


    }
    bindTableRowEventsCustomer();
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
    let id = $("#txtCusId").val();

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

// ------------ Remove btn function ------------
function removeCustomer(id){
    for(let i = 0; i < customersDB.length; i++){
        if(customersDB[i].id == id){
            customersDB.splice(i,1);
            return true;
        }
    }
    return false;
}

// ------------ Search customer function ------------
function searchCustomer(customerId) {
    return customersDB.find(function (customer){
        return customer.id == customerId;
    });
}




// Search Customer
$("#btnSearchCustomer").click(function(){

    $("#tblCustomer").empty();
    $("#modalTable").empty();

    let id = $("#txtCustomerSearch").val();
    console.log(id);

    let customer = searchCustomer(id);
    

    let row = `<tr>
    <td>${customer.id}</td>
    <td>${customer.name}</td>
    <td>${customer.address}</td>
    <td>${customer.salary}</td>
</tr>`;

$("#tblCustomer").append(row);
$("#modalTable").append(row);

});


// --------------Update btn event---------------------------
$("#btnUpdateCustomer").click(function (){
    let id = $("#txtCusId").val();
    updateCustomer(id);
    clearCustomerInputFields();
 });
 
 // --------------Update Customer function---------------------------
 function updateCustomer(id) {
     if(searchCustomer(id) == undefined){
         alert("No such customer. Please check the ID!");
     }else{
         let confirmation = confirm("Do you really want to update this customer.?");
         if (confirmation){
             let customer = searchCustomer(id);
 
             let name = $("#txtCusName").val();
             let address = $("#txtCusAddress").val();
             let salary = $("#txtCusSalary").val();
 
             customer.name = name;
             customer.address = address;
             customer.salary = salary;
 
             getAllCustomer();
             alert("Customer updated!");
         }
     }
 }

// ------------ Save btn event ------------
$("#btnSaveCustomer").click(function(){
    if(checkAllCustomer()){
        saveCustomer();
    }else{
        alert("Something went wrong, please try again !!!");
    }
});

// ------------ Save function ------------
function saveCustomer(){
    let customerId = $("#txtCusId").val();

    //check customer if exists or not
    if(searchCustomer(customerId.trim()) == undefined){
        let customerName = $("#txtCusName").val();
        let customerAddress = $("#txtCusAddress").val();
        let customerSalary = $("#txtCusSalary").val();

        let newCustomer = Object.assign({}, CustomerModel);

        newCustomer.id = customerId;
        newCustomer.name = customerName;
        newCustomer.address = customerAddress;
        newCustomer.salary = customerSalary;

        customersDB.push(newCustomer);
        clearCustomerInputFields();
        getAllCustomer();
        alert("Customer added Successsfully!!!");
        loadCustomerIds();
    }else{
        alert("Customer exists.Please try again!!!")
        clearCustomerInputFields();
    }
}



