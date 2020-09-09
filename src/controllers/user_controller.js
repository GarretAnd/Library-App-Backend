/* eslint-disable consistent-return */
import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  console.log(req.body);
  const { email } = req.body;
  const { password } = req.body;
  const { username } = req.body;

  if (!email || !password || !username) {
    return res.status(422).send('You must provide an email, username, and password!');
  }

  // here you do a mongo query to find if a user already exists with this email.
  User.find({ email })
    .then((result) => {
      if (result.length !== 0) { // if user exists then return an error. If not, use the User model to create a new user.
        return res.send('Error, User already exists!');
      }

      const u = new User();
      console.log('user object created');
      u.email = email;
      u.username = username;
      u.password = password;
      console.log('saving user object...');
      u.save() // Save the new User object
        .then((result2) => {
          console.log('user object saved');
          res.send({ token: tokenForUser(u) }); // and then return a token same as you did in in signin
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    });
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
