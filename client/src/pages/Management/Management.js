import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uniqueId from 'uniqid';
import './Management.scss';

toast.configure();

class Management extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    const result = await axios.get('/users/get-users');

    this.setState({ users: result.data.users });
  }

  deleteUser = async (email) => {
    try {
      const result = await axios.post('/users/management/delete-user', {
        email,
      });
      this.setState({ users: result.data.users });
      toast.success(result.data.message);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Try again');
      }
    }
  };

  render() {
    if (this.props.user.email != 'admin@threadsapp.co.in') {
      return (
        <div className="manage">
          <h3>Not authorize</h3>
        </div>
      );
    }

    return (
      <div className="manage">
        <div className="manage__header">
          <div className="manage__header__number">#</div>
          <div className="manage__header__name">Name</div>
          <div className="manage__header__email">Email</div>
          <div className="manage__header__status">Status</div>
          <div className="manage__header__action">Action</div>
        </div>
        {this.state.users.map((ele, index) => {
          return (
            <div className="manage__item" key={uniqueId()}>
              <div className="manage__item__number">{index + 1}</div>
              <div className="manage__item__name">{ele.name}</div>
              <div className="manage__item__email">{ele.email}</div>
              <div className="manage__item__status">
                <i className="fas fa-circle manage__item__status__icon"></i>
                <span>Active</span>
              </div>
              <div className="manage__item__action">
                <div
                  onClick={() => this.deleteUser(ele.email)}
                  className="manage__item__action__container"
                >
                  <i className="fas fa-user-times manage__item__action__icon"></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Management);
