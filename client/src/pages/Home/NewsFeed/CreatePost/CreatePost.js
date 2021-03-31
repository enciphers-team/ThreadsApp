import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '../Modal/Modal';
import './CreatePost.scss';

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      post_url: '',
      file: '',
      url: '',
      isLoading: false,
      isModalOpen: false,
      selectedUser: [],
    };
  }

  onModalButtonClick = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  onSubmit = async () => {
    try {
      const fd = new FormData();
      fd.append('content', this.state.content);
      fd.append('postImage', this.state.file);
      fd.append('post_url', this.state.url);
      fd.append('tags', JSON.stringify(this.state.selectedUser));

      this.setState({ isLoading: true });

      let result = await axios.post('/posts/create', fd);

      await this.props.updatePost(result.data);

      this.setState(
        { content: '', url: '', file: '', selectedUser: [] },
        () => {
          this.setState({ isLoading: false });
        }
      );
      toast.success('Post created successfully');
    } catch (error) {
      this.setState(
        { content: '', url: '', file: '', selectedUser: [] },
        () => {
          this.setState({ isLoading: false });
        }
      );
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Try again');
      }
    }
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  imageFileHandler = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  onUserClick = (userId) => {
    let currentState = [...this.state.selectedUser];
    if (this.state.selectedUser.includes(userId)) {
      let index = currentState.indexOf(userId);
      currentState.splice(index, 1);
      this.setState({ selectedUser: currentState });
    } else {
      currentState.push(userId);
      this.setState({ selectedUser: currentState });
    }
  };

  render() {
    return (
      <div className="newsfeed__create-post">
        <div className="newsfeed__create-post__profile">
          <img
            src={`${axios.defaults.baseURL}${this.props.user.profileImage}`}
            alt="post"
          />
          <h4 className="newsfeed__create-post__profile__name">
            {this.props.user.name}
          </h4>
        </div>
        <div
          // encType="multipart/form-data"
          // id="update-data-form"
          className="newsfeed__create-post__input"
        >
          <input
            onChange={this.onChange}
            type="text"
            placeholder="What are you thinking"
            name="content"
            value={this.state.content}
          />

          <button
            data-toggle="modal"
            data-target="#postTagModal"
            type="button"
            className="newsfeed__create-post__input__button-add"
            onClick={this.onModalButtonClick}
          >
            <i className="fas fa-tags"></i>
          </button>

          <Modal
            selectedUser={this.state.selectedUser}
            onUserClick={this.onUserClick}
            closeModal={this.onModalButtonClick}
            isModalOpen={this.state.isModalOpen}
          />

          <input
            type="file"
            onChange={this.imageFileHandler}
            style={{ display: 'none' }}
            name="file"
            ref={(fileInput) => (this.fileInput = fileInput)}
          />
          <button
            onClick={() => this.fileInput.click()}
            className="newsfeed__create-post__input__button-add"
          >
            <i className="far fa-images"></i>
          </button>
          <button
            onClick={this.onSubmit}
            className="newsfeed__create-post__input__post"
            disabled={this.state.isLoading ? true : ''}
          >
            post
          </button>
        </div>
        <div
          className="newsfeed__create-post__input"
          style={{ margin: '1rem 0px' }}
        >
          <input
            onChange={this.onChange}
            type="text"
            placeholder="url"
            name="url"
            value={this.state.url}
            className="newsfeed__create-post__input"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(CreatePost);
