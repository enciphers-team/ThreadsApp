import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeRightUser extends Component {
  render() {
    const { userData } = this.props;
    return (
      <div className="home__right__users__list__single">
        <div className="home__right__users__container">
          <div href="f" className="home__right__users__list__single__img">
            <img
              src={`${axios.defaults.baseURL}${userData.profileImage}`}
              alt=""
            />
          </div>
          <div className="home__right__users__list__single__name">
            {userData.name}
          </div>
        </div>
        <Link
          to={`/profile/${userData._id}`}
          className="home__right__users__list__single__view-more"
        >
          View
        </Link>
      </div>
    );
  }
}

export default HomeRightUser;
