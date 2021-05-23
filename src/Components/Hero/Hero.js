import React from 'react';
import { makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    hero: {
        backgroundImage: 'url("hero4.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        backgroundPosition: 'center'
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100vh',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.514)'
    },
});

function Hero() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.hero} >
                <div className={classes.overlay} >

                </div>
            </div>
        </div>
    )
}

export default Hero
