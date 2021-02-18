import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uniqueId from 'uniqid';
import { updateBookmarks } from '../../../../redux/auth/auth.actions';
import Comment from '../Comment/Comment';
import './SinglePost.scss';

toast.configure();

export class SinglePost extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
    };
  }

  onLikeClickHandler = async (event) => {
    const result = await axios.get(`/like/toggle/${this.props.postData._id}`);
    this.props.editPostLike(result.data);
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSharePost = async (event) => {
    try {
      const result = await axios.get(`/posts/share/${this.props.postData._id}`);
      this.props.updatePost(result.data);
      toast.success('Post shared successfully');
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Try again');
      }
    }
  };

  addToBookmark = async () => {
    try {
      const result = await axios.get(
        `/bookmark/add/${this.props.postData._id}`
      );

      this.props.updateBookmarks(result.data.bookmarks);

      toast.success('post bookmarked successfully');
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Try again');
      }
    }
  };

  addComment = async () => {
    try {
      const data = {
        description: this.state.comment,
        post_value: this.props.postData._id,
      };
      const result = await axios.post('/comment/create', data);
      this.props.updatePost(result.data);

      toast.success('comment added succesfully');
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Try again');
      }
    }
  };

  render() {
    const { postData, bookmarks } = this.props;

    const isBookmarked = bookmarks.some((el) => el._id == postData._id)
      ? true
      : false;

    let bookmarkHtml;

    if (isBookmarked) {
      bookmarkHtml = (
        <button onClick={this.addToBookmark}>
          <i
            style={{ color: 'var(--color-primary)' }}
            className="fas fa-bookmark newsfeed__single-post__top__right__icon"
          ></i>
        </button>
      );
    } else {
      bookmarkHtml = (
        <button onClick={this.addToBookmark}>
          <i className="far fa-bookmark newsfeed__single-post__top__right__icon"></i>
        </button>
      );
    }

    let likeHtml;
    let flag;
    if (postData) {
      for (let like of postData.likes) {
        if (like.user == this.props.user._id) {
          flag = true;
          likeHtml = (
            <i
              className="fas fa-heart newsfeed__single-post__top__right__icon"
              style={{ color: 'tomato' }}
            ></i>
          );
        }
      }

      if (!flag) {
        likeHtml = (
          <i className="far fa-heart newsfeed__single-post__top__right__icon"></i>
        );
      }

      return (
        <div className="newsfeed__single-post">
          <div className="newsfeed__single-post__top">
            <div className="newsfeed__single-post__top__left">
              <a href="/" className="newsfeed__single-post__top__left__img">
                <img
                  src={`${axios.defaults.baseURL}${postData.user.profileImage}`}
                  alt=""
                />
              </a>

              <Link
                to={`/profile/${postData.user._id}`}
                className="newsfeed__single-post__top__left__name"
              >
                {postData.user.name}
              </Link>
            </div>
            <div className="newsfeed__single-post__top__right">
              <button onClick={this.onLikeClickHandler}>{likeHtml}</button>
              {postData.user._id === this.props.user._id ? (
                <button onClick={() => this.props.deletePost(postData)}>
                  <i className="far fa-trash-alt newsfeed__single-post__top__right__icon"></i>
                </button>
              ) : null}

              <button onClick={this.onSharePost}>
                <i className="far fa-share-square newsfeed__single-post__top__right__icon"></i>
              </button>

              {bookmarkHtml}
            </div>
          </div>
          <div className="newsfeed__single-post__text">
            {postData.description}
          </div>

          <div className="newsfeed__single-post__tags">
            {postData.tags.map((ele) => (
              <a key={uniqueId()} target="_blank" href={`/profile/${ele._id}`}>
                @{ele.name}
              </a>
            ))}
          </div>

          {postData.url ? (
            <a href={postData.url} className="single-post__url" target="_blank">
              <img
                src={postData.urlImage}
                alt="not found"
                className="single-post__url__img"
              />
              <div className="single-post__url__title">{postData.urlTitle}</div>
            </a>
          ) : null}

          {postData.postImage ? (
            <img
              src={
                postData.postImage.startsWith('/uploads')
                  ? `${axios.defaults.baseURL}${postData.postImage}`
                  : `${postData.postImage}`
              }
              alt=""
              className="newsfeed__single-post__img"
            />
          ) : null}

          <div className="newsfeed__single-post__likes">
            Liked by <span> {postData.likes.length} people</span>
          </div>
          <div className="newsfeed__single-post__comment">
            <input type="text" name="comment" onChange={this.onChange} />
            <button onClick={this.addComment}>comment</button>
          </div>

          <div className="comment-list">
            {postData.comments.map((ele) => (
              <Comment
                data={ele}
                key={Math.random()}
                updatePost={this.props.updatePost}
              />
            ))}
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { updateBookmarks })(SinglePost);
