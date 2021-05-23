import React, { useState, createContext } from 'react';
// import {db} from './util/Firebase'

export const PostContext = createContext();

export const PostProvider = (props) => {
    const [postData, setPostData] = useState([]);
    // useEffect(() => {
    //     db.collection('posts').get().then(snapshot => {
    //         snapshot.forEach(doc => {
    //             postData.push(doc.data());
    //             console.log(postData)
    //         })
    //     }).catch(err => {
    //         console.error(err);
    //     })
    // }, []);

    return (
        <PostContext.Provider value={[postData, setPostData]} >
            {props.children}
        </PostContext.Provider>
    )
}

