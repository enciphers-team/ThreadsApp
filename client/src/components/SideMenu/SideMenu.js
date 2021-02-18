import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logoname.png';
import './SideMenu.scss';
import SideMenuItem from './SideMenuItem/SideMenuItem';
import SideMenuProfile from './SideMenuProfile/SideMenuProfile';

const SideMenu = ({ user }) => {
  return (
    <div className="side-menu">
      <img src={logo} alt="" className="side-menu__logo" />
      <SideMenuProfile />
      <Link to={`/profile/${user._id}`} className="side-menu__profile-button">
        <span>
          <i className="fas fa-user-alt side-menu__profile-button__icon "></i>
        </span>
        Account
      </Link>
      <SideMenuItem />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(SideMenu);
