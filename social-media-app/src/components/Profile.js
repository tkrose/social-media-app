import React from 'react';
import css from './Profile.module.css';
import publicUrl from '../utils/publicUrl';
import PostThumbnail from './PostThumbnail';
import { Link, useParams } from "react-router-dom";

function Profile(props) {
  const {store} = props;
  let {userId} = useParams();
  const userObj = (userId === undefined ? store.users.find(user => user.id === store.currentUserId) : store.users.find(user => user.id === userId)); 
  const posts = findPosts(userObj.id, store);
  const followers = findFollowers(userObj.id, store);
  const following = findFollowing(userObj.id, store);

  function handleFollow() {
    props.onFollow(userId);
  }
  
  function handleUnfollow() {
    props.onUnfollow(userId);
  }

  return (
		<div className={css.allprofile}>
      <div className={css.user}>
        <img src={publicUrl(userObj.photo)} alt="Profile Pic"/>
        {(store.followers.filter(follower=>(follower.followerId===store.currentUserId && follower.userId === userObj.id)).length > 0)?
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
        <p>{followers}<br></br>followers</p>
        <p>{following}<br></br>following</p>
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

function findPosts(id, store){
  return store.posts.filter(user=>user.userId===id);
}

function findFollowers(id, store){
  return store.followers.filter(follower=>follower.userId===id).length;
}

function findFollowing(id, store){
  return store.followers.filter(following=>following.followerId===id).length;
}

export default Profile;