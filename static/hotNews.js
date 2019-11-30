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


function getHottestPosts(){
    var sortedNews=[];
    while(sortedNews.length!=posts.length){
        var min = posts[0];
        for(x = 1;x<posts.length;x++){
            var total = posts[x].upVotes + posts[x].downVotes;
            var minTotal = min.upVotes + min.downVotes;
            if(total<minTotal){
                min = posts[x];
            }
        }
        sortedNews.push(min);
    }
    return sortedNews;
}