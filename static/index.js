
// Book class represents a book
class NewsItem{
    constructor(tags,author,description,id){
        this.tags = tags;
        this.author = author;
        this.description = description;
        this.id = id;
    }
}
let token;


fetch('user/signIn', {
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
    body: JSON.stringify({username: 'ahmr', password: 'amirhossein'}) // body data type must match "Content-Type" header
  }).then(res => token = res.headers.get('x-auth-token'))



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
    let res = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log(res);
    console.log(data);
  }

  document.addEventListener('DOMContentLoaded',getNewsItems())
  
  function getNewsItems(){  
    fetch('/post/posts').then(res => res.json()).then(r => displayNewsItems(r));
  }

function displayNewsItems(newsArray){

    newsArray.forEach(element => {
        makePost(element.tags,element.description,element.author,element.id);
    });
    
}
function makePost(tags, newDescription, newAuthor,id){
    const post = document.createElement('div');
    const singleBlog = document.createElement('div');
    const tagsHeader = document.createElement('h2');
    const newsImage = document.createElement('div');
    const description = document.createElement('p');
    const author = document.createElement('p');
    const btnHolder = document.createElement('div');
    const upVoteButton = document.createElement('button');
    const downVoteButton = document.createElement('button');


    post.setAttribute('class', 'post');
    post.setAttribute("data-id",id)
    singleBlog.setAttribute('class', 'single-blog');

    tagsHeader.setAttribute('id', 'title');
    tagsHeader.innerHTML = "#" + tags;

    newsImage.setAttribute('class','newsImage');
    newsImage.setAttribute('style','height:200px;');
    newsImage.innerHTML = "Image";

    description.setAttribute('id', 'description');
    description.innerHTML = newDescription;

    author.setAttribute('id', 'author');
    author.innerHTML = newAuthor;
    btnHolder.setAttribute('class', 'btn');

    upVoteButton.setAttribute("onclick","upVoteFunction(this)");
    upVoteButton.innerHTML = "Up Vote";
    downVoteButton.innerHTML = "Down Vote";
    downVoteButton.setAttribute("onclick","downVoteFunction(this)");

    btnHolder.appendChild(upVoteButton);
    btnHolder.appendChild(downVoteButton);

    singleBlog.appendChild(tagsHeader);
    singleBlog.appendChild(newsImage);
    singleBlog.appendChild(description);
    singleBlog.appendChild(author);
    singleBlog.appendChild(btnHolder);
    post.appendChild(singleBlog);

    document.querySelector(".postsContainer").appendChild(post);
    //console.log(tags);
    
 }
//Event: add a post
document.querySelector('#post-form').addEventListener('submit',(e)=>{

    //prevent actual submit
    e.preventDefault();
    // Get form values
    const tags = document.querySelector('#tags').value;
    const author = document.querySelector('#author').value;
    const description = document.querySelector('#description').value;
    const id = makeid(15);

    //validate 
    if(tags === '' || author ==='' || description === ''){
        alert('Please fill in all the blanks');
    }
    else{
        //instantiate book
        const newsItem = new NewsItem(tags,author,description,id);
        //give data to backend

        postData('post/newPost',newsItem);
        //clear post container
        const postsContainer = document.querySelector(".postsContainer");
        while (postsContainer.firstChild) {
            postsContainer.removeChild(postsContainer.firstChild);
          }
        //add it to ui by getting it from backend again
        getNewsItems();
    }

});
