import React, {useState, useEffect} from 'react';
import { AppBar, makeStyles, Toolbar, Drawer, List, ListItem, Modal, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link, useHistory } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';
import HomeIcon from '@material-ui/icons/Home';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import VideocamIcon from '@material-ui/icons/Videocam';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LockIcon from '@material-ui/icons/Lock';
// import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import StringData from '../util/StringData';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {auth, db} from '../util/Firebase';
import DashboardIcon from '@material-ui/icons/Dashboard';

import './header.css'

const useStyles = makeStyles({
    appBar: {
        backgroundColor: 'transparent',
        transition: '.5s',
        boxShadow: 'none',
        '& img': {

        },
    },
    appBarScroll: {
        background: 'linear-gradient(green, black)',
        transition: '.5s',
        '& h1': {
            fontSize: '10px',
            transition: '.5s'
        },
        '& MenuIcon': {
            marginTop: '40px'
        }
    },
    toolbar: {
        paddingBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        maxWidth: '100%',
        width: '80px',
        height: '80px'
    },
    logoText: {
        color: 'white',
        fontSize: '15px',
        transition: '.5s',
        marginTop: '-15px'
    },
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
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.514)'
    },
    menuIcon: {
        marginTop: '-5px'
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
    userGroup: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        width: '30px',
        height: '30px',
        marginRight: '5px'
    },
    drawer: {
        zIndex: 100
    }
});

// const rand = () => {
//     return Math.round(Math.random() * 20) - 10;
//   }
  
//   const getModalStyle = () => {
//     const top = 50 + rand();
//     const left = 50 + rand();
//   }

