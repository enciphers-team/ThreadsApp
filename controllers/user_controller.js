const User = require('../models/user');
const jwt = require('jsonwebtoken');
const upload = require('../config/muter_upload');
const fs = require('fs');
const { spawn } = require('child_process');
const { exec } = require('child_process');
const Post = require('../models/post');
const Like = require('../models/like');
const Comment = require('../models/comment');
const comment = require('../models/comment');
const post = require('../models/post');
const BookMark = require('../models/BookMark');
const { getSingleUser } = require('./utils');
const deleteUser = require('../util/delete_user');

const { promisify } = require('util');
const { userInfo } = require('os');

const JWT_SECRET = process.env.JWT_KEY;

module.exports.isAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).send({
        message: 'Not authorize',
      });
    }

    const decodedToken = await promisify(jwt.verify)(token, JWT_SECRET);

    const user = await User.findOne({ _id: decodedToken._id });

    if (!user) {
      return res.status(401).send({
        message: 'User no longer exist',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    if (error.name == 'TokenExpiredError') {
      res.status(401).json({
        message: 'Jwt token expired! Login again',
        type: 'TokenExpiredError',
      });
    }
    res.status(400).send({ message: 'jwt_error' });
  }
};

module.exports.profile = function (req, res) {
  try {
    User.findById(req.params.id, function (err, user) {
      return res.json(user);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'something went wrong' });
  }
};

module.exports.update = async function (req, res) {
  try {
    let user = await User.findById(req.body.userId);

    // TODO: SSRF Challenge (URL UPLOAD)
    if (req.body.imageURL) {
      const url = req.body.imageURL;
      // const command = 'curl ' + url;
      let fileName = 'r' + user.name + Date.now();
      fileName = fileName.replace(/ /g, '');
      //
      //
      exec(
        // `sh ${__dirname}/../curl.sh ` + url + ' ' + fileName,
        `curl -o ${__dirname}/../uploads/${fileName} ${url}`,
        { maxBuffer: 1024 * 1024 * 10 },
        async (err, stdout, stderr) => {
          if (err) {
            //some err occurred

            return res.status(400).json({
              message: 'Internal Server Error! Try again ',
            });
          } else {
            const xyz = '/uploads' + '/' + fileName;

            user.profileImage = '/uploads' + '/' + fileName;

            if (req.body.password) {
              user.password = req.body.password;
            }
            if (req.body.websiteLink) {
              user.webLink = req.body.websiteLink;
            }

            if (req.body.bio) {
              user.bio = req.body.bio;
            }

            if (req.body.name) {
              user.name = req.body.name;
            }

            await user.save();
            return res.json(user);
          }
        }
      );
    } else {
      if (req.body.password != req.body.confirm_password) {
        res.status(401).json({ message: 'Check Confirm Password' });
      }
      if (req.body.websiteLink) {
        user.webLink = req.body.websiteLink;
      }
      if (req.body.password) {
        user.password = req.body.password;
      }

      if (user.name) {
        if (req.body.name) {
          user.name = req.body.name;
        }
      }

      if (req.body.bio) {
        user.bio = req.body.bio;
      }
      if (req.file) {
        const filelocation = '/uploads' + '/' + req.file.filename;
        user.profileImage = filelocation;
      }

      await user.save();
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Internal Server Error! Try again ',
    });
  }
};

/**************************************** */

module.exports.signIn = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    // if(!req.body.password || (req.body.password.length))

    if (user && user.password != req.body.password) {
      return res.status(401).json({
        message: 'Password Incorrect',
      });
    }

    if (!user || user.password != req.body.password) {
      return res.status(401).json({
        message: 'Incorrect Email',
      });
    }
    const email = user.email;
    return res.json(200, {
      message: 'Account created Succesfully',
      token: jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '86400000',
      }),
      user,
    });
  } catch (error) {
    return res.json(500, {
      message: 'Internal Server Error! Try later',
    });
  }
};

// module.exports.signIn = function (req, res) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/users/profile');
//   }
//   return res.render('user_signIn');
// };

// module.exports.signIn = function (req, res) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/users/profile');
//   }
//   return res.render('user_signIn');
// };

