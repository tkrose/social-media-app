import React, {createContext, useState, useEffect} from 'react';
import initialStore from '../utils/initialStore';
import uniqueId from '../utils/uniqueId';

function StoreContextProvider(props){
    const [store, setStore] = useState(()=>{
        return JSON.parse(window.localStorage.getItem('store')) || initialStore;
    });
    useEffect(()=>{
        window.localStorage.setItem('store', JSON.stringify(store));
    }, [store]);

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
            posts: store.posts.concat(post)
        });
    }
    
    //function cancelPost(){
    //    setPage('home'); 
    //}
    
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
        <StoreContext.Provider value = {{...store, addComment, addLike, removeLike, addPost, addFollower, removeFollower}}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider; // export this component as default
export const StoreContext = createContext(); 