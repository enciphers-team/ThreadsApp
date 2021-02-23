import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import InnerHTML from 'dangerously-set-html-content';


function ChatFriend({ user }) {
  let flag = true;
  let html;

  try {
    html = <InnerHTML html={user.text} style={{ display: 'none' }} />;
  } catch (error) {
    console.log(error);
    flag = false;
  }

  return (
    <div className="chat__box__message__friend">
      <div className="chat__box__message__friend__profile">
        <Link
          to={`/profile/${user.id}`}
          className="chat__box__message__friend__profile__img"
        >
          <img src={`${axios.defaults.baseURL}${user.profileImage}`} />
        </Link>
        <Link
          to={`/profile/${user.id}`}
          className="chat__box__message__friend__profile__name"
        >
          {user.userName.split(' ')[0]}
        </Link>
        {flag ? html : null}
      </div>
      <div className="chat__box__message__friend__text">{user.text}</div>
    </div>
  );
}

export default ChatFriend;
