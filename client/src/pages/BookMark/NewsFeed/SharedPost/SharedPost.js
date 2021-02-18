// import './S';
import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class SharedPost extends Component {
  onLikeClickHandler = async (event) => {
    const result = await axios.get(`/like/toggle/${this.props.postData._id}`);
    this.props.editPostLike(result.data);
  };

  deleteBookmark = async (event) => {
    try {
      const result = await axios.get(
        `/bookmark/delete/${this.props.postData.bookMarkId}`
      );
      toast.success(result.data.message);

      this.props.updateBookmarks(result.data.bookmarks);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Try again');
      }
    }
  };

  render() {
    const { postData } = this.props;
    return (
      <div className="share-post">
        <div className="newsfeed__single-post__top">
          <div className="newsfeed__single-post__top__left">
            <a href="/" className="newsfeed__single-post__top__left__img">
              <img
                src={`${axios.defaults.baseURL}${postData.sharedUser.profileImage}`}
                alt=""
              />
            </a>
            <a href="" className="newsfeed__single-post__top__left__name">
              {postData.sharedUser.name}
            </a>
            <span className="shared-title">Shared</span>
          </div>
          <div className="newsfeed__single-post__top__right">
            <button onClick={this.deleteBookmark}>
              <i className="far fa-trash-alt newsfeed__single-post__top__right__icon"></i>
            </button>

            {/* <button>
                <i className="far fa-comments newsfeed__single-post__top__right__icon"></i>
              </button> */}
          </div>
        </div>
        <div className="newsfeed__single-post share-post-single">
          <div className="newsfeed__single-post__top">
            <div className="newsfeed__single-post__top__left">
              <a href="/" className="newsfeed__single-post__top__left__img">
                <img
                  src={`${axios.defaults.baseURL}${postData.user.profileImage}`}
                  alt=""
                />
              </a>
              <a href="" className="newsfeed__single-post__top__left__name">
                {postData.user.name}
              </a>
            </div>
          </div>
          <div className="newsfeed__single-post__text">
            {postData.description}
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
        </div>
        <div className="newsfeed__single-post__likes">
          Liked by <span> {postData.likes.length} people</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(SharedPost);
