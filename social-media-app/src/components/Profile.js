import React from 'react';
import Thumbnail from './Thumbnail.js';

function findUser(store){
  return store.users.find(user => user.id === store.currentUserId);
}

function findPosts(store){
  return store.posts.filter(post => post.userId === store.currentUserId);
}

function findFollowers(store){
  return store.followers.filter(follower => follower.userId === store.currentUserId);
}

function findFollowing(store){
  return store.followers.filter(followee => followee.followerId === store.currentUserId);
}

function Profile(props) {
  const {store} = props;
  const u = findUser(store);
  return (
      <div>
          <Thumbnail
              userName = {u.id}
              profilePic = {u.photo}
              name = {u.name}
              bio = {u.bio}
              posts = {findPosts(store)}
              followers = {findFollowers(store)}
              following = {findFollowing(store)}
          />    
      </div>
  );
}

export default Profile;