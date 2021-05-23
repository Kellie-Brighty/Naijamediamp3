import React, { useEffect, useState } from 'react';
import {Avatar, makeStyles} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Aos from 'aos';
import 'aos/dist/aos.css';
import {Link, useLocation} from 'react-router-dom';
import {db} from '../util/Firebase';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// import {PostContext} from '../Context'


const useStyles = makeStyles({
    postBody: {
        marginTop: '30px',
        padding: '0px 10px'
    },
    post: {
        display: 'flex',
        margin: '20px auto',
        color: 'white',
        border: '2px solid green',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: 'black'
    },
    postHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    postAvatar: {
        width: '100px',
        height: '100px',
        borderTopLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        border: '1px solid white'
    },
    postRight: {
        marginLeft: '30px',
        width: '200px'
    },
    postTitle: {
        margin: '10px 0px',
        fontSize: '15px'
    },
    postCategory: {
        borderRadius: '5px',
        padding: '5px',
        backgroundColor: 'gold',
        color: 'black',
        fontWeight: 'bold'
    },
    postDate: {
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',

    },
    eye: {
        display: 'flex',
        alignItems: 'center'
    },
    eyeIcon: {
        fontSize: '13px'
    },
    input: {
        padding: '10px 20px',

    }
});

// const postData = [
//     {
//         image: 'hero1.jpg',
//         title: 'Sample Title',
//         categories: 'Music',
//         date: '14th Jan 2021',
//         views: '2k views',
//         idx: '1'
//     },
//     {
//         image: 'hero2.jpg',
//         title: 'Sample Title2',
//         categories: 'Video',
//         date: '14th Jan 2021',
//         views: '100 views',
//         idx: '2'
//     },
//     {
//         image: 'hero3.jpg',
//         title: 'Sample Title3',
//         categories: 'NMMP3 TV',
//         date: '14th Jan 2021',
//         views: '500 views',
//         idx: '3'
//     },
// ]

function Post() {
    const classes = useStyles();
    const [postData, setPostData] = useState();
    const location = useLocation();

    console.log(location)
    

    useEffect(() => {
        Aos.init({
            duration: 1000
        })
    })
    useEffect(() => {
        db.collection('posts').orderBy('createdAt', 'desc').get().then(doc => {
            let posts = [];
            doc.forEach(data => {
                posts.push(data.data())
            })
            console.log(posts)
            setPostData(posts)
        })
    }, [])

    // const routeToContent = () => {
    //     db.collection('posts').
    //     history.push('/post-content')
    // }

    
    
    return (
            <>
            {!postData ? 
                (
                    <>
                    <div style={{padding: '0px 20px'}} >
                    <SkeletonTheme color="green" highlightColor="#444">
                        <p>
                            
                            <Skeleton circle={true} height={80} width={80} />
                            <Skeleton height={26} width={`60%`} style={{marginTop: '20px'}} />
                            <Skeleton height={10} width={`60%`} style={{marginLeft: '10px'}}/>
                            <Skeleton height={10} width={`100%`} style={{marginLeft: '10px'}}/>
                           
                            
                        </p>
                    </SkeletonTheme>
                    </div>
                    <div style={{padding: '0px 20px'}} >
                    <SkeletonTheme color="green" highlightColor="#444">
                        <p>
                            
                            <Skeleton circle={true} height={80} width={80} />
                            <Skeleton height={26} width={`60%`} style={{marginTop: '20px'}} />
                            <Skeleton height={10} width={`60%`} style={{marginLeft: '10px'}}/>
                            <Skeleton height={10} width={`100%`} style={{marginLeft: '10px'}}/>
                           
                            
                        </p>
                    </SkeletonTheme>
                    </div>
                    </>
                ) : (
                    <>
                            {postData.map(post => {
                                return(
                                    <div className={classes.postBody} key={post.title} >
                                        <div data-aos='zoom-in-up' className={classes.post} >
                                            <div className={classes.postLeft} >
                                                <Avatar src={post.image} alt={post.image} variant='square' className={classes.postAvatar} />
                                            </div>
                                            <div className={classes.postRight}>
                                                <div className={classes.postHeader} >
                                                    <p className={classes.postCategory}>{post.categories}</p>
                                                </div>

                                                <Link to={`/${post.title}`} >
                                                <div className={classes.postTitle}>
                                                    <h3>{post.title}</h3>
                                                </div>
                                                </Link>
                                                
                                                <div className={classes.postDate} >
                                                    <p>{post.date}</p>
                                                    <div className={classes.eye} ><VisibilityIcon className={classes.eyeIcon} />{post.views}</div>
                                                </div>   
                                            </div>
        
                                        </div>
                                    </div>
                                )
                        })
                    }
                    </>
                    
                )
            }
        </>
    )
    
}

export default Post
