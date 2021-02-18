import axios from 'axios';
import React, { Component } from 'react';
import uniqid from 'uniqid';
import Search from '../../components/Search/Search';
import SmallProfile from '../../components/SmallProfile/SmallProfile';
import './AllUser.scss';

class AllUser extends Component {
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

  render() {
    return (
      <div className="all-user">
        <Search />
        {this.state.users.length > 0 ? (
          this.state.users.map((ele) => (
            <SmallProfile key={uniqid()} userData={ele} />
          ))
        ) : (
          <h3>No users found</h3>
        )}
      </div>
    );
  }
}

export default AllUser;
