const userData = require('./user_data');
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
require('../config/mongoose');
const User = require('../models/user');
const Post = require('../models/post');

const mongoose = require('mongoose');
const postData = require('./post_data');
const ogs = require('open-graph-scraper');
const deleteUser = require('../util/delete_user');

const createFollwers = (interval) => {
  console.log('--------completed adding user and posts---------------');
  clearInterval(interval);

  let i = 0;

  const newInteval = setInterval(async () => {
    if (i == userData.length) {
      console.log('***********Follower addding done *************');
      console.log('-----------closing database connection ------------');
      mongoose.connection.close();

      clearInterval(newInteval);
      return;
    }

    let current_user = userData[i];
    let followingId = await User.findOne({ email: current_user.email });
    followingId = followingId._id;

    let start = Math.floor(Math.random() * 24) + 1;
    let end = Math.floor(Math.random() * 24) + 1;

    if (start > end) {
      let temp = start;
      start = end;
      end = start;
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
  // return;
  //if url exist

  if (data.post_url) {
    const options = { url: data.post_url };
    ogs(options, async (error, result, response) => {
      // if url is wrong
      if (error) {
        return;
      } else {
        const post = await Post.create({
          description: data.description,
          user: data._id,
          postImage: data.imageUrl,
          urlTitle: result.ogTitle,
          url: result.ogUrl ? result.ogUrl : result.requestUrl,
          urlImage: result.ogImage ? result.ogImage.url : null,
          tags: data.tags ? data.tags : [],
          isShared: false,
        });

        console.log(post);
      }
    });
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

async function createUser2() {
  try {
    let i = 0;
    const interval = setInterval(async () => {
      if (i == userData.length) {
        createFollwers(interval);
        // clearInterval(interval);
        return;
      }

      let data = userData[i];

      let findUser = await User.findOne({ email: data.email });

      if (findUser) {
        await deleteUser(findUser._id);
      }

      let user = await User.create(data);

      const post = {
        description: postData[user.email].description,
        post_url: postData[user.email].url,
        imageUrl: postData[user.email].postImage,
        _id: user._id,
        email: user.email,
      };
      createPost(post);
      i++;
    }, 500);
  } catch (error) {
    console.log(error);
  }
}

createUser2();
