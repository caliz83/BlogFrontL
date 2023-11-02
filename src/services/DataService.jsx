//not a component so no need for rafce

let userData = {};

//create a function to help us check our local storage; if user is logged in they have a token which enables them to see content

function checkToken() {
    let result = false;
    let lsData = localStorage.getItem("Token");
    if(lsData && lsData != null){
        result = true;
    }
    return result;
}

//One function to rule them all - 'DRY CODE' -> don't repeat your code
//anytime you find yourself copy/pasting and just changing variables (endpoints), think about doing this
const sendData = async (endpoint, passedInData) => {
    let result = await fetch(`http://localhost:5086/user/${endpoint}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(passedInData)
    });
    if(!result.ok){
        const message = `Error; try again ${result.status}`;
        throw new Error(message);
    }

    let data = await result.json();
    return data;
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
        const message = `Error; try again ${result.status}`;
        throw new Error(message);
    }

    let data = await result.json();

    console.log(data)
}

//async because it is awaiting a response form the server (like axios with the .then)
const login = async (loginUser) => {
    let result = await fetch("http://localhost:5086/user/Login", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(loginUser), //to send it in JSON format
        // mode: 'no-cors'
    });
    if(!result.ok){
        const message = `Error; try again ${result.status}`
        throw new Error(message)
    }

    let data = await result.json();

    // if(data.token != null){
    //     localStorage.setItem("Token", data.token)
    // } //being handled in login function now
    console.log(data);
    return data; //need to return something for the handleSubmit function in login to work
}

const GetLoggedInUser = async (username) => {
    let result = await fetch(`http://localhost:5086/user/GetUserByUsername/${username}`);
    userData = await result.json();
    console.log(userData);
}

const LoggedInData = () => {
    return userData;
}

const AddBlogItems = async (blogItems) => {
    let result = await fetch("http://localhost:5086/blog/AddBlogItems", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
    },
    body: JSON.stringify(blogItems)
});
if(!result.ok){
    const message = `Error; try again ${result.status}`;
    throw new Error(message);
}
let data = await result.json();

return data;
};

const GetBlogItems = async () => {
    let result = await fetch("http://localhost:5086/blog/GetBlogItem");
    let data = await result.json();
    return data;
}

const GetBlogItemsByUserId = async (UserId) => {
    let result = await fetch(`http://localhost:5086/blog/GetItemsByUserId/${UserId}`);
    let data = await result.json();
    return data;    
}

const updateBlogItems = async (blogItems) => {
    let result = await fetch("http://localhost:5086/blog/UpdateBlogItems", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(blogItems)
    });
    if(!result.ok){
        const message = `An error has occurred ${result.status}`;
        throw new Error(message);
    }
    let data = await result.json();
    console.log(data);
    return data;
}

const getPublishedBlogItems = async () => {
    let result = await fetch("http://localhost:5086/blog/GetPublishedItems");
    let data = await result.json();
    return data;
}


export { checkToken, createAccount, login, GetLoggedInUser, LoggedInData, AddBlogItems, sendData, GetBlogItems, GetBlogItemsByUserId, updateBlogItems, getPublishedBlogItems }
