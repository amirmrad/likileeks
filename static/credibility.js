function upVoteFunction(upVoteButton){
    console.log("up prezsed");
     const id = upVoteButton.parentElement.parentElement.parentElement.getAttribute('data-id');
     console.log(id);
    // //update upvote of post in database
     fetch(`post/upVote?id=${id}`);
    // //--------------------
    // updateCP(id);
 }
 function downVoteFunction(downVoteButton){
    const id = downVoteButton.parentElement.getAttribute('data-id');
    //
    fetch(`post/downVote?id=${id}`);
    updateCP(id);
 }

function updateCP(id){

    users = [{
        username:"rozina",
        cp:2
    },{
        username:"houssam966",
        cp:20
    },{
        username:"ahmr",
        cp:10
    }];

    //get the username of whoever posted the news
    username = "houssam966";
    //function to get the cp from the username
    var cp;
    var userIndex;
    for(x = 0;x<users.length;x++){
        if(users[x].username == username){
            userIndex = x;
            cp = users[x].cp;
        }
    }

    //getAll posts
    posts = [{
        author: "houssam966",
        upVotes: 6,
        downVotes:10,
        id:1
    },{
        author: "houssam966",
        upVotes: 9,
        downVotes:20,
        id:2
    },{
        author: "rozina",
        upVotes: 600,
        downVotes:100,
        id:3
    }]
    //find post with that id
    var postIndex;
    for(x = 0;x<posts.length;x++){
        if(posts[x].id == id){
            postIndex = x;
        }
    }
    //get the upvotes and downvotes
    const upVote = posts[postIndex].upVote;
    const downVote = posts[postIndex].downVote;
    //update cp of user
    users[userIndex].cp = users[userIndex].cp + getCPIncrease(upVote,downVote);


}
function getCPIncrease(upVote,downVote){
   return  Math.log(upVote)/Math.log(downVote);
}
 