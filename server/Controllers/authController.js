const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res) {
        const {username, password} = req.body
        console.log('hit')
        const db = req.app.get('db')
        const foundUser = await db.find_user([username])
        if(foundUser[0]) return res.status(200).send({message: 'Sorry, username is already taken'})
        const passwordSalt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, passwordSalt)
        const newUser = await db.register_user([username, passwordHash])
        delete newUser[0].password
        req.session.user = newUser[0]
        res.status(200).send(newUser)
    },
    async login(req, res) {
        const {username, password} = req.body
        const db = req.app.get('db')
        const foundUser = await db.find_user([username])
        if(!foundUser[0]) return res.status(200).send({message: 'Username does not exist'})
        const authPass = bcrypt.compareSync(password, foundUser[0].password)
        if (authPass) {
            delete foundUser[0].password
            req.session.user = foundUser[0]
            const allPosts = await db.get_all_posts()
            res.status(200).send({allPosts, user: foundUser[0]})
        } else return res.status(401).send({message: 'Incorrect password'})
    },
    logout (req, res) {
        req.session.destroy()
        res.status(200).send({message: 'User has been logged out'})
    },
    getUser (req, res) {
        res.status(200).send(req.session.user)
    }
}

// async register(req, res){
//     const db = req.app.get('db')
//     const {email, password, name} = req.body
//     //check to see if user has already registered
//     const user = await db.find_email(email)
//     //if they have, stop the function
//     if(user[0]) return res.status(200).send({message: 'Email already in use'})
//     //salt and hash password
//     const salt = bcrypt.genSaltSync(10)
//     const hash = bcrypt.hashSync(password, salt)
//     //store new user in database
//     const userId = await db.add_user({name, email})
//     db.add_hash({user_id: userId[0].user_id, hash}).catch(err => {
//         return res.sendStatus(503)
//     })
//     //store new user in sessions
//     req.session.user = {email, name, userId: userId[0].user_id, isAdmin: false}
//     //send session.user object to the front end
//     res.status(201).send({message: 'Logged in', user: req.session.user, loggedIn: true})

// },
// async login(req, res){
//     const db = req.app.get('db')
//     const {email, password} = req.body

//     //check if user exists (and the hash)
//     const user = await db.find_user(email)
//     //if user does not exists, send approriate response
//     if(!user[0]) return res.status(200).send({message: 'Email not found'})
//     //hash password and compare
//     const result = bcrypt.compareSync(password, user[0].hash)
//     //if hashes don't match, send response
//     if (!result) return res.status(200).send({message: 'Incorrect password'})
//     //if they do match, add user to sessions
//     const {name, is_admin:isAdmin, user_id:userId} = user[0]
//     req.session.user = {email, name, userId, isAdmin}
//     //send session.user back to front end
//     res.status(200).send({message: 'Logged in', user: req.session.user, loggedIn: true})
// }