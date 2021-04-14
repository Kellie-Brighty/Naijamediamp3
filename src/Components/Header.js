import React, {useState, useEffect} from 'react';
import { AppBar, Hidden, makeStyles, Toolbar, Drawer, List, ListItem, Modal } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles({

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
    // const [modalStyle] = useState(getModalStyle);

    

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
        <div style={{backgroundColor: 'black', height: '300px', margin: '0px auto', width: '80%', marginTop: '100px', }} className={classes.paper}>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
      );

    return (
        <div>
            <AppBar position="fixed"  className={classes[navRef.current]}>
                <Toolbar style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
                    <div>
                    <MenuIcon onClick={handleDrawerOpen} />
                    <Drawer
                        className={classes.drawer}
                        open={open}
                        anchor='left'
                        onClose={handleDrawerClose}
                    >
                        <List>
                            <ListItem button>
                                <h5 classname={classes.btnOneText}>Home</h5>
                            </ListItem>
                            <ListItem button onClick={handleModalOpen} >
                                <h5 classname={classes.btnOneText}>Login</h5>
                            </ListItem>
                            <ListItem button onClick={handleDrawerClose} >
                            <ChevronLeftIcon/> Close
                            </ListItem>
                        </List>
                    </Drawer>
                    </div>
                    <div >
                        <h2>NaijaMediaMp3</h2>
                    </div>
                    <div></div>
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
