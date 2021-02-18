import React, { Component } from 'react';
import './Home.scss';
import HomeRight from './HomeRight/HomeRight';
import NewsFeed from './NewsFeed/NewsFeed';

export class Bookmark extends Component {
  render() {
    return (
      <div className="home">
        <NewsFeed />
        <HomeRight />
      </div>
    );
  }
}

export default Bookmark;
