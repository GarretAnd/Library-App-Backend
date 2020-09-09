/* eslint-disable consistent-return */
import mongoose, { Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const UserSchema = new Schema({ // Makes model with different fields and their types
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  username: { type: String },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

UserSchema.pre('save', function beforeyYourModelSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const User = this;
  if (!User.isModified('password')) return next();

  // TODO: do stuff here
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(User.password, salt);
  User.password = hash;

  console.log('password salted');
  // when done run the **next** callback with no arguments
  // call next with an error if you encounter one
  return next();
});

//  note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  const result = bcryptjs.compareSync(candidatePassword, this.password);

  if (result) {
    return callback(null, result);
  } else {
    return callback('Wrong Password!');
  }
  // return callback(null, comparisonResult) for success
  // or callback(error) in the error case
};

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
