import React from 'react';
import Post from './Post';

function findUser(post, store){
    return store.users.find(user=>user.id===post.userId);
  }

function findComments(post, store){
  return store.comments.filter(comment=>comment.postId===post.id);
}

function findLikes(post, store){
  let postLikes = store.likes.filter(like=>like.postId===post.id);
  return {
    self: postLikes.some(like=> like.userId===store.currentUserId),
    count: postLikes.length
  }
}

function Home(props) {
    const {store} = props;
    
    // const post = {
    //     user:{
    //         id:"judy",
    //         photo:"/assets/user1.png",
    //     },
    //     post:{
    //         id:"post-1",
    //         userId:"judy",
    //         photo:"/assets/post1.png",
    //         desc:"#zootopia #excited",
    //         datetime: "2020-02-09T22:45:28Z"
    //     },
    //     likes: {
    //         self: true,
    //         count:1
    //     },
    //     comments:[
    //         {
    //       userId:"nick",
    //       text:"Welcome to Zootopia!"
    //     },
    //     {
    //         userId:"judy",
    //         text:"Thanks!😁Looking forward to meeting you!"
    //     }
    //     ]
    // };
 
    return (
		<div>
      {store.posts.sort((a,b)=>new Date(b.datetime) - new Date(a.datetime))
      .map(post=>
			<Post
	        key={post.id}
	        user={findUser(post, store)}
	        post={post}
	        comments={findComments(post, store)}
	        likes={findLikes(post, store)}
            onLike={props.onLike} 
            onUnlike={props.onUnlike}
	      />)}
    </div>
	);
}

export default Home;