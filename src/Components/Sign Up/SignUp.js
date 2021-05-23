import { Hidden } from '@material-ui/core'
import React from 'react'
import SignUpMobile from './SignUpMobile'

function SignUp() {
    return (
       <>
        <Hidden smDown>
            <h3>Welcome to Sign Up!</h3>
        </Hidden>

        <SignUpMobile />
       </>
    )
}

export default SignUp
