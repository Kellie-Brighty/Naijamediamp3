const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require('express')

admin.initializeApp();
const app = express()

app.get('/posts', (req, res) => {
    admin.firestore().collection('posts').get().then(data => {
        let posts = [];
        data.forEach(doc => {
            posts.push(doc.data());
        });
        return res.json(posts)
    }).catch(err => {
        console.error(err);
    })
})

exports.api = functions.https.onRequest(app);