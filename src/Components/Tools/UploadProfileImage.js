import React, { Component } from 'react';
import {storage, db} from '../util/Firebase';
import StringData from '../util/StringData'
import { createStyles, withStyles } from '@material-ui/styles';
import { Avatar } from '@material-ui/core';

const styles = theme => createStyles({
    input: {
        position: 'absolute',
        width: '40px',
        height: '40px',
        left: '0px',
        outline: '0',
        zIndex: '-1',
        opacity: 1
    },
    avatar: {
        width: '200px',
        heighty: '200px'
    }
})

export class UploadProfileImage extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            documentKey: localStorage.getItem(StringData.FirebaseDocumentId),
            id: localStorage.getItem(StringData.ID),
            name: localStorage.getItem(StringData.FirstName),
            lastName: localStorage.getItem(StringData.LastName),
            aboutMe: localStorage.getItem(StringData.Description),
            photoUrl: localStorage.getItem(StringData.PhotoUrl),
            message: '',
        }
        this.newPhoto = null
        this.newPhotoUrl = ''
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);

    }

    handleImageChange = (e) => {
        if(e.target.files && e.target.files[0]) {
            const prefixFileType = e.target.files[0].type.toString();
            if(prefixFileType.indexOf(StringData.PREFIX_IMAGE) !== 0 ) {
                return
            }
            this.newPhoto = e.target.files[0];
            this.setState({
                photoUrl: URL.createObjectURL(e.target.files[0]),
                message: 'photoUrl has been changed'  
            })
            console.log(URL.createObjectURL(e.target.files[0]))
            console.log(this.state.message)
        }else{
            return
        }
    }
    
    uploadImage = (e) => {
        e.preventDefault();
        this.setState({
            loading: true,
            message: ''
        })
        if(this.newPhoto){
            const uploadTask = storage.ref("Profile images").child(this.state.id).put(this.newPhoto);
            uploadTask.on(StringData.UPLOAD_CHANGED, null, err => {
                this.setState({loading: false})
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    this.updateUserInfo(true, downloadURL)
                })
            }
            )
        }else{
            this.updateUserInfo(false, null)
        }
    }

    updateUserInfo = (updatedPhotoURL, downloadURL) => {

        let newinfo
        if(updatedPhotoURL) {
            newinfo = {
                URL: downloadURL
            }
        }else {
            newinfo = {}
        }
        db.collection('users').doc(this.state.documentKey).update(newinfo).then(data => {
            if(updatedPhotoURL) {
                localStorage.setItem(StringData.PhotoUrl, downloadURL)
            }
            this.setState({
                loading: false
            })
            this.setState({
                message: 'Your Image has been updated successfully!'
            })
            console.log(this.state.message)
        })
    }

    render() {
        const {loading} = this.state;
        return (
            <div style={{display: 'flex', justifyContent: 'center'}} >
                <div>
                <Avatar src={this.state.photoUrl} alt='userImage' style={{width: '200px', height: '200px'}} />
                <div style={{display: 'flex', justifyContent: 'center'}} >
                <button style={{margin: '5px 10px'}} onClick={() => {this.refInput.click()}}  >Change Image</button>
                <input 
                    ref = {el => {
                        this.refInput = el
                    }}
                    accept = 'image/*'
                    type ='file'
                    style={{
                        position: 'absolute',
                        width: '40px',
                        height: '40px',
                        left: '0px',
                        outline: '0',
                        zIndex: '-1',
                        opacity: 0
                    }}
                    onChange={this.handleImageChange}
                    />
                    <button style={{margin: '5px 10px'}} onClick={this.uploadImage} >{loading ? 'Uploading...' : 'Upload'}</button>
                </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(UploadProfileImage);
