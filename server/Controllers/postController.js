module.exports = {
    getPost: async (req, res) => {
        let {post_id} = req.params
        const db = req.app.get('db')
        const foundPost = await db.get_post([post_id])
        req.session.currentPost = post_id
        return res.status(200).send(foundPost[0])
    },

    getPosts: async (req, res) => {
        const db = req.app.get('db')
        const foundPosts = await db.get_all_posts()
        return res.status(200).send(foundPosts)
    },

    addPost: async (req, res) => {
        let {post_id, item, price, content, image_url} = req.body
        // console.log(req.body)
        const db = req.app.get('db')
        const addedPosts = await db.add_post([post_id,item, price, content, image_url])
        return res.status(200).send(addedPosts)
    },
    deletePost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        // console.log(req.params)
        const remove = await db.delete_post([id])
        res.status(200).send(remove)
    },
    updatePost: async (req, res) => {
        const db = req.app.get('db')
        const {item, price, content, image_url} = req.body
        const {id} = req.params
        console.log(req.params)
        console.log(req.body)
        const updatedPost = await db.update_post([id, item, price, content, image_url])
        res.status(200).send(updatedPost)
    }
}

