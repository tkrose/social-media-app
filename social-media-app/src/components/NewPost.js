import React, { useState, useContext } from 'react';
import css from './NewPost.module.css';
import FileLoader from './FileLoader.js';
import { Link, useHistory } from "react-router-dom";
import { StoreContext } from 'contexts/StoreContext';

function NewPost() {
  let {addPost} = useContext(StoreContext);
  const [dragging, setDragging] = useState(false); // to show a dragging effect
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error] = useState(''); // to show an error message
  const history = useHistory();

  function handleFileDragEnter(e){
    setDragging(true);
  }
  
  function handleFileDragLeave(e){
    setDragging(false);
  }

  function handleFileDrop(e){
    if (e.dataTransfer.types.includes('Files')===false){
			return;
    }
    if (e.dataTransfer.files.length>=1){
      let file = e.dataTransfer.files[0];
      if (file.size>1000000){// larger than 1 MB
        return;
      }
      if (file.type.match(/image.*/)){
				let reader = new FileReader();			
				reader.onloadend = (e) => {
          setPhoto(e.target.result);
		
				};
				reader.readAsDataURL(file);
			}
    }
    setDragging(false);    
  }

  function handleDescChange(e){
    setDesc(e);
  }

  function handleSubmit(e){
    if(photo===null){
      alert('ERROR: Post photo is empty!');
      handleCancel();
      return;
    }

    addPost(photo,desc);
    history.push('/');
    e.preventDefault();
  }

  function handleCancel(){
    // cancelPost();
  }

  return (
    <div>
        <div className={css.photo}>
          {!photo?  <div className={css.message}>Drop your image</div>:
                    <img src={photo} alt="New Post"/>}
            <FileLoader
              onDragEnter={handleFileDragEnter}
              onDragLeave={handleFileDragLeave}
              onDrop={handleFileDrop}
            >
	            <div className={[css.dropArea, dragging?css.dragging:null].join(' ')}
              ></div>
	          </FileLoader>
        </div>
        
        <div className={css.desc}>
					<textarea onChange={e=>handleDescChange(e.target.value)}>
            Describe...
          </textarea>
        </div>
        <div className={css.error}>
					<p>{error}</p>
        </div>
        <div className={css.actions}>
          <Link to="/">
            <button>Cancel</button>
          </Link>
          <button onClick={handleSubmit}>Share</button>         
        </div>
    </div>
  );
}

export default NewPost;
