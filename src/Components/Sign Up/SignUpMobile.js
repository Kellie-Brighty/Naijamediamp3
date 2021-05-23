import { Hidden, makeStyles, Modal } from '@material-ui/core'
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';
import HomeIcon from '@material-ui/icons/Home';
import {db, auth} from '../util/Firebase';
import StringData from '../util/StringData'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles({
    input: {
        padding: '10px 20px',
        outline: 'none',
        borderRadius: '10px',
        border: 'none',
        boxShadow: '0 0 2px 0px rgb(192, 192, 192)'
    },
    label: {
        marginTop: '20px',
        marginBottom: '10px',
        color: 'white'
    },
    signBtn: {
        padding: '10px 20px',
        color: 'white',
        backgroundColor: 'green',
        fontWeight: 'bold',
        border: 'none',
        outline: 'none',
        borderRadius: '5px',
        marginTop: '10px'
    },
    signInText: {
        textAlign: 'center',
        color: 'white'
    },
    error: {
        textAlign: 'center',
        color: 'red',
        fontSize: '12px',
        marginTop: '20px',
        maxWidth: '250px'
    },
    loading: {
        color: 'white',
        fontSize: '10px',
        position: 'relative',
    }
});

function SignUpMobile() {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        email: '',
        password: '',
        userName: ''
    });

    const handleChange = (prop) => (event) => {
        setLoading(false)
        setError(null)
        setValues({ ...values, [prop]: event.target.value });
      };

    const handleModalClose = () => {
        setModalOpen(false)
      }
      const handleModalOpen = () => {
        setModalOpen(true)
      }

      const signUp = (e) => {
          e.preventDefault();
          setLoading(true)
          setError(null)

          if(values.userName === '' || values.email === '' || values.password === '') {
              return (
                setError('No field can be left empty.'),
                setLoading(false)
              )
          }else {
                setError(null)
                auth.createUserWithEmailAndPassword(values.email, values.password).then(res => {
                        localStorage.setItem(StringData.Email, values.email);
                        localStorage.setItem(StringData.UserName, values.userName);
                        localStorage.setItem(StringData.Password, values.password);
                    db.collection('users').doc().set({
                        'userName': values.userName,
                        'email': values.email,
                        'password': values.password,
                        'id': res.user.uid
                    })
                    if(res) {
                        history.push('/');
                    }
                }).catch(err => {
                    setLoading(false)
                    console.error("Could not sign up", err)

                    if(err.message) {
                        setError(err.message)
                    }
                })
                
            
          }

         
      }

      const signIn = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null)

        if(values.email === '' || values.password === '') {
            return (
              setError('No field can be left empty.'),
              setLoading(false)
            )
        }else {
              setError(null)
              auth.signInWithEmailAndPassword(values.email, values.password).then(res => {
                let user = res.user

                if(user) {
                    db.collection('users').where('id', '==', user.uid).get().then((querySnapshot) => {
                        querySnapshot.forEach(doc => {
                            const currentData = doc.data();
                            localStorage.setItem(StringData.FirebaseDocumentId, doc.id)
                            localStorage.setItem(StringData.ID, currentData.id)
                            localStorage.setItem(StringData.UserName, currentData.userName)
                            localStorage.setItem(StringData.Email, currentData.email)
                            localStorage.setItem(StringData.Password, currentData.password)
                            
                        setModalOpen(false)
                        setLoading(false)
                        setValues({
                            email: '',
                            password: ''
                        })
                        history.push('/')
                   
                })
                    })
                }
                
              }).catch(err => {
                  setLoading(false)
                  console.error("Could not sign in", err)

                  if(err.message) {
                      setError(err.message)
                  }
              })
              
          
        }
    }

      const body = (
        <div style={{backgroundColor: 'rgb(0, 26, 36)', margin: '0px auto', width: '80%', marginTop: '50px', display: 'flex', justifyContent: 'center', padding: '50px 10px', borderRadius: '5px' }} className={classes.paper}>
        <div>
            <div onClick={handleModalClose} style={{position: 'absolute', top: '4em'}} >
                <CancelIcon style={{color: 'green', marginLeft: '230px', }}  />
            </div>
            <div className={classes.signInText} >
                <h4 style={{fontFamily: 'Montserrat Alternates', padding: '5px 15px' }} >Sign In</h4>
            </div>
            <div className='logoBox' >
                <h4 style={{fontFamily: 'Montserrat Alternates', padding: '5px 15px' }} >NAIJAMEDIAMP3</h4>
            </div>
         <form action="" style={{display: 'block', marginTop: '20px' }} onSubmit={signIn} >
                        <div style={{display: 'flex', justifyContent: 'center'}} >
                            <div>
                            <h5 className={classes.label} >Email</h5>
                            <input onChange={handleChange('email')} type="email" placeholder='yourmail@mail.com' className={classes.input} value={values.email} />
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <div>
                            <h5 className={classes.label} >Password</h5>
                            <input onChange={handleChange('password')} type="password" placeholder='123456#*^' className={classes.input} value={values.password} />
                            </div>
                        </div>
                        <div style={{textAlign: 'right', marginTop: '20px'}} >
                            <Link style={{textDecoration: 'none'}} to='/forgotPassword' >
                                <p style={{color: 'green', marginRight: '10px', fontSize: '10px' }} >Forgot Password?</p>
                            </Link>
                        </div>
                        {error ? (<p className={classes.error} >{error}</p>) : (null)}
                        <div style={{display: 'flex', justifyContent: 'center'}} >
                        {loading ? (<button type='submit' className={classes.signBtn} >Signing in...</button>) : (<button type='submit' className={classes.signBtn} >Sign in</button>)}
                        </div>
                    </form>

                    <div style={{marginTop: '40px'}} >
                        <p style={{color: 'white', fontSize: '12px', textAlign: 'center'}} >Don't have an account? <Link style={{textDecoration: 'none', color: 'green'}}  to='/sign-up' >Sign Up</Link></p>
                        <p style={{fontSize: '12px', color: 'green', marginTop: '10px'}} ><Link style={{textDecoration: 'none', color: 'green'}} to='/' >Privacy Policy</Link> | <Link style={{textDecoration: 'none', color: 'green'}} to='/' >Terms and Conditions</Link></p>
                    </div>
            </div>
        </div>
      );


    return (
        <>
        <Hidden mdUp>
            <div style={{backgroundColor: 'rgb(0, 26, 36)' }} >
                <div style={{margin: '0px auto', display: 'flex', justifyContent: 'center', height: '100vh', paddingTop: '50px' }} >
                    <div>
                        <Link to='/' >
                        <div style={{display: 'flex', justifyContent: 'center'}} ><HomeIcon style={{fontSize: '40px', color: 'green'}} /></div>
                        </Link>
                        <div className={classes.signInText} >
                            <h4 style={{fontFamily: 'Montserrat Alternates', padding: '5px 15px' }} >Register</h4>
                        </div>
                        <div className='logoBox' >
                            <h4 style={{fontFamily: 'Montserrat Alternates', padding: '5px 15px' }} >NAIJAMEDIAMP3</h4>
                        </div>
                        <form action="" style={{display: 'block', marginTop: '20px' }} onSubmit={signUp} >
                            <div style={{display: 'flex', justifyContent: 'center'}} >
                                <div>
                                <h5 className={classes.label} >User Name</h5>
                                <input onChange={handleChange('userName')} type="text" placeholder='Username/Stage name' className={classes.input} value={values.userName} />
                                </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center'}} >
                                <div>
                                <h5 className={classes.label} >Email</h5>
                                <input onChange={handleChange('email')} type="email" placeholder='yourmail@mail.com' className={classes.input} value={values.email} />
                                </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <div>
                                <h5 className={classes.label} >Password</h5>
                                <input onChange={handleChange('password')} type="password" placeholder='123456#*^' className={classes.input} value={values.password} />
                                </div>
                            </div>
                            {error ? (<p className={classes.error} >{error}</p>) : (null)}
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}} >
                                {loading ? (<button type='submit' className={classes.signBtn} >Registering...</button>) : (<button type='submit' className={classes.signBtn} >Register</button>)}
                            </div>
                        </form>

                        <div style={{marginTop: '40px'}} >
                            <p style={{color: 'white', fontSize: '12px', textAlign: 'center'}} >Don't have an account? <p style={{color: 'green'}} onClick={handleModalOpen}  to='/sign-up' >Sign In</p></p>
                            <p style={{fontSize: '12px', color: 'green', marginTop: '10px'}} ><Link style={{textDecoration: 'none', color: 'green'}} to='/' >Privacy Policy</Link> | <Link style={{textDecoration: 'none', color: 'green'}} to='/' >Terms and Conditions</Link></p>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                        >
                    {body}
                </Modal>
        </Hidden>
        </>
    )
}

export default SignUpMobile
