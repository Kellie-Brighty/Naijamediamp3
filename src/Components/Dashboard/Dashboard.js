import { Modal, makeStyles, Avatar } from '@material-ui/core';
import React, { useState } from 'react';
// import { PostContext } from '../Context';
import { UploadProfileImage } from '../Tools/UploadProfileImage';
import { db } from '../util/Firebase';
import StringData from '../util/StringData';
import {useHistory} from 'react-router-dom';
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";
import Header from '../Header/Header'

const useStyles = makeStyles({
    textarea: {
        width: '100%', 
    },
    downloadBtn: {
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: 'green',
        color: 'white',
        textAlign: 'center',
        border: 'none'
    }
});

function Dashboard(props) {
    const classes = useStyles();
    const userName = localStorage.getItem(StringData.UserName);
    // const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    // const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    // const [postData, setPostData] = useContext(PostContext);
    const [message, setMessage] = useState();
    const history = useHistory();
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState();
    const [avatar, setAvatar] = useState(null);
    const [avatarURL, setAvatarURL] = useState('');
    const [musicURL, setMusicURL] = useState('');
    const [videoURL, setVideoURL] = useState('');
    const username = props.match.params.username;
    console.log(props)


    const [values, setValues] = useState({
        title: '',
        categories: '',
        tag: '',
        content: '',
        image: '',
        musicFile: ''
    });

    const handleModalClose = () => {
        setModalOpen(false)
      }
      const handleModalOpen = () => {
        setModalOpen(true)
        // setOpen(false)
      }

      const currentDay = (sp) => {
          let today = new Date();
          let dd = today.getDate();
          let mm = today.getMonth()+1;
          let yyyy = today.getFullYear();
          let hh = today.getHours();
          let MM = today.getMinutes();
          let ss = today.getSeconds();

          if(dd<10) dd='0'+dd
          if(mm<10) mm='0'+mm

          return (dd+sp+mm+sp+yyyy + ' ' + hh+':'+MM+':'+ss);
      }

      const handleChange = (prop) => (event) => {
        setLoading(false)
        // setError(null)
        setValues({ ...values, [prop]: event.target.value });
      };

      const handlePostSubmit = (e) => {
        e.preventDefault();
        // setError(null)
        setLoading(true)

        if(values.title === '' || values.categories === '') {
            // setError("Don't leave any field empty.")
            setLoading(false)
        }else{
            setLoading(true)
            // setError(null)
            const newPost = {
                title: values.title,
                categories: values.categories,
                date: currentDay('-'),
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                image: avatarURL,
                content: values.content,
                tag: values.tag,
                author: 'Admin',
                comments: 0,
                likes: 0,
                views: 0,
                music: musicURL,
                video: videoURL,

            }
            db.collection('posts').add(newPost).then(doc => {
                const newDBPost = newPost;
                newDBPost.postId = doc.id;
                // console.log(`Post ${doc.id} has been created successfully`)
                setLoading(false)
                setModalOpen(false)
                setMessage('Post Created.');
            });
        }
        history.push('/')
      }

    
    const handleUploadStart = () => {
        setUploading(true)
        setProgress(0)
    }
    const handleProgress = progress => setProgress(progress);
    const handleUploadError = error => {
    setUploading(false);
    console.error(error);
  };
  const handleUploadImageSuccess = filename => {
    setAvatar(filename);
    setProgress(100);
    setUploading(false)
    firebase
      .storage()
      .ref(userName)
      .child(filename)
      .getDownloadURL()
      .then(url => setAvatarURL(url));
  };
  const handleUploadVideoSuccess = filename => {
    setAvatar(filename);
    setProgress(100);
    setUploading(false)
    firebase
      .storage()
      .ref(userName)
      .child(filename)
      .getDownloadURL()
      .then(url => setVideoURL(url));
  };
  const handleUploadMusicSuccess = filename => {
    setAvatar(filename);
    setProgress(100);
    setUploading(false)
    firebase
      .storage()
      .ref(userName)
      .child(filename)
      .getDownloadURL()
      .then(url => {
          setMusicURL(url) 
        console.log(url)
    });
  };

    const body = (
        <div style={{backgroundColor: 'rgb(0, 26, 36)', margin: '0px auto', width: '80%', marginTop: '40px', display: 'flex', justifyContent: 'center', padding: '50px 10px', paddingBottom: '20px' }} className={classes.paper}>
            <div style={{justifyContent: 'center', display: 'flex'}} >
            <form action="" onSubmit={handlePostSubmit} >
                <p style={{color: 'white'}} >Title</p>
                <input className={classes.input} type="text" value={values.title} onChange={handleChange('title')} />
                <p style={{color: 'white'}} >Categories</p>
                <input className={classes.input} type="text" value={values.categories} onChange={handleChange('categories')} />
                <p style={{color: 'white'}} >Tag</p>
                <input className={classes.input} type="text" value={values.tag} onChange={handleChange('tag')} />
                <p style={{color: 'white'}} >Content</p>
                <textarea aria-multiline rows={6} className={classes.textarea} type="text" value={values.content} onChange={handleChange('content')} />
                <div>
                <div style={{color: 'white'}} >
                <label>Avatar:</label>
                {uploading && <p>Progress: {progress}</p>}
                {avatarURL && <Avatar src={avatarURL} variant='square' />}
                <div>
                <label >Upload Feature Image</label>
                <p style={{color: 'red', fontSize: '13px'}} >Please always add a feature image to your post!</p>
                <FileUploader
                    accept="images/*"
                    name="avatar"
                    storageRef={firebase.storage().ref("images")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadImageSuccess}
                    onProgress={handleProgress}
                />
                <label >Upload Video</label>
                <FileUploader
                    accept="video/*"
                    name="avatar"
                    storageRef={firebase.storage().ref("images")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadVideoSuccess}
                    onProgress={handleProgress}
                />
                <label >Upload Music</label>
                <FileUploader
                    accept="music/*"
                    name="avatar"
                    storageRef={firebase.storage().ref("images")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadMusicSuccess}
                    onProgress={handleProgress}
                />
                
                </div>
                </div>
                </div>
                <button  style={{marginTop: '20px'}} type='submit' >{loading ? 'Posting...' : 'Post'}</button>
            </form>
            </div>
            
        </div>
      );

    return (
        <div>
            <Header />
            <h3 style={{marginTop: '150px', color: 'white', textAlign: 'center'}} >Welcome to your Dashboard, {userName && userName}</h3>
            <UploadProfileImage />
            <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}} >
            <button className={classes.downloadBtn} onClick={handleModalOpen} >New post test</button>
            {message && <p style={{color: 'white'}} >{message}</p>}
            </div>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                    >
                {body}
            </Modal>
        </div>
    )
}

export default Dashboard
