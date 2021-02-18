import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOutUser } from '../../../redux/auth/auth.actions';
import './SideMenuItem.scss';

const SideMenuItem = ({ logOutUser }) => {
  const logOut = (event) => {
    event.preventDefault();
    logOutUser();
  };

  return (
    <div className="side-menu__item">
      <h3 className="side-menu__item__header">Menus</h3>
      <div className="side-menu__item__list">
        <Link to="/home" className="side-menu__item__single">
          <i className="fas fa-fw fa-home side-menu__item__icon"></i>
          <span> Home </span>
        </Link>

        <Link to="/bookmarks" className="side-menu__item__single">
          <i className="fas fa-fw fa-bookmark side-menu__item__icon"></i>
          <span> Bookmarks </span>
        </Link>

        <Link to="/users" className="side-menu__item__single">
          <i className="fas fa-fw fa-users side-menu__item__icon"></i>
          <span> All users </span>
        </Link>

        <Link to="#" className="side-menu__item__single" onClick={logOut}>
          <i className="fas fa-sign-out-alt side-menu__item__icon"></i>
          <span> Log out </span>
        </Link>
      </div>
    </div>
  );
};
export default connect(null, { logOutUser })(SideMenuItem);
