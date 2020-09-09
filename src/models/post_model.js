import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({ // Makes model with different fields and their types
  title: String,
  content: String,
  coverUrl: String,
  tags: String,
  username: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create model class
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
