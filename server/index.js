require('dotenv').config()
const express = require('express')
const session = require ('express-session')
const massive = require('massive')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const authCtrl = require('./Controllers/authController')
const postCtrl = require('./Controllers/postController')

const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 60
    }
}))

//Auth Endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)

//Post endpoints
app.get('/api/post/getAll', postCtrl.getPosts)
app.get('/api/post/:id', postCtrl.getPost)
app.post('/api/posts', postCtrl.addPost)
app.delete('/api/post/:id', postCtrl.deletePost)
app.put('/api/post/:id', postCtrl.updatePost)




massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`Listening on server port ${SERVER_PORT}`))
})