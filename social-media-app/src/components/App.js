import React from 'react';
import Header from './Header';
import Home from './Home';
import Navbar from './Navbar';
import Profile from './Profile';
import Explore from './Explore';
import NewPost from './NewPost';
import Activity from './Activity';
import css from 'App.module.css';
import initialStore from 'utils/initialStore';

class App extends React.Component {
	constructor(props){
		super(props);
        this.state = {
            page: "page",
            store: initialStore
        }
        this.setPage = this.setPage.bind(this);
        this.addLike = this.addLike.bind(this);
		this.removeLike = this.removeLike.bind(this);
    }

    setPage(page){
        this.setState({ page: page});
    }

    addLike(postId){
        const like = {
            userId: this.state.store.currentUserId, 
            postId, // make sure you understand this shorthand syntax
            datetime: new Date().toISOString()
        };
        
        this.setState(state=>({
            store:{
              ...state.store,// spread props. make sure you understand this
              likes: state.store.likes.concat(like)
            }
        }));
    }
    
    removeLike(postId){
        this.setState(state=>({
            store:{
              ...state.store,// spread props. make sure you understand this
              likes: state.store.likes.filter(like =>!
                (like.userId===state.store.currentUserId && like.postId===postId)
              )
            }
        }));
    }

    renderMain(page){
        switch(page){
        case "home": return <Home 
            store={this.state.store} 
            onLike={this.addLike} 
            onUnlike={this.removeLike} 
        />;
        case "explore": return <Explore/>;
        case "newpost": return <NewPost/>;
        case "activity": return <Activity/>;
        case "profile": return <Profile/>;
        default: return <Home store={this.state.store} />;
        }
    }

    render(){
    return (
        <div className={css.container}>
            <Header/>
            <main className={css.content}>
		        {this.renderMain(this.state.page)}        
            </main>
            <Navbar onNavChange={this.setPage}/>
        </div>
    )}
}

export default App;