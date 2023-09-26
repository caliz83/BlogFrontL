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

//we are going to use an async and await function to help us resolve a promise

const createAccount = async (createdUser) => {
    //from local host / user from UserController (remove the controller) / function form UserController ("AddUsers")  
    let result = await fetch("http://localhost:5086/user/AddUsers", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(createdUser) //to send it in JSON format
    });
    if(!result.ok){
        const message = `Error; try again ${result.status}`
        throw new Error(message)
    }

    let data = await result.json();

    console.log(data)
}

export { checkToken, createAccount }
