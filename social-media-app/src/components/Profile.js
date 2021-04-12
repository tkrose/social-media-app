import React, { useContext } from 'react';
import { StoreContext } from 'contexts/StoreContext';
import css from './Profile.module.css';
import publicUrl from '../utils/publicUrl';
import PostThumbnail from './PostThumbnail';
import { Link, useParams } from "react-router-dom";

function Profile() {
  let {users, posts, followers, currentUserId, addFollower, removeFollower} = useContext(StoreContext);
  let {userId} = useParams();
  const userObj = (userId === undefined ? users.find(user => user.id === currentUserId) : users.find(user => user.id === userId)); 
  //const posts = findPosts(userObj.id);
  //const followers = findFollowers(userObj.id);
  //const following = findFollowing(userObj.id);

  function handleFollow() {
    addFollower(userId);
  }
  
  function handleUnfollow() {
    removeFollower(userId);
  }

  return (
		<div className={css.allprofile}>
      <div className={css.user}>
        <img src={publicUrl(userObj.photo)} alt="Profile Pic"/>
        {(followers.filter(follower=>(follower.followerId===currentUserId && follower.userId === userObj.id)).length > 0)?
          <button onClick={handleUnfollow} class={css.followBtn}>Unfollow</button> :
          <button onClick={handleFollow} class={css.unfollowBtn}>Follow</button> 
        }
      </div>
      <div className={css.bio}>
        <p>{userObj.name}</p>
        <p>{userObj.bio}</p>
      </div>
      <div className={css.followers}>
        <p>{posts.length}<br></br>posts</p>
        <p>{followers.filter(follower=>follower.userId===userObj.id).length}<br></br>followers</p>
        <p>{followers.filter(following=>following.followerId===userObj.id).length}<br></br>following</p>
      </div>
      <div className={css.posts}>
        {posts.sort((a,b)=>new Date(b.datetime) - new Date(a.datetime))
            .map(post=>
              <Link key={post.id} to={`/${post.id}`}>
                <PostThumbnail
                  post={post}
                />
              </Link>)}
      </div>
    </div>
	);
}

//function findPosts(id){
//  return posts.filter(user=>user.userId===id);
//}

//function findFollowers(id){
//  return followers.filter(follower=>follower.userId===id).length;
//}

//function findFollowing(id){
//  return followers.filter(following=>following.followerId===id).length;
//}

export default Profile;