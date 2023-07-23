// Create web server

// Import modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Import data
const comments = require('./data/comments');

// Set up body-parser
app.use(bodyParser.json());

// Set up route for GET request
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Set up route for POST request
app.post('/comments', (req, res) => {
    const newComment = {
        id: comments.length + 1,
        body: req.body.body,
        postId: 1
    };
    if (!newComment.body) {
        return res.status(400).json({ msg: 'Please include a comment' });
    }
    comments.push(newComment);
    res.json(comments);
});

// Set up route for PUT request
app.put('/comments/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));
    if (found) {
        const updComment = req.body;
        comments.forEach(comment => {
            if (comment.id === parseInt(req.params.id)) {
                comment.body = updComment.body ? updComment.body : comment.body;
                res.json({ msg: 'Comment updated', comment });
            }
        });
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
});

// Set up route for DELETE request
app.delete('/comments/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));
    if (found) {
        res.json({
            msg: 'Comment deleted',
            comments: comments.filter(comment => comment.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
});

// Set up port
const port = 5000;

// Create web server
app.listen(port, () => console.log(`Server started on port ${port}`));