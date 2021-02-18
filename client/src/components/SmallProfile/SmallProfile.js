import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { compose } from 'redux';
import { updateUserData } from '../../redux/auth/auth.actions';
import './SmallProfile.scss';



toast.configure();

export class SmallProfile extends Component {
  followUser = async () => {
    try {
      const result = await axios.get(
        `/users/follow/${this.props.userData._id}`
      );

      
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
      const result = await axios.get(
        `/users/unfollow/${this.props.userData._id}`
      );

      
      this.props.updateUserData(result.data.user);
      // this.props.updateUsers(result.data.followingUser);
      

      toast.success('User unfollowed sucessfully');
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Try again');
      }
    }
  };

  visitProfile = () => {
    
    this.props.history.push(`/profile/${this.props.userData._id}`);
  };

  render() {
    // 
    const { userData } = this.props;

    let followHtml;
    if (this.props.user && this.props.user.following.includes(userData._id)) {
      followHtml = <button onClick={this.unfollowUser}>unfollow</button>;
    } else {
      followHtml = <button onClick={this.followUser}>follow</button>;
    }

    return (
      <div className="small-profile">
        <div className="small-profile__left">
          <img
            src={`${axios.defaults.baseURL}${userData.profileImage}`}
            alt={userData.name}
            className="small-profile__img"
          />
          <div className="small-profile__name">{userData.name}</div>
        </div>
        <div className="small-profile__right">
          <button onClick={this.visitProfile}>Visit Profile</button>
          {followHtml}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { updateUserData })
)(SmallProfile);
