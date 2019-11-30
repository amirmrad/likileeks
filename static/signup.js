
// Book class represents a book
class UserItem{
    constructor(name,surname,email,password){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
    }
}

async function makeUser(url = '', data = {}) {
    // Default options are marked with *
    await fetch(url, {
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
}

//Event: add a post
document.querySelector('#user-form').addEventListener('submit',(e)=>{
    //prevent actual submit
    e.preventDefault();
    // Get form values
    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    //validate
    if(name === '' || surname ==='' || email === '' || password === ''){
        alert('Please fill in all the blanks');
    }
    else{
        //instantiate book
        const userItem = new UserItem(name,surname,email,password);
        console.log(userItem);
        //give data to backend
        makeUser('/newUser',userItem);
    }

});
