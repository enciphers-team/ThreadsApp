import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uniqueId from 'uniqid';
import Search from '../../../components/Search/Search';
import { updateBookmarks } from '../../../redux/auth/auth.actions';
import './NewsFeed.scss';
import SharedPost from './SharedPost/SharedPost';
import SinglePost from './SinglePost/SinglePost';

toast.configure();

class NewsFeed extends Component {
  updateBookmarks = async (postData) => {
    this.props.updateBookmarks(postData);
  };

  render() {
    return (
      <div className="home__newsfeed">
        <Search />
        {this.props.bookmarks.map((ele) => {
          if (ele.isShared) {
            return (
              <SharedPost
                postData={ele}
                key={uniqueId()}
                editPostLike={this.editPostLike}
                deletePost={this.deletePost}
                updateBookmarks={this.updateBookmarks}
              />
            );
          } else {
            return (
              <SinglePost
                postData={ele}
                key={uniqueId()}
                editPostLike={this.editPostLike}
                deletePost={this.deletePost}
                updateBookmarks={this.updateBookmarks}
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

export default connect(mapStateToProps, { updateBookmarks })(NewsFeed);
