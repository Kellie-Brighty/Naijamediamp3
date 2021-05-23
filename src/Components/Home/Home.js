import React from 'react'
import { Hidden } from '@material-ui/core';

import Header from '../Header/Header';
import Post from '../Posts/Post';
import Hero from '../Hero/Hero';

// const useStyles = makeStyles({

// });

function Home() {
    // const classes = useStyles();

    return (
        <div>
            <Hidden mdUp>
               <Header />
               <Hero />
               <Post />
            </Hidden>
        </div>
    )
}

export default Home
