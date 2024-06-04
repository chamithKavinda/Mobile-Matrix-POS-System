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