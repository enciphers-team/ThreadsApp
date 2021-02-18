import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class SideMenuProfile extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="side-menu__profile">
        <Link to={`/profile/${user._id}`}>
          <img
            src={`${axios.defaults.baseURL}${user.profileImage}`}
            className="side-menu__profile__pic"
          />
        </Link>
        <Link to={`/profile/${user._id}`} className="side-menu__profile__name">
          {user.name}
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(SideMenuProfile);
