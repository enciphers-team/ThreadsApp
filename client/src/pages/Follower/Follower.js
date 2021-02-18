import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uniqid from 'uniqid';
import Search from '../../components/Search/Search';
import SmallProfile from '../../components/SmallProfile/SmallProfile';
import '../AllUser/AllUser.scss';

toast.configure();

class Follower extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      title: '',
    };
  }

  async componentDidMount() {
    try {
      const result = await axios.get(
        `/users/followers/${this.props.match.params.id}`
      );

      this.setState({ users: result.data.users, title: result.data.title });
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Try again');
      }
    }

    // this.setState({ users: result.data.users });
    //
  }

  render() {
    return (
      <div className="all-user">
        <Search />
        {this.state.users.map((ele) => (
          <SmallProfile key={uniqid()} userData={ele} />
        ))}
      </div>
    );
  }
}

export default withRouter(Follower);
