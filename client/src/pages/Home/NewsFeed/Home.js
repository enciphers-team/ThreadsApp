import React from 'react';
import './Home.scss';
import HomeRight from './HomeRight/HomeRight';
import NewsFeed from './NewsFeed/NewsFeed';
const Home = (props) => {
  return (
    <div className="home">
      <NewsFeed />
      <HomeRight />
    </div>
  );
};

export default Home;
