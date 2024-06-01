// ------ regex for text fields -----
const CUS_ID_REGEX = /^C\d{3}$/;
const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_ADDRESS_REGEX = /^[0-9A-Za-z\s\.,#-]+$/;
const CUS_SALARY_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

// ------- validations to the text fields ----------
let cus_vArray = new Array();
cus_vArray.push({field: $("#txtCusId"), regex: CUS_ID_REGEX});
cus_vArray.push({field: $("#txtCusName"), regex: CUS_NAME_REGEX});
cus_vArray.push({field: $("#txtCusAddress"), regex: CUS_ADDRESS_REGEX});
cus_vArray.push({field: $("#txtCusSalary"), regex: CUS_SALARY_REGEX});


function checkValidationsCustomer(object){
    if(object.regex.test(object.field.val())){
        setBorderCustomer(true,object)
        return true;
    }
    setBorderCustomer(false, object)
    return false;
}

function setBorderCustomer(bool, object) {
    if (!bool){
        if(object.field.val().length >=1){
            object.field.css("border", "2px solid red");
        }else{
            object.field.css("border", "1px solid #ced4da");
        }
    }else{
        if(object.field.val().length >=1){
            object.field.css("border", "2px solid green");
        }else{
            object.field.css("border", "1px solid #ced4da");
        }
    }
}

function checkAllCustomer(){
    for(let i=0; i< cus_vArray.length; i++){
        if(!checkValidationsCustomer(cus_vArray[i]))
            return false;
    }
    return true;
}

setBtnGroupCustomer();

$("#txtCusId, #txtCusName, #txtCusAddress, #txtCusSalary").on("keydown keyup", function (e){
    let indexNo = cus_vArray.indexOf(cus_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidationsCustomer(cus_vArray[indexNo]);

    setBtnGroupCustomer();

    if (e.key == "Enter") {
        if (e.target.id != cus_vArray[cus_vArray.length-1].field.attr("id")) {
            if (checkValidationsCustomer(cus_vArray[indexNo])) {
                cus_vArray[indexNo+1].field.focus();
            }
        }else {
            if (checkValidationsCustomer(cus_vArray[indexNo])) {
                saveCustomer();
            }
        }
    }
});

function setBtnGroupCustomer() {
    $("#btnDeleteCustomer").prop("disabled", true);
    $("#btnUpdateCustomer").prop("disabled", true);

    if (checkAllCustomer()){
        $("#btnSaveCustomer").prop("disabled", false);
    }else{
        $("#btnSaveCustomer").prop("disabled", true);
    }

    let id = $("#txtCusId").val();
    if (searchCustomer(id) == undefined) {
        $("#btnDeleteCustomer").prop("disabled", true);
        $("#btnUpdateCustomer").prop("disabled", true);
    }else {
        $("#btnDeleteCustomer").prop("disabled", false);
        $("#btnUpdateCustomer").prop("disabled", false);
    }
}