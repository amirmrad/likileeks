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


function getAllUserPosts(username){
    var news=[];
    for(x = 0;x<posts.length;x++){
        if(posts[x].author == username){
            news.push(posts[x]);
        }
    }
    return news;
}