//not a component so no need for rafce

//create a function to help us check our local storage; if user is logged in they have a token which enables them to see content

function checkToken() {
    let result = false;
    let lsData = localStorage.getItem("Token");
    if(lsData && lsData != null){
        result = true;
    }
    return result;
}

export { checkToken }
