import publicUrl from 'utils/publicUrl';
import PostThumbnail from './PostThumbnail.js';
import css from 'Thumbnail.module.css';

function renderPostThumbnails(posts){
    return posts.map(post => PostThumbnail(post))
}

function Thumbnail(props){
    const userName = props.userName;
    const profilePic = props.profilePic;
    const name = props.name;
    const bio = props.bio;
    const posts = props.posts;
    const followers = props.followers;
    const following = props.following;
    return(
        <div>
            <div class={css.line}>
                <div class={css.container}>
                    <img class={css.profilePic} src={publicUrl(profilePic)} alt="Profile Pic"/>
                    <b class={css.userName}>{userName}</b>
                </div>
                <div>
                    <b class={css.container}>{name}</b>
                    <p class={css.container}>{bio}</p>
                </div>
            </div>
            <div>
                <p class={css.userStats}>
                    <p><b>{posts.length}</b><br></br>Posts</p>
                    <p><b>{followers.length}</b> <br></br>Followers</p>
                    <p><b>{following.length}</b> <br></br>Following</p>
                </p>
            </div>
            <div class={css.posts}>
                {renderPostThumbnails(posts)}
            </div>
        </div>
        
    );
}

export default Thumbnail;