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

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("tag");

function getNewsWithHashtag(arrr){
    const newsByHashtag = Object.values(arrr).filter(x => x.tags.includes(myParam))
    return newsByHashtag;
}

fetch('post/posts').then(r => r.json()).then(obj => displayNewsItems(getNewsWithHashtag(obj)))