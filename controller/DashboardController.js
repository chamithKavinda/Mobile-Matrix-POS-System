initUI();

function clearAll(){
    $("#dashboard , #customerContent , #itemContent , #orderContent").css("display","none");
}

function initUI(){
    clearAll();
    $("#dashboard").css("display","block");
    setLastView();
}

// function setLastView(){
//     let view = localStorage.getItem("view")
//     switch(view){
//         case "DASHBOARD":
//             setView($("#dashboard"));
//             break;
//         case "CUSTOMER":
//             setView($("#customerContent"));
//             break;
//         case "ITEM":
//             setView($("#itemContent"));
//             break;
//         case "ORDER":
//             setView($("#orderContent"));
//             break;
//         default:
//             setView($("#dashboard"));
//     }
// }

function setView(viewObject) {
    clearAll();
    viewObject.css("display","block");
    saveLastView(viewObject.get(0).id);
}

function saveLastView(id) {
    switch (id){
        case "dashboard":
            localStorage.setItem("view", "DASHBOARD");
            break;
        case "customerContent":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "itemContent":
            localStorage.setItem("view", "ITEM");
            break;
        case "orderContent":
            localStorage.setItem("view", "ORDER");
            break;
    }
}

// --bindEvents__
$("#linkDashboard").click(function (){
    setView($("#dashboard"));
})

$("#linkCustomer").click(function (){
    setView($("#customerContent"));
})

$("#linkItem").click(function (){
    setView($("#itemContent"));
})

$("#linkOrder").click(function (){
    setView($("#orderContent"));
})