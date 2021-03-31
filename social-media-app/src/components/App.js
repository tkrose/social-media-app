import React, { useState } from 'react';
import css from './App.module.css';
import Header from './Header.js';
import Home from './Home.js';
import Navbar from './Navbar.js';
import Explore from './Explore';
import NewPost from './NewPost';
import Activity from './Activity';
import Profile from './Profile';
import initialStore from '../utils/initialStore';
import uniqueId from '../utils/uniqueId';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

function App(){
    const [setPage] = useState('home');
    const [store, setStore] = useState(initialStore);

    function addLike(postId){
        const like = {
            userId: store.currentUserId, 
            postId,
            datetime: new Date().toISOString()
        };
        
        setStore({
          ...store,
          likes: store.likes.concat(like)
        });
    }

    function removeLike(postId){
        setStore({
            ...store,
            likes: store.likes.filter(like=>!(like.userId===store.currentUserId && like.postId===postId)) //and or or
        });
    }

    function addComment(postId, text){
        const comment = {
          userId: store.currentUserId, 
          postId,
          text,
          datetime: new Date().toISOString()
        };
        setStore({
          ...store,
            comments:store.comments.concat(comment)
        });
    }

    function addPost(photo, desc){
        const post = {
            id: uniqueId('post'),
            userId: store.currentUserId,
            photo,
            desc,
            datetime: new Date().toISOString()     
        }
        setStore({
            ...store,
            posts:store.posts.concat(post)
        });

        setPage('home');
    }

	function cancelPost(){
        setPage('home'); 
    }

    function addFollower(userId){
        const newFollow = {           
          userId: userId,
          followerId: store.currentUserId 
        }
        
        setStore({
          ...store,
            followers: store.followers.concat(newFollow)
        });
    }
    
    function removeFollower(userId){
        setStore({
          ...store,
            followers: store.followers.filter(f => !(f.userId === userId && f.followerId === store.currentUserId))
        });
    }

	return (
		<Router basename={process.env.PUBLIC_URL}>
			<div className={css.container}>
                <Header/>
                <main className={css.content}>
                    <Switch>
                        <Route path="/explore">
                            <Explore/>
                        </Route>
                        <Route path="/newpost">
                            <NewPost store={store}
                                onPost={addPost}
                                onCancel={cancelPost}/>
                        </Route>
                        <Route path="/activity">
                            <Activity/>
                        </Route>
	                    <Route path="/profile/:userId?">
                            <Profile store={store} 
                                onFollow={addFollower} 
                                onUnfollow={removeFollower}/>
                        </Route>
                        <Route path="/:postId?">
                            <Home store={store}
                                onLike={addLike}
                                onUnlike={removeLike}
                                onComment={addComment}/>
                        </Route>
                    </Switch>
                </main>
                <Navbar onNavChange={setPage}/>
			</div>
		</Router>
	);

}


export default App;
