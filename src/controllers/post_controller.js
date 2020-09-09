import Post from '../models/post_model';

export const createPost = (req, res) => { // Makes a new Post Object, set's the needed data, and saves to DB
  console.log(req);
  const p = new Post();
  p.title = req.body.title;
  p.username = req.body.username;
  p.coverUrl = req.body.coverUrl;
  p.tags = req.body.tags;
  p.content = req.body.content;
  p.save() // Only time you need to save is when you're adding to the
    .then((result) => {
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => { // Finds all the posts in the DB then returns them
  Post.find({})
    .then((result) => {
      res.send(result);
    });
};

export const getPost = (req, res) => {
  console.log(req.params);
  Post.findById(req.params.postID) // requires a string
    .then((result) => {
      console.log(result);
      res.send(result);
    }); // Finds specific post associated with ID and returns it
};

export const deletePost = (req, res) => { // Finds post by ID and deletes it, then saves the DB.
  Post.findByIdAndDelete({ _id: req.params.postID })
    .then((result) => { // ID stored in paramaters of request, data sent with request stored in req.body
      res.send(`Deleted Post: ${result}`);
    })
    .catch((error) => { // Throws Error if Needed
      console.log(error);
    });
};

export const updatePost = (req, res) => { // Can pass in ID as object or string
  Post.findByIdAndUpdate(req.params.postID, req.body)
    .then((result) => {
      res.send(`Updated Post: ${result}`);
    })
    .catch((error) => { // Throws Error if Needed
      console.log(error);
    });
};
