import React, { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import uniqueId from 'uniqid';
import './Chat.scss';
import ChatFriend from './ChatFriend/ChatFriend';
import ChatSelf from './ChatSelf/ChatSelf';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      socket: openSocket('http://localhost:4000'),
      text: '',
      messageList: [],
      socketChanged: false,
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidMount() {
    const socket = openSocket('http://localhost:4000');

    this.state.socket.on('send_message_to_all', (data) => {
      const newMessages = [...this.state.messageList];
      newMessages.push(data);

      this.setState({ messageList: newMessages, text: '' });
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const data = {
      text: this.state.text,
      profileImage: this.props.user.profileImage,
      userName: this.props.user.name,
      email: this.props.user.email,
    };

    this.state.socket.emit('send_message', data);
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="chat">
        <button
          type="button"
          className="chat__button"
          onClick={this.toggle}
          style={
            this.state.isOpen
              ? { transform: 'scale(0)' }
              : { transform: 'scale(1)' }
          }
        >
          <i className=" far fa-comments chat__button__icon"></i>
        </button>
        <div
          className="chat__box"
          style={
            this.state.isOpen
              ? { transform: 'scale(1)' }
              : { transform: 'scale(0)' }
          }
        >
          <div className="chat__box__top">
            <h4 className="chat__box__top__header">Group Chat</h4>
            <div className="chat__box__top__minimize" onClick={this.toggle}>
              <i className="fas fa-minus chat__box__top__minimize__icon"></i>
            </div>
          </div>
          <div className="chat__box__message">
            {this.state.messageList.map((user) => {
              if (user.email === this.props.user.email) {
                return <ChatSelf key={uniqueId()} user={user} />;
              } else {
                return <ChatFriend key={uniqueId()} user={user} />;
              }
            })}
          </div>
          <form action="" className="chat__box__input" onSubmit={this.onSubmit}>
            <input
              onChange={this.onChange}
              type="text"
              placeholder="Type message"
              name="text"
              value={this.state.text}
            />
            <button className="chat__box__input__button">
              <i className="far fa-paper-plane chat__box__input__button__icon"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Chat);