function Header() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const userName = localStorage.getItem(StringData.UserName);
    const history = useHistory();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const photoUrl = localStorage.getItem(StringData.PhotoUrl)
    // const [modalStyle] = useState(getModalStyle);
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

    const signOut = () => {
        auth.signOut()
        localStorage.clear();
        setOpen(false)

        history.push('/')
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
                        setOpen(false);
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

    

    const handleDrawerOpen = () => {
        setOpen(true)
      }
      const handleDrawerClose = () => {
        setOpen(false)
      }
      const handleModalClose = () => {
        setModalOpen(false)
      }
      const handleModalOpen = () => {
        setModalOpen(true)
        setOpen(false)
      }

    const [navBackground, setNavBackground] = useState('appBar')
    const navRef = React.useRef()
    navRef.current = navBackground
    useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 50
            if (show) {
                setNavBackground('appBarScroll')
            } else {
                setNavBackground('appBar')
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const body = (
        <div style={{backgroundColor: 'rgb(0, 26, 36)', margin: '0px auto', width: '80%', marginTop: '80px', display: 'flex', justifyContent: 'center', padding: '50px 10px' }} className={classes.paper}>
        <div>
            <div onClick={handleModalClose} style={{position: 'absolute', top: '6em'}} >
                <CancelIcon style={{color: 'green', marginLeft: '230px', }}  />
            </div>
            <div className={classes.signInText}>
                <h4 style={{fontFamily: 'Montserrat Alternates', padding: '5px 15px' }} >Sign In</h4>
            </div>
            <div className='logoBox' >
                <h4 style={{fontFamily: 'Montserrat Alternates', padding: '5px 15px' }} >NAIJAMEDIAMP3</h4>
            </div>
         <form action="" style={{display: 'block', marginTop: '20px' }} onSubmit={signIn} >
                        <div style={{display: 'flex', justifyContent: 'center'}} >
                            <div>
                            <h5 className={classes.label} >Email</h5>
                            <input type="email" placeholder='yourmail@mail.com' className={classes.input} value={values.email} onChange={handleChange('email')} />
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <div>
                            <h5 className={classes.label} >Password</h5>
                            <input type="password" placeholder='123456#*^' className={classes.input} value={values.password} onChange={handleChange('password')} />
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
        <div>
            <AppBar position="fixed"  className={classes[navRef.current]}>
                <Toolbar className={classes.toolbar} >
                   <Link to='/' >
                   <div>
                   <img className={classes.logo} src="logo.png" alt="NaijaMediaMp3 Logo" />
                   <h1 className={classes.logoText} >NAIJAMEDIAMP3</h1>
                   </div>
                   </Link>
                   <div className={classes.userGroup} >
                        <Avatar className={classes.avatar} src={photoUrl} alt='userImage' />
                       <h4>Hi, {userName ? (userName) : 'friend'}</h4>
                   </div>
                   <MenuIcon className={classes.menuIcon} onClick={handleDrawerOpen} />
                   <Drawer
                        className={classes.drawer}
                        open={open}
                        anchor='right'
                        onClose={handleDrawerClose}
                    >
                        <List>
                            <ListItem button>
                               <div>
                               <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}} >
                                <HomeIcon />
                               <h5 style={{fontSize: '20px', marginTop: '0px'}} classname={classes.btnOneText}>Home</h5>
                               </div>
                                <div style={{height: '1px', margin: '0px auto', padding: '0px 50px', backgroundColor: 'black'}} ></div>
                               </div>
                            </ListItem>
                            <ListItem button >
                                <div>
                                <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}} >
                                <MusicNoteIcon />
                               <h5 style={{fontSize: '20px', marginTop: '0px'}} classname={classes.btnOneText}>Music</h5>
                               </div>
                                <div style={{height: '1px', margin: '0px auto', padding: '0px 50px', backgroundColor: 'black'}} ></div>
                                </div>
                            </ListItem>
                            <ListItem button >
                                <div>
                                <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}} >
                                <VideocamIcon />
                               <h5 style={{fontSize: '20px', marginTop: '0px'}} classname={classes.btnOneText}>Video</h5>
                               </div>
                                <div style={{height: '1px', margin: '0px auto', padding: '0px 50px', backgroundColor: 'black'}} ></div>
                                </div>
                            </ListItem>
                            <ListItem button >
                                <div>
                                <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}} >
                                <EqualizerIcon />
                               <h5 style={{fontSize: '20px', marginTop: '0px'}} classname={classes.btnOneText}>Mix tape</h5>
                               </div>
                                <div style={{height: '1px', margin: '0px auto', padding: '0px 50px', backgroundColor: 'black'}} ></div>
                                </div>
                            </ListItem>
                            <ListItem button >
                                <div>
                                <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}} >
                                <YouTubeIcon />
                               <h5 style={{fontSize: '20px', marginTop: '0px'}} classname={classes.btnOneText}>NMMP3 TV</h5>
                               </div>
                                <div style={{height: '1px', margin: '0px auto', padding: '0px 50px', backgroundColor: 'black'}} ></div>
                                </div>
                            </ListItem>
                            {userName && (
                                <Link style={{color: 'black'}} to={`/my-account/${userName}`} >
                                    <ListItem button >
                                    <div>
                                    <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}} >
                                    <DashboardIcon />
                                <h5 style={{fontSize: '20px', marginTop: '0px'}} classname={classes.btnOneText}>MY DASHBOARD</h5>
                                </div>
                                    <div style={{height: '1px', margin: '0px auto', padding: '0px 50px', backgroundColor: 'black'}} ></div>
                                    </div>
                                    </ListItem>
                                </Link>
                            )}
                            {userName ? (
                               <ListItem button onClick={signOut}>
                                <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}} >
                                 <ExitToAppIcon />
                                <h5 style={{fontSize: '20px', marginTop: '0px'}} classname={classes.btnOneText}>Log out</h5>
                                </div>
                               </ListItem>
                            ) : (
                                <ListItem button onClick={handleModalOpen} >
                                <div>
                                <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}} >
                                <LockIcon />
                               <h5 style={{fontSize: '20px', marginTop: '0px'}} classname={classes.btnOneText}>Login</h5>
                               </div>
                                <div style={{height: '1px', margin: '0px auto', padding: '0px 50px', backgroundColor: 'black'}} ></div>
                                </div>
                            </ListItem>
                            )}
                        </List>
                    </Drawer>
                </Toolbar>
            </AppBar>

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

export default Header;
