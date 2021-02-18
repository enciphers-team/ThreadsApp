import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { compose } from 'redux';
import { logOutUser, updateUserData } from '../../redux/auth/auth.actions';
import './Profile.scss';

toast.configure();

export class Profile extends Component {
  static async getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.id !== prevState._id) {
      const id = nextProps.match.params.id;
      const result = await axios.get(`/users/profile/${id}`);

      const data = result.data;

      return {
        name: data.name,
        email: data.email,
        currentImage: data.profileImage,
        websiteLink: data.webLink ? data.webLink : '',
        bio: data.bio ? data.bio : '',
        _id: data._id,
      };
    }
    return null;
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    const result = await axios.get(`/users/profile/${id}`);

    const data = result.data;

    this.setState({
      name: data.name,
      email: data.email,
      currentImage: data.profileImage,
      websiteLink: data.webLink ? data.webLink : '',
      bio: data.bio ? data.bio : '',
      _id: data._id,
    });
  }

  constructor() {
    super();
    this.state = {
      _id: '',
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      profileImage: '',
      websiteLink: '',
      imageURL: '',
      bio: '',
      currentImage: '',
    };
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    try {
      const fd = new FormData();
      fd.append('name', this.state.name);
      fd.append('email', this.state.email);
      fd.append('password', this.state.password);
      fd.append('confirm_password', this.state.confirm_password);
      fd.append('profileImage', this.state.profileImage);
      fd.append('websiteLink', this.state.websiteLink);
      fd.append('imageURL', this.state.imageURL);
      fd.append('bio', this.state.bio);

      const result = await axios.post(`/users/update/${this.state._id}`, fd);

      const data = result.data;

      console.log(data);

      this.props.updateUserData(data);

      this.setState({
        name: data.name,
        email: data.email,
        currentImage: data.profileImage,
        websiteLink: data.webLink ? data.webLink : '',
        bio: data.bio ? data.bio : '',
        _id: data._id,
      });

      toast.success('User updated succesfully');
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Try again');
      }
    }
  };

  onChangeFile = (event) => {
    this.setState({ profileImage: event.target.files[0] });
  };

  deleteAccount = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.get('/users/delete');
      this.props.logOutUser();
      this.props.history.push('/login');

      toast.success('Account deleted Succesfully');
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Try again');
      }
    }
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.id != this.props.match.params.id) {
      const id = this.props.match.params.id;
      const result = await axios.get(`/users/profile/${id}`);

      const data = result.data;

      this.setState({
        name: data.name,
        email: data.email,
        currentImage: data.profileImage,
        websiteLink: data.webLink ? data.webLink : '',
        bio: data.bio ? data.bio : '',
        _id: data._id,
      });
    }
  }

  followUser = async () => {
    try {
      const result = await axios.get(`/users/follow/${this.state._id}`);

      console.log(result);
      this.props.updateUserData(result.data);
      toast.success('User followed sucessfully');
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Try again');
      }
    }
  };

  unfollowUser = async () => {
    try {
      const result = await axios.get(`/users/unfollow/${this.state._id}`);

      console.log(result);
      this.props.updateUserData(result.data.user);
      // this.props.updateUsers(result.data.followingUser);
      console.log(result.data);

      toast.success('User unfollowed sucessfully');
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Try again');
      }
    }
  };

  render() {
    let isSame = false;
    if (this.props.user && this.props.user._id === this.state._id) {
      isSame = true;
    }

    let followHtml;
    if (!isSame) {
      if (this.props.user.following.includes(this.state._id)) {
        followHtml = (
          <button
            className="profile-page__follow-button"
            onClick={this.unfollowUser}
          >
            unfollow
          </button>
        );
      } else {
        followHtml = (
          <button
            className="profile-page__follow-button"
            onClick={this.followUser}
          >
            follow
          </button>
        );
      }
    }

    return (
      <div className="profile-page">
        <div className="profile-page__container">
          <div className="img-profile">
            <img
              src={`${axios.defaults.baseURL}${this.state.currentImage}`}
              className="img-responsive profile"
              alt="image"
            />
          </div>
          {followHtml}
          <form
            onSubmit={this.onSubmit}
            action="/users/update/<%= current_user.id %>"
            encType="multipart/form-data"
            method="POST"
          >
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter Name"
                required
                value={this.state.name}
                onChange={this.onChange}
                disabled={!isSame}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                required
                value={this.state.email}
                onChange={this.onChange}
                disabled={!isSame}
              />
            </div>
            {isSame ? (
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Update Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
            ) : null}

            {isSame ? (
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  id="password2"
                  name="confirm_password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={this.state.confirm_password}
                  onChange={this.onChange}
                />
              </div>
            ) : null}

            {isSame ? (
              <div className="form-group">
                <label htmlFor="urLUpload">Image URL</label>
                <input
                  type="url"
                  className="form-control-file"
                  id="urLUpload"
                  name="imageURL"
                  value={this.state.imageURL}
                  onChange={this.onChange}
                />
              </div>
            ) : null}

            {isSame ? (
              <div className="form-group">
                <label htmlFor="fileUpload">Update Profile Image</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="fileUpload"
                  name="profileImage"
                  onChange={this.onChangeFile}
                />
              </div>
            ) : null}

            <div className="form-group">
              <label htmlFor="bio_field">Bio</label>
              <textarea
                className="form-control"
                rows="3"
                id="bio_field"
                placeholder="Write your bio"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                disabled={!isSame}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="web">Website</label>
              <input
                type="text"
                id="web"
                name="websiteLink"
                className="form-control"
                value={this.state.websiteLink}
                onChange={this.onChange}
                disabled={!isSame}
              />
            </div>

            <div className="profile-container1">
              <a
                className="btn btn-primary"
                href={this.state.websiteLink}
                role="button"
                target="_blank"
              >
                Visit website
              </a>

              <a
                className="btn btn-primary"
                href={`/follower/${this.state._id}`}
                role="button"
                target="_blank"
              >
                View followers
              </a>

              <a
                className="btn btn-primary"
                href={`/following/${this.state._id}`}
                role="button"
                target="_blank"
              >
                View followings
              </a>
            </div>

            {isSame ? (
              <button
                type="submit"
                className="btn btn-primary btn-block profile-button"
              >
                Update
              </button>
            ) : null}

            {isSame ? (
              <a
                className="btn btn-danger profile-button btn-block"
                href="/users/delete"
                role="button"
                onClick={this.deleteAccount}
              >
                Delete account
              </a>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { logOutUser, updateUserData })
)(Profile);
