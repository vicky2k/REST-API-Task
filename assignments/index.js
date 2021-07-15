const express = require('express');
const app = express();
const posts = require('./posts.json');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.post('/', function (req, res) {
  res.send('This is a Post Request');
});

// Route to get all Posts
app.get('/posts', (req, res) => {
  return res.json({ posts });
});

// Route To Create New Post
app.post('/posts', (req, res) => {
  console.log(req.body.newPost);
  posts.push(req.body.newPost);
  //console.log({ posts })
  // using the fs module writefile to update posts.json
  let stringedData = JSON.stringify(posts, null, 2);
  fs.writeFile('posts.json', stringedData, function (err) {
    if (err) {
      return res.status(500).json({ message: err });
    }
  });
  return res.status(200).json({ message: 'new post created' });
});

// Route to Fetch Single Post
app.get('/posts/:id', (req, res) => {
  // fetch req.params.id
  let id = req.params.id;
  // find post with id
  let foundPost = posts.find((post) => {
    return String(post.id) === id;
  });
  if (foundPost) {
    return res.status(200).json({ post: foundPost });
  } else {
    return res.status(404).json({ message: 'post not found' });
  }
  //console.log(foundPost);
});

// Route to update a Single Post
app.put('/posts/:id', (req, res) => {
  let id = req.params.id;
  // update post with id using array slice method
  let thrashPost = posts.splice((post) => {
    return String(post.id) === id;
  });
  // return post object or response
  // return a 4040 error if post is not found
  if (thrashPost) {
    return res.status(200).json({ post: thrashPost });
  } else {
    return res.status(404).json({ message: 'post not found' });
  }
  //console.log(thrashPost);
});

app.listen(3000, function () {
  console.log('Server is up and Running');
});
