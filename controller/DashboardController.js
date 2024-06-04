initUI();

function clearAll(){
    $("#homeContent , #customerContent , #itemContent , #orderContent").css("display","none");
}

function initUI(){
    clearAll();
    $("#homeContet").css("display","block");
    setLastView();
}