const userData = require('./user_data');
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
require('../config/mongoose');
const User = require('../models/user');
const Post = require('../models/post');

const mongoose = require('mongoose');
const postData = require('./post_data');
const deleteUser = require('../util/delete_user');
const getPageMetadata = require('../util/helper_functions');

const createFollowers = (interval) => {
  console.log('--------completed adding user and posts---------------');
  clearInterval(interval);

  let i = 0;

  const newInterval = setInterval(async () => {
    if (i == userData.length) {
      console.log('***********Follower adding done *************');
      console.log('-----------closing database connection ------------');
      mongoose.connection.close();

      clearInterval(newInterval);
      return;
    }

    let currentUser = userData[i];
    let followingId = await User.findOne({ email: currentUser.email });
    followingId = followingId._id;

    let start = Math.floor(Math.random() * 24) + 1;
    let end = Math.floor(Math.random() * 24) + 1;

    if (start > end) {
      let temp = start;
      start = end;
      end = temp;
    }

    for (let i = start; i <= end; i++) {
      let followerId = await User.findOne({ email: userData[i].email });
      followerId = followerId._id;

      if (followingId.equals(followerId)) {
        continue;
      }

      await User.updateOne(
        { _id: followerId },
        { $push: { following: followingId } }
      );

      await User.updateOne(
        { _id: followingId },
        { $push: { follower: followerId } }
      );
    }
    i++;
  }, 500);
};

const createPost = async (data) => {
  if (data.post_url) {
    const post_url = data.post_url;
    const metaData = await getPageMetadata(post_url);
    const { error, result } = metaData;

    if (error || !result) {
      return;
    } else {
      let postData = {
        description: data.description,
        user: data._id,
        postImage: data.imageUrl,
        urlTitle: result.og.title || result.meta.title,
        urlImage: result.og.image
          ? result.og.image
          : result.images[0]
          ? result.images[0]["src"]
          : post_url,
        url: result.og.url ? result.og.url : post_url,
        tags: data.tags ? data.tags : [],
        isShared: false,
      };

      await Post.create(postData);
    }
  } else {
    const post = await Post.create({
      description: data.description,
      user: data._id,
      postImage: data.imageUrl,
      tags: data.tags ? data.tags : [],
      isShared: false,
    });
    console.log(post);
  }
};

async function createUser2(usersToAdd) {
  try {
    let i = 0;
    const interval = setInterval(async () => {
      if (i == usersToAdd.length) {
        createFollowers(interval);
        return;
      }

      let data = usersToAdd[i];

      let findUser = await User.findOne({ email: data.email });

      if (findUser) {
        await deleteUser(findUser._id);
      }

      let user = await User.create(data);

      if (postData[user.email]) {
        const post = {
          description: postData[user.email].description,
          post_url: postData[user.email].url,
          imageUrl: postData[user.email].postImage,
          _id: user._id,
          email: user.email,
        };
        createPost(post);
      }
      i++;
    }, 500);
  } catch (error) {
    console.log(error);
  }
}

// Modify to receive user data directly from parent process
if (process.send) {
  process.on('message', (usersToAdd) => {
    createUser2(usersToAdd);
  });
} else {
  createUser2(userData); // Fallback if not run as a child process
}

