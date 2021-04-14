import React, {useEffect} from 'react'
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Hidden, makeStyles } from '@material-ui/core';

import Header from './Header';

const useStyles = makeStyles({

});

function Home() {
    const classes = useStyles();

    return (
        <div>
            <Hidden mdUp>
               <Header />
            </Hidden>
        </div>
    )
}

export default Home
