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

// ------------ save btn event ------------
$("#btnSaveCustomer").click(function(){
    if(checkAllCustomer()){
        saveCustomer();
    }else{
        alert("Something Went wrong! Please Check again.");
    }
});

// ------------ save function ------------
function saveCustomer(){
    let customerId = $("$txtCusId").val();

    //check customer if exixts or not
    if(searchCustomer(customerId.trim()) == undefined){
        let customerName = $("#txtCusName").val();
        let customerAddress = $("#txtCusAddress").val();
        let customerSalary = $("#txtCusSalary").val();

        let newCustomer = object.assign({}, CustomerModel);

        newCustomer.id = customerId;
        newCustomer.name = customerName;
        newCustomer.address = customerAddress;
        newCustomer.salary = customerSalary;

        customersDB.push(newCustomer);
        clearCustomerInputFields();
        getAllCustomer();
        alert("Customer added sucessfully!!");
        loadCustomerIds();
    }else{
        alert("Customer Exists!!.Please Try Again")
        clearCustomerInputFields();
    }
}

// ------------ search DB function ------------
function searchCustomer(customerId){
    return customersDB.find(function(customer){
        return customer.id == customerId;
    });
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