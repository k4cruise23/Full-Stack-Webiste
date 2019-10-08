require('dotenv').config()
const express = require('express')
const session = require ('express-session')
const massive = require('massive')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const authCtrl = require('./Controllers/authController')
const postCtrl = require('./Controllers/postController')
const socket = require('socket.io')

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

const server = app.listen(SERVER_PORT, () => console.log(`Listening on server port ${SERVER_PORT}`))
//allows web sockets to communicate over the server
const io = socket(server)

//when a component has 'io.connect', it connects to the socket on server and lets this block run and listens for socket messages
io.on('connection', socket => {
    console.log('socket connected')
    
    //global sockets
    socket.on('broadcast to global socket', data => {
        console.log('global broadcast hit')
        socket.broadcast.emit('global response', data)
    })
    
    socket.on('emit to global socket', data => {
        console.log.log('global emit hit')
        socket.emit('global response', data)
    })
    
    socket.on('blast to global socket', data => {
        console.log('global blast hit')
        io.sockets.emit('global response', data)
    })
    
    socket.on('typing', data => {
        if (data.room !== 'global'){
            socket.to(data.room).broadcast.emit('typing')
        } else {
            socket.broadcast.emit('typing')
        }
    })
    
    socket.on('stopped typing', data => {
        if (data.room !== 'global') {
            socket.to(data.room).broadcast.emit('stopped typing')
        }
        socket.broadcast.emit('stopped typing')
    })
    
    //room sockets
    socket.on('join room', data => {
        socket.join(data.room)
        console.log(`user joined room ${data.room}`)
    })
    
    socket.on('broadcast to room socket', data => {
        console.log(`emit to room ${data.room}`)
        socket.to(data.room).broadcast.emit('room response', data)
    })
    
    socket.on('emit to room socket', data => {
        console.log(`emit to room ${data.room}`)
        socket.emit('room response', data)
    })
    
    socket.on('blast to room socket', data => {
        console.log(`blast to room ${data.message}`)
        io.to(data.room).emit('room response', data)
    })
})
    
    
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
    console.log('db set')
})