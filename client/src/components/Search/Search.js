import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Search.scss';

export class Search extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }
  onSubmit = (event) => {
    event.preventDefault();

    this.props.history.push(`/search/${this.state.text}`);
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <form className="home__newsfeed__search" onSubmit={this.onSubmit}>
        <i className="fas fa-search home__newsfeed__search__icon"></i>
        <input
          onChange={this.onChange}
          type="text"
          name="text"
          placeholder="SEARCH USERS"
        />
      </form>
    );
  }
}

export default withRouter(Search);
