import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export class Comment extends Component {
  deleteComment = async () => {
    try {
      const { data } = this.props;
      const result = await axios.get(`/comment/delete/${data._id}`);
      toast.success('Comment added successfully');
      this.props.updatePost(result.data);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Try again');
      }
    }
  };

  render() {
    const { data } = this.props;
    console.log(this.props.user._id);
    console.log(this.props.data.user._id);
    console.log(this.props.user._id === this.props.data.user._id);

    return (
      <div className="single-comment">
        <div className="single-comment__profile">
          <Link
            to={`/profile/${data.user._id}`}
            className="single-comment__profile__img"
          >
            <img
              src={`${axios.defaults.baseURL}${this.props.data.user.profileImage}`}
              alt=""
            />
          </Link>
          <Link
            to={`/profile/${data.user._id}`}
            className="single-comment__profile__name"
          >
            {data.user.name}
          </Link>
        </div>
        <div className="single-comment__text">{data.description}</div>
        {this.props.user._id === this.props.data.user._id ? (
          <button
            className="single-comment__delete-button"
            onClick={this.deleteComment}
          >
            <i className="far fa-trash-alt single-comment__delete-button__icon"></i>
          </button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Comment);
