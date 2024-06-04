initUI();

function clearAll(){
    $("#homeContent , #customerContent , #itemContent , #orderContent").css("display","none");
}

function initUI(){
    clearAll();
    $("#homeContet").css("display","block");
    setLastView();
}

function setLastView(){
    let view = localStorage.getItem("view")
    switch(view){
        case "HOME":
            setView($("#homeContent"));
            break;
        case "CUSTOMER":
            setView($("#customerContent"));
            break;
        case "ITEM":
            setView($("#itemContent"));
            break;
        case "ORDER":
            setView($("#orderContent"));
            break;
        default:
            setView($("#homeContent"));
    }
}

function setView(viewObject) {
    clearAll();
    viewObject.css("display","block");
    saveLastView(viewObject.get(0).id);
    console.log(viewObject.get(0).id);
}

function saveLastView(id) {
    switch (id){
        case "homeContent":
            localStorage.setItem("view", "HOME");
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