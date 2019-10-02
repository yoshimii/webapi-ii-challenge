const express = require('express');

const Posts = require('./db.js');

const router = express.Router();

router.post('/', (req, res) => {//Post 1 to /api/posts
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

router.post('/:id/comments', (req, res) => {//Post 2 to /api/posts/:id
    const commentData = req.body;
    const id = req.params.id;

    // if(!commentData.post_ID) {
    //     res.status(404).json({ message: 'The post with the specified ID does not exist' })
    // } else {
        Posts.insertComment(commentData)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error adding post' })
        })
    })

// })

//Get all posts

router.get('/', (req, res) => {
    Posts.find().then(post => {
        res.json(post)
        console.log(post)
    })
})

//Get posts by ID

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Posts.findById(id).then(post => {
        res.status(200).json(post)
        console.log(post)
    })
})

//Get all comments of a post found by ID

router.get('/:id/comments', (req, res) => {
    const PostId = req.params.id;
    Posts.findPostComments(PostId).then(comments => {
        res.status(200).json(comments)
        console.log(comments)
    })
})

module.exports = router;