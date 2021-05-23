import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import {db} from '../util/Firebase';
import Header from '../Header/Header';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {InlineShareButtons} from 'sharethis-reactjs';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player';
import GetAppIcon from '@material-ui/icons/GetApp';



const useStyles = makeStyles({
    postTitle: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    titleText: {
        color: 'white',
        fontSize: '25px'
    },
    contentArea: {
        padding: '5px 15px',
        backgroundColor: 'black',
        marginTop: '120px',
    },
    category: {
        color: 'white',
        backgroundColor: 'green',
        borderRadius: '2px',
        fontSize: '15px',
        border: 'none',
        padding: '3px',
        margin: '10px auto'
    },
    authorBox: {
        borderRight: 'none', borderLeft: 'none',
        borderTop: '1px dotted green', borderBottom: '1px dotted green',
        display: 'flex',
        alignItems: 'start',
        color: 'green',
        fontWeight: 'bold',
        padding: '10px 0px',
        marginTop: '10px'
    },
    timeIcon: {
        fontSize: '13px',
        marginRight: '5px'
    },
    authorIcon: {
        fontSize: '15px',
        marginRight: '5px'
    },
    commentLine: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px'
    },
    socials: {
        display: 'flex',
        alignItems: 'center',
        zIndex: '-5',
        marginTop: '50px'
    },
    postContent: {
        color: 'white'
    },
    musicDiv: {
        marginTop: '40px'
    },
    downloadBtn: {
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: 'green',
        color: 'white',
        textAlign: 'center'
    },
    commentSection: {
        padding: '0px 20px'
    },
    input: {
        width: '100%',
        outline: 'none',
        borderRadius: '5px',
        border: 'none',
        padding: '10px 10px',
    },
    textarea: {
        width: '100%',
        outline: 'none',
        borderRadius: '5px',
        border: 'none',
        padding: '10px 10px',
    },
    postBtn: {
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: 'green',
        color: 'white',
        textAlign: 'center',
        border: 'none',
        marginTop: '20px'
    }
});

function Content(props) {
    const classes = useStyles();
    const [postData, setPostData] = useState({});
    const [loading, setLoading] = useState(false)
    const title = props.match.params.title;
    const [values, setValues] = useState({
        name: '',
        comment: ''
    });
    const [comments, setComments] = useState({});
    const [postComments, setPostComments] = useState([]);
    const [commentLoading, setCommentLoading] = useState(false);
    const history = useHistory();

    const handleChange = (prop) => (event) => {
        setLoading(false)
        // setError(null)
        setValues({ ...values, [prop]: event.target.value });
      };

    useEffect(() => {
        setLoading(true)
        db.collection('posts').where('title', '==', title).get().then(querySnapshot => {
            setPostData(querySnapshot.docs[0].data())
            setLoading(false)
        });
    }, [title]);

    useEffect(() => {
        db.collection('comments').where('title', '==', title).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                setPostComments(doc.data())
                console.log(postComments)
            })
        })
    }, [])

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setCommentLoading(true);

        const newComment = {
            name: values.name,
            comment: values.comment,
            title: postData.title
        }

        db.collection('comments').doc(newComment.name).set(newComment).then(() => {
            db.collection('posts').doc(postData.title).update({
                comments: postData.comments + 1
            });
            console.log(newComment);
            setCommentLoading(false)
            history.push(`/${postData.title}`)
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <div>
            <Header />
            <div style={{padding: '0px 0px'}} >
            <div className={classes.contentArea} >
                {loading ? (<p style={{color: 'white'}} >Loading post...</p>) : (
                <>
                <button className={classes.category} >{postData.categories}</button>
                <img src={postData.image} style={{width: '100%', height: '230px'}} alt={postData.title} />
                <div className={classes.postTitle} >
                    <h3 className={classes.titleText} >{postData.title}</h3>
                </div>
                <div className={classes.authorBox} >
                    <p><AccessTimeIcon className={classes.timeIcon} />{postData.date}</p>
                    <p style={{marginLeft: '20px'}} ><PersonIcon className={classes.authorIcon} />{postData.author}</p>
                </div>
                <div className={classes.commentLine} >
                    <p style={{color: 'white'}} >Posted by <strong>{postData.author}</strong></p>
                    <p style={{color: 'green', marginLeft: '-200px', display: 'flex', alignItems: 'center'}} ><ChatBubbleIcon className={classes.authorIcon} /><span>{postData.comments}</span></p>
                </div>
                <div className={classes.socials} >
                    <InlineShareButtons
                    config={{
                        alignment: 'center',  // alignment of buttons (left, center, right)
                        color: 'social',      // set the color of buttons (social, white)
                        enabled: true,        // show/hide buttons (true, false)
                        font_size: 8,        // font size for the buttons
                        labels: 'cta',        // button labels (cta, counts, null)
                        language: 'en',       // which language to use (see LANGUAGES)
                        networks: [           // which networks to include (see SHARING NETWORKS)
                        'whatsapp',
                        'messenger',
                        'facebook',
                        'twitter'
                        ],
                        padding: 12,          // padding within buttons (INTEGER)
                        radius: 4,            // the corner radius on each button (INTEGER)
                        show_total: true,
                        size: 30,             // the size of each button (INTEGER)
            
                        // OPTIONAL PARAMETERS
                        url: 'https://naijamediamp3-site.web.app', // (defaults to current url)
                        image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
                        description: 'custom text',       // (defaults to og:description or twitter:description)
                        title: 'custom title',            // (defaults to og:title or twitter:title)
                        message: 'custom email text',     // (only for email sharing)
                        subject: 'custom email subject',  // (only for email sharing)
                        username: 'custom twitter handle' // (only for twitter sharing)
                    }}
        />
                </div>
                <div className={classes.featuredImg} >
                    <img src={postData.image} style={{width: '100%', height: '230px', marginTop: '50px'}} alt={postData.title} />
                </div>
                <div className={classes.postContent} >
                    <p>{postData.content}</p>
                </div>
                <div>
                {postData.video ? (
                    <>
                    <ReactPlayer url={postData.video} controls width='100%' />
                    <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                        <GetAppIcon style={{color: 'green'}} />
                        <a className={classes.downloadBtn} href={postData.video} download>Download Video</a>
                    </div>
                    </>
                ) : (null)}
                </div>
                <div className={classes.musicDiv} >
                {postData.music ? (
                <>
                <div style={{display: 'flex', justifyContent: 'center'}} >
                <ReactAudioPlayer
                    src={postData.music}
                    controls
                    volume={0.5}
                    style={{color: 'green', width: '100%'}}
                />
                </div>
                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                    <GetAppIcon style={{color: 'green'}} />
                    <a className={classes.downloadBtn} href={postData.music} download>Download Music</a>
                </div>
                </>
                ) : (null)}
                </div>
                <div style={{width: '100%', borderLeft: 'none', borderRight: 'none', borderTop: '1px dotted green', marginBottom: '50px'}} ></div>
                <div className={classes.commentSection} >
                    <h3 style={{textAlign: 'center', color: 'white', marginBottom: '20px'}} >POST YOUR COMMENT</h3>
                    <form onSubmit={handleCommentSubmit} action="" style={{display: 'flex', justifyContent: 'center'}}>
                    <div>
                    <p style={{color: 'white'}} >Name</p>
                    <input className={classes.input} type="text" value={values.name} onChange={handleChange('name')} />
                    <p style={{color: 'white'}} >Comment</p>
                    <textarea aria-multiline rows={6} className={classes.textarea} type="text" value={values.comment} onChange={handleChange('comment')} />
                    <div style={{display: 'flex', justifyContent: 'center'}} >
                        <button type='submit' className={classes.postBtn} >{commentLoading ? 'Posting...' : 'Post Comment'}</button>
                    </div>
                    </div>
                    </form>
                </div>
                <div>
                    {!postComments.empty ? (
                    <>
                        {postComments.map(comment => (
                        <div style >
                        <label style={{color: 'white'}} htmlFor="">{postComments.name}:</label>
                        <p style={{color: 'white'}} >{postComments.comment}</p>
                    </div>
                    ))}
                    </>
                    ) : (null)}
                </div>
                </>
                )}
            </div>
            </div>
        </div>
    )
}

export default Content
