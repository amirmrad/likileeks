
// Book class represents a book
class UserLogin{
    constructor(username,password){
        this.username = username;
        this.password = password;
    }
}

let token;

async function checkLogin(url = '', data = {}) {
    // Default options are marked with *
    let res = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    token = res.headers.get('x-auth-token');
}

//Event: add a post
document.querySelector('#login-form').addEventListener('submit',(e)=>{
    //prevent actual submit
    e.preventDefault();
// Get form values
const username = document.querySelector('#username').value;
const password = document.querySelector('#password').value;

//validate
if(username === '' || password === ''){
    alert('Please fill in all the blanks');
}
else{
    //instantiate book
    const userCheck = new User(username,password);
    console.log(usercheck);
    //give data to backend
    checkLogin('/user/signIn',userCheck);
}
});
