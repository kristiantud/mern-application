




// class postsCommenters{

//     constructor(){
//         this.postComments = new Map();
//     }

//     addData(postData){
//         this.postComments.set(postData);
//     }

//     getData(postId){
//         return this.postComments.get(postId);
//     }

// }

const postsCommenters = {
    posts: new Map()
}

export function addData(postData){
    var comments = [];
    // console.log(postData[1])
    for (var x = 0; x < postData[1].length; x++){
        comments.push(postData[1][x][1]);
    }

    postsCommenters.posts.set(postData[0], comments);
    comments = [];
    // console.log(postsCommenters.posts);
}

export function getData(postId){
    return postsCommenters.posts.get(postId);
}


export default postsCommenters;