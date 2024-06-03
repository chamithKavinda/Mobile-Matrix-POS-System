$("#orderId").val(generateNextOrderId());
$("#total").text(0.00);
$("#subTotal").text(0.00);
var date = new Date();
$("#orderDate").val(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
loadCustomerIds();
loadItemCodes();
$("#discount").val(0.00);
$("#balance").val(0.00);
$("#btnPlaceOrder").prop("disabled",true);
$("#btnPurchase").prop("disabled",true);
let orderQty;



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

$("#orderQty").on("keydown keyup", function (e) {
    enabledOrDisabledBtn();
    enabledCartBtn();
});

$("#discount").on("keydown keyup", function (e) {
    calculateSubTotal();
});

$("#cash").on("keydown keyup", function (e) {
    calculateBalance();
    enabledOrDisabledBtn()
});

function generateNextOrderId() {
    let orderId = ordersDB[ordersDB.length-1].oid;
    if (orderId!=null){
        let strings = orderId.split("OID-");
        let id= parseInt(strings[1]);
        ++id;
        let digit = id.toString().padStart(3, '0');
        return "OID-" + digit;
    }else {
        return "OID-001";
    }
}

function loadCustomerIds() {
    $("#selectFormCustomer").empty();
    $("#selectFormCustomer").append(`<option selected disabled>Select here</option>`);
    for (const customer of customersDB) {
        $("#selectFormCustomer").append(`<option>${customer.id}</option>`);
    }
}

function loadItemCodes() {
    $("#selectItemFormItem").empty();
    $("#selectItemFormItem").append(`<option selected disabled>Select here</option>`);
    for (const items of itemsDB) {
        $("#selectItemFormItem").append(`<option>${items.code}</option>`);
    }
}

function setCustomerDetails() {
    for (const customer of customersDB) {
        if (customer.id === $("#selectFormCustomer").val()) {
            $("#cusId").val(`${customer.id}`);
            $("#cusName").val(customer.name);
            $("#cusAddress").val(customer.address);
            $("#cusSalary").val(customer.salary);
            break;
        }
    }
}

function setItemDetails() {
    for (const item of itemsDB) {
        if (item.code === $("#selectItemFormItem").val()) {
            $("#itemId").val(`${item.code}`);
            $("#itemName").val(item.name);
            $("#price").val(item.price);
            $("#quantity").val(item.quantity);
            break;
        }
    }
}

function quantityManage() {
    for (const cartD of cartDetails) {
        if (cartD.itemCode === $("#selectItemFormItem").val()){
            let newQty = $("#quantity").val()-orderQty;
            $("#quantity").val(newQty);
        }
    }
}

function isExists(itemCode) {
    for (const item of cartDetails) {
        if (item.itemCode === itemCode) {
            return item;
        }
    }
    return null;
}

function addToPlaceOrderTable() {
    $("#tblPlaceOrder").empty();
    if (($("#orderQty").val().length!=0) && (parseInt($("#orderQty").val())<=parseInt($("#quantity").val())) ){
        let code = $("#itemId").val();
        let name = $("#itemName").val();
        let price = parseFloat($("#price").val()).toFixed(2);
        orderQty = parseInt($("#orderQty").val())
        let total = (price * orderQty).toFixed(2);
        let exists = isExists($("#selectItemFormItem").val());

        if (exists != null) {
            exists.quantity = exists.quantity + orderQty;
            total = (price * exists.quantity).toFixed(2);
            exists.total = total;
        } else {
            var cartTm = Object.assign({}, cartModel);
            cartTm.itemCode = code;
            cartTm.itemName = name;
            cartTm.unitPrice = price;
            cartTm.quantity = orderQty;
            cartTm.total = total;
            cartDetails.push(cartTm);
        }
        alert("Order has been added successfully!.");
        quantityManage();
        calculateTotal();
        $("#orderQty").val("");
        loadAllOrderDetails();
    }else {
        alert("Please check the quantity!. Order has been added unsuccessfully!.");
    }
}

function placeOrderDetails() {
    let orderId = $("#orderId").val();
    let orderDate = $("#orderDate").val();
    let customerId = $("#cusId").val();
    let iCode = $("#itemId").val();
    let orQty =$(this).children(":eq(3)").text();
    let tota = $(this).children(":eq(4)").text();

    let orders = Object.assign({},orderModel);
    orders.oid = orderId;
    orders.date = orderDate;
    orders.customerID = customerId;
    ordersDB.push(orders);

    for (const cartD of cartDetails) {
        let orderDetail = Object.assign({},orderDetailsModel);
        orderDetail.oid = orderId;
        orderDetail.code = cartD.itemCode;
        orderDetail.qty = cartD.quantity;
        orderDetail.payment = cartD.total;
        let items = searchItem( cartD.itemCode);

        if (items!=null){
            items.qtyOnHand=items.qtyOnHand-cartD.quantity;
        }

        orders.orderDetails.push(orderDetail);
    }
    alert("Order has been placed successfully!.")
    generateNextOrderId();
}

function loadAllOrderDetails() {
    for (let i = 0; i < cartDetails.length; i++) {
        let row = `<tr>
                     <td>${cartDetails[i].itemCode}</td>
                     <td>${cartDetails[i].itemName}</td>
                     <td>${cartDetails[i].unitPrice}</td>
                     <td>${cartDetails[i].quantity}</td>
                     <td>${cartDetails[i].total}</td>
                    </tr>`;
        $("#tblPlaceOrder").append(row);
        doubleClickItem();
    }
}

function calculateTotal() {
    let Total =0;
    for (let i = 0; i <cartDetails.length; i++) {
        Total=Total+parseFloat(cartDetails[i].total)
    }
    $("#total, #subTotal").text(Total.toFixed(2));
}

function calculateSubTotal() {
    let subTotal = parseFloat($("#total").text());
    let discount = subTotal * parseFloat($("#discount").val()) * 0.01;
    let newSubTotal = subTotal - discount;
    $("#subTotal").text(newSubTotal.toFixed(2));
}

function calculateBalance() {
    if ($("#cash").val().length!=0 && ($("#subTotal").text().length!=0)){
        let subTotal = parseFloat($("#subTotal").text());
        let cash = parseFloat($("#cash").val());
        let balance = cash - subTotal;
        $("#balance").val(balance.toFixed(2));
    }else {
        $("#balance").val(0.00);
    }
}





