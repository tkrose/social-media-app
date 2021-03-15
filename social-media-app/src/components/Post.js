import React from 'react';
import css from 'Post.module.css'; 
import publicUrl from 'utils/publicUrl';
import timespan from 'utils/timespan.js';

function Post(props) {
    return (
        <article className={css.post}>
            <header className={css.header}>
                <button className={css.user}>
                    <img src={publicUrl(props.user.photo)} alt='User Profile'/>
                    <span >{props.user.id} </span>
                </button>
            </header>

            <section className={css.content}>
                <div className={css.imgContainer}>
                    <img src={publicUrl(props.post.photo)} alt='Post'/>
                </div>
            </section>
    
            <section className={css.actions}> 
                <button> {props.likes.self? 
                    <img src={publicUrl('/assets/unlike.svg')} alt='Unlike Action'/> : <img src={publicUrl('/assets/like.svg')} alt='Like Action'/> } 
                </button> 
                <button > 
                    <img src={publicUrl('/assets/comment.svg')} alt='Comment Action'/> 
                </button> 
            </section> 
        
            <section className={css.activity}> 
                <div className={css.likes.count}> 
                    {props.likes.count} likes 
                </div> 
                <div className={css.comments}> 
                    <div> 
                        <span>{props.post.userId}</span> 
                        <span>{props.post.desc}</span> 
                    </div> 
                    {props.comments.map((comment,i)=> 
                    <div key={i}> 
                        <span>{comment.userId}</span> 
                        <span>{comment.text}</span> 
                    </div> )} 
                </div> 
                <time className={css.time}> 
                    {timespan(props.post.datetime).toUpperCase()} AGO 
                </time> 
            </section>
        </article> );}
   export default Post;