
// Book class represents a book
class NewsItem{
    constructor(title,author,description,id){
        this.title = title;
        this.author = author;
        this.description = description;
        this.id = id;
    }
}

function upVoteFunction(upVoteButton){
   const id = upVoteButton.parentElement.getAttribute('data-id');
   fetch(`/upVote?id=${id}`);
}
function downVoteFunction(newsItem){
   fetch(`/downVote?id=${newsItem.id}`);
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

  document.addEventListener('DOMContentLoaded',getNewsItems())
  
  function getNewsItems(){
    fetch('/posts').then(res => res.json()).then(r => displayNewsItems(r));
  }



function displayNewsItems(newsArray){
    const postContainer = document.querySelector(".postsContainer");
    newsArray.forEach(element => {
    titleText = document.createTextNode(element.title);
    descText = document.createTextNode(element.description);
    authorText = document.createTextNode(element.author);
    linebreak = document.createElement('br');
    postContainer.appendChild(titleText);
    postContainer.appendChild(descText);
    postContainer.appendChild(authorText);
    });
    
}
  
//Event: add a post
document.querySelector('#post-form').addEventListener('submit',(e)=>{

    //prevent actual submit
    e.preventDefault();
    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const description = document.querySelector('#description').value;
    const id = makeid(15);

    card = document.querySelector('.card');
    card.setAttribute('data-id',id);

    //validate 
    if(title === '' || author ==='' || description === ''){
        alert('Please fill in all the blanks');
    }
    else{
        //instantiate book
        const newsItem = new NewsItem(title,author,description,id);
        //give data to backend
        postData('/newPost',newsItem);
        //add it to ui by getting it from backend again
        getNewsItems();
    }

});
