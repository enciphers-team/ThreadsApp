import axios from 'axios';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uniqid from 'uniqid';
import Search from '../../components/Search/Search';
import SmallProfile from '../../components/SmallProfile/SmallProfile';
import '../AllUser/AllUser.scss';

toast.configure();

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    try {
      const result = await axios.post('/search', {
        search_text: this.props.match.params.text,
      });

      this.setState({ users: result.data });
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Try again');
      }
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.text != this.props.match.params.text) {
      try {
        const result = await axios.post('/search', {
          search_text: this.props.match.params.text,
        });

        this.setState({ users: result.data });
      } catch (error) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Something went wrong! Try again');
        }
      }
    }
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

export default SearchPage;
