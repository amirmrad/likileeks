
// Book class represents a book
class NewsItem{
    constructor(title,author,description,id){
        this.title = title;
        this.author = author;
        this.description = description;
        this.id = id;
    }
}
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
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
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }

//Event: add a book
document.querySelector('#post-form').addEventListener('submit',(e)=>{
    //prevent actual submit
    e.preventDefault();
    // Get form values
    const title = document.querySelector('#title').value;
    console.log(title);
    const author = document.querySelector('#author').value;
    console.log(author);
    const description = document.querySelector('#description').value;
    console.log(description);
    const id = makeid(15);
    console.log(id);

    //validate 
    if(title === '' || author ==='' || description === ''){
        UI.showAlert('Please fill in all the blanks','danger');
    }
    else{
        //instantiate book
        const newsItem = new NewsItem(title,author,description,id);
        postData('/newPost',newsItem);
    }

});