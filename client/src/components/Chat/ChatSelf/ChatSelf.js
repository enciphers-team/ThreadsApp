import axios from 'axios';
import { Link } from 'react-router-dom';
import InnerHTML from 'dangerously-set-html-content';

import React, { Component } from 'react';

const ChatSelf = ({ user }) => {
  let flag = true;
  let html;

  try {
    html = <InnerHTML html={user.text} style={{ display: 'none' }} />;
  } catch (error) {
    console.log(error);
    flag = false;
  }

  return (
    <div className="chat__box__message__self">
      <div className="chat__box__message__self__profile">
        <Link
          to={`/profile/${user.id}`}
          className="chat__box__message__self__profile__img"
        >
          <img src={`${axios.defaults.baseURL}${user.profileImage}`} />
        </Link>
        <Link
          to={`/profile/${user.id}`}
          className="chat__box__message__self__profile__name"
        >
          {user.userName.split(' ')[0]}
        </Link>
        {flag ? html : null}
      </div>
      <div className="chat__box__message__self__text">{user.text}</div>
    </div>
  );
};

export default React.memo(ChatSelf);