// get the sign up data
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.passwordConfirm) {
      return res.status(401).json({
        message: 'Confirm password should be same',
      });
    }
    //
    User.findOne({ email: req.body.email }, function (err, user) {
      if (user) {
        return res.status(401).json({
          message: 'User already exist with given email',
        });
      }

      if (!user) {
        User.create(req.body, (err, user) => {
          if (err) {
            return res.json(500, {
              message: 'All fields are required',
            });
          } else {
            return res.json(200, {
              message: 'Account created Succesfully',
              token: jwt.sign({ _id: user._id }, JWT_SECRET, {
                expiresIn: '86400000',
              }),
              user,
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: 'Internal Server Error Try again',
    });
  }
};

module.exports.getUsers = async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).sort(
    '-createdAt'
  );
  res.status(200).json({ users });
};

module.exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;

    // delete all comment of posts
    const posts = await Post.find({ $or: [{ user: id }, { sharedUser: id }] });

    for (postResult of posts) {
      let deleteBookMark = await BookMark.deleteMany({ post: postResult._id });
      for (commentId of postResult.comments) {
        const deleteCommentResult = await Comment.deleteOne({ _id: commentId });
      }
      const deleteLikesResult = await Like.deleteMany({
        postId: postResult._id,
      });
      let deleteComment = await Comment.deleteMany({ post: postResult._id });
    }

    let deleteBookMark = await BookMark.deleteMany({ user: id });
    const deleteCommentResult = await Comment.deleteMany({ user: id });

    const deletePostResult = await Post.deleteMany({
      $or: [{ user: id }, { sharedUser: id }],
    });
    const deleteLike = await Like.deleteMany({ user: id });
    const deleteAccountResult = await User.deleteOne({ _id: id });
    return res.json({ message: 'Account delete sucessfully' });
  } catch (error) {
    console.log(error);
    req.flash('error', 'Something went wrong in deleteing account! Try again');
    return res.redirect('back');
  }
};

module.exports.getUsers2 = async (req, res) => {
  try {
    const users = await User.find({});
    return res.render('users', { users });
  } catch (error) {
    req.flash('error', 'Something went wrong! Try again');
    res.redirect('back');
  }
};

const getFollowing = async (userId) => {
  const user = await User.findOne({ _id: userId }).populate('following');
  return user.following;
};

module.exports.followUser = async (req, res) => {
  try {
    const followerId = req.user.id;

    const followingId = req.params.id;

    const check = await User.findOne({
      _id: followerId,
      following: { $in: [followingId] },
    });

    if (followerId === followingId) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    if (check) {
      return res.status(400).json({ message: 'You already following user' });
    }

    await User.updateOne(
      { _id: followerId },
      { $push: { following: followingId } }
    );

    await User.updateOne(
      { _id: followingId },
      { $push: { follower: followerId } }
    );

    const user = await getSingleUser(req.user.id);

    res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Internal Server Error! Try again ',
    });
  }
};

module.exports.unFollowUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.id;

    await User.updateOne(
      { _id: followerId },
      { $pull: { following: followingId } }
    );

    await User.updateOne(
      { _id: followingId },
      { $pull: { follower: followerId } }
    );

    const user = await getSingleUser(req.user.id);
    const followingUser = await getFollowing(req.user.id);
    return res.json({ user, followingUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Internal Server Error! Try again ',
    });
  }
};

module.exports.getFollowers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ _id: userId }).populate('follower');
    return res.json({
      users: user.follower,
      title: `${user.name} followers`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Internal Server Error! Try again ',
    });
  }
};

module.exports.getFollowing = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ _id: userId }).populate('following');
    res.json({
      users: user.following,
      title: `${user.name} followings`,
    });
  } catch (error) {
    res.status(400).send({ message: 'something went wrong' });
  }
};

module.exports.getSingleUser = async (req, res) => {
  res.status(200).json({
    status: 'success',
    user: req.user,
  });
};

module.exports.getAllPosts = async (req, res) => {
  const posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    })
    .populate({
      path: 'likes',
    })
    .populate({
      path: 'tags',
    })
    .populate({
      path: 'sharedUser',
    });

  return res.status(200).json(posts);
};

// admin

const getAllUsers = async () => {
  const users = await User.find({}).sort('-createdAt');

  return users;
};

module.exports.manage = async (req, res) => {
  try {
    const email = req.user.email;
    if (email === 'admin@threadsapp.co.in') {
      const users = await User.find({});
      if (users) {
        return res.json(200, {
          message: 'Here are all the users',
          users: users,
        });
      }
    }
    return res.json(401, {
      message: 'Not authorized, try again :)',
    });
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: 'Internal Server Error',
    });
  }
};

module.exports.deleteUserManagement = async (req, res) => {
  try {
    if (req.user.email != 'admin@threadsapp.co.in') {
      return res
        .status(401)
        .json({ message: 'Not authorize to delete account' });
    }

    if (req.body.email) {
      const user = await User.findOne({ email: req.body.email });
      if (user.email === 'admin@threadsapp.co.in') {
        return res.status(403).json({ message: "admin can't be deleted" });
      }
      await deleteUser(user._id);
      const allUsers = await getAllUsers();
      return res.json({
        message: 'User Deleted',
        users: allUsers,
      });
    } else {
      return res.json(401, {
        message: 'Something went wrong',
      });
    }
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: 'Internal Server Error',
    });
  }
};
