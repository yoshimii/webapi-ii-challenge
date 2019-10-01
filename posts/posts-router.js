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

router.post('/:id/comment', (req, res) => {//Post 2 to /api/posts/:id
    const commentData = req.body;
    const id = params.match.id;

    if(!id) {
        res.status(404).json({ message: 'The post with the specified ID does not exist' })
    } else {
        Posts.insertComment(commentData)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error adding post' })
        })
    }

})

router.get('/', (req, res) => {
    Posts.find().then(post => {
        res.json(post)
    })
})

module.exports = router;