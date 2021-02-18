import CreatePost from './CreatePost/CreatePost';
import './NewsFeed.scss';
import SinglePost from './SinglePost/SinglePost';
import Search from '../../../components/Search/Search';
import React, { Component } from 'react';
import axios from 'axios';
import uniqueId from 'uniqid';
import SharedPost from './SharedPost/SharedPost';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';

toast.configure();

class NewsFeed extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  async componentDidMount() {
    const result = await axios.get('/users/get-posts');
    this.setState({ posts: result.data });
  }

  editPostLike = (posts) => {
    this.setState({ posts });
  };

  deletePost = async (postData) => {
    try {
      const result = await axios.get(`/posts/delete/${postData._id}`);
      this.setState({ posts: result.data });
      toast.success('Post deleted successfully');
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Try again');
      }
    }
  };

  updatePost = async (postData) => {
    this.setState({ posts: postData });
  };

  render() {
    return (
      <div className="home__newsfeed">
        <Search />

        <CreatePost updatePost={this.updatePost} />
        {this.state.posts.map((ele) => {
          if (ele.isShared) {
            return (
              <SharedPost
                postData={ele}
                key={uniqueId()}
                editPostLike={this.editPostLike}
                deletePost={this.deletePost}
                updatePost={this.updatePost}
                bookmarks={this.props.bookmarks}
              />
            );
          } else {
            return (
              <SinglePost
                postData={ele}
                key={uniqueId()}
                editPostLike={this.editPostLike}
                deletePost={this.deletePost}
                updatePost={this.updatePost}
                bookmarks={this.props.bookmarks}
              />
            );
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bookmarks: state.auth.bookmarks,
});

export default connect(mapStateToProps)(NewsFeed);
