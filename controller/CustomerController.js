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