import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import encipherslogo from '../../../assets/enciphers.jpg';
import logo from '../../../assets/logoname.png';
import './HomeRight.scss';
import HomeRightUser from './HomeRightUser/HomeRightUser';

class HomeRight extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      followers: [],
    };
  }

  async componentDidMount() {
    const result = await axios.get('/users/get-users');

    const temp = [];
    for (let i = 0; i < result.data.users.length && i < 3; i++) {
      temp.push(result.data.users[i]);
    }

    this.setState({ users: temp });

    // folowers
    const followers = await axios.get(
      `/users/followers/${this.props.user._id}`
    );

    const temp2 = [];
    for (let i = 0; i < followers.data.users.length && i < 2; i++) {
      temp2.push(followers.data.users[i]);
    }

    this.setState({ followers: temp2 });
  }

  render() {
    const { users, followers } = this.state;

    let followerHtml = <h3>No followers found</h3>;
    if (followers.length > 0) {
      followerHtml = followers.map((el) => (
        <HomeRightUser key={uniqid()} userData={el} />
      ));
    }

    let allUserHtml = <h3>No users found</h3>;

    if (users.length > 0) {
      allUserHtml = users.map((el) => (
        <HomeRightUser key={uniqid()} userData={el} />
      ));
    }

    return (
      <div className="home__right">
        <div className="home__right__users">
          <h3 className="home__right__users__header">NEW USERS</h3>
          <div className="home__right__users__list">{allUserHtml}</div>

          <Link to="/users" className="home__right__users__view-more">
            view more
          </Link>
        </div>

        <div className="home__right__sponsor">
          <h3>Creators</h3>
          <div className="home__right__sponsor__container2">
            <a href="https://enciphers.com/" target="_blank">
              <img src={encipherslogo} alt="" />
            </a>
            <div className="home__right__sponsor__container">
              <a
                href="https://enciphers.com/"
                className="home__right__sponsor__logo"
                target="_blank"
              >
                <img src={logo} />
              </a>
              <div className="home__right__sponsor__text">
                Created & Managed by Enciphers
              </div>
            </div>
          </div>
        </div>

        <div className="home__right__users">
          <h3 className="home__right__users__header">USERS</h3>
          <div className="home__right__users__list">{followerHtml}</div>
          <Link
            to={`/follower/${this.props.user._id}`}
            className="home__right__users__view-more"
          >
            view more
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuth: state.auth.isAuth,
  user: state.auth.user,
});
export default connect(mapStateToProps)(HomeRight);
