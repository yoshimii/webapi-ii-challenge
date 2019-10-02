const express = require('express');

const Posts = require('./db.js');

const router = express.Router();

//Posts new post to list of posts. Posts posts in posts.

router.post('/', (req, res) => {
    const postData = req.body;

    if(!postData.title || !postData.contents) {
        res.status(400).json({ message: 'please include a title/contents'})
    } else {
        Posts.insert(postData)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error adding post' })
        })
    }

})

//Posts comment to post of specified ID

router.post('/:id/comments', (req, res) => {
    const commentData = req.body;
    const id = req.params.id;
        if(!commentData.text) {
            console.log(req)
            res.status(404).json({ message: 'The post with the specified ID does not exist' })            
        } else {
            console.log(commentData)
            Posts.insertComment(commentData)
            .then(post => {
                res.status(201).json(post);
            })
            .catch(err => {
                res.status(500).json({ message: 'Error adding post' })
            })
        }

    })

// })

//Get all posts

router.get('/', (req, res) => {
    Posts.find().then(post => {
        res.json(post)
        console.log(post)
    }).catch(err => {
        err.status(500).json({ message: 'The posts\' information could not be retrieved' })
    })
})

//Get posts by ID

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Posts.findById(id).then(post => {
        res.status(200).json(post)
        console.log(post)
    }).catch(err => {
        res.status(500).json({ message: 'The posts information could not be retrieved' })
    })
})

//Get all comments of a post found by ID

router.get('/:id/comments', (req, res) => {
    const PostId = req.params.id;
    Posts.findPostComments(PostId).then(comments => {
        if(comments.length == 0) {
            console.log(req, res)

            res.status(404).json({ message: 'The post with the specified ID does not exist' })
        } else{
            console.log(req, res)
            res.status(200).json(comments)
            console.log(comments)
        }

    })
})

//Deletes post by id

router.delete('/:id', (req, res) =>{
    const id = req.params.id;

    Posts.remove(id).then(post => {
        res.status(204).json(req.body)
    })
})

// Updates a post by id

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    Posts.update(id, body).then(post => {
        if(!body.title) {
            res.status(404).json({ message: 'The post with the specified ID does not exist' })
        } else {
            res.status(200).json(body)
        }
        
    })
})

module.exports = router;