import React, { Component } from 'react';
import NewsFeed from './NewsFeed/NewsFeed';
import HomeRight from './HomeRight/HomeRight';
import './Home.scss';

export class Home extends Component {
  render() {
    return (
      <div className="home">
        <NewsFeed />
        <HomeRight />
      </div>
    );
  }
}

export default Home;
