import jwt from 'jsonwebtoken';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Chat from './components/Chat/Chat';
import SideMenu from './components/SideMenu/SideMenu';
import Spinner from './components/Spinner/Spinner';
import AllUser from './pages/AllUser/AllUser';
import AuthLogin from './pages/Auth/AuthLogin/AuthLogin';
import AuthRegister from './pages/Auth/AuthRegister/AuthRegister';
import Bookmark from './pages/BookMark/BookMark';
import Follower from './pages/Follower/Follower';
import Following from './pages/Following/Following';
import Home from './pages/Home/Home';
import Management from './pages/Management/Management';
import Profile from './pages/Profile/Profile';
import SearchPage from './pages/SearchPage/SearchPage';
import { fetchBookmarks, fetchUserData } from './redux/auth/auth.actions';
import { AUTH_TYPES } from './redux/auth/auth.types';
import reduxStore from './redux/store';




class App extends Component {
  constructor() {
    super();
    this.state = {
      firstUrl: '',
    };
  }

  async componentDidMount() {
    if (this.state.firstUrl.length == 0) {
      this.setState({ firstUrl: this.props.location.pathname });
    }
    const { fetchUserData, fetchBookmarks } = this.props;
    // const socket = openSocket('https://ecommercedemo22.herokuapp.com');
    // this.props.connectSocket(socket);
    const decoded = jwt.decode(localStorage.getItem('jwt_token'));
    const date = new Date().getTime();
    if (decoded) {
      if (date >= decoded.exp * 1000) {
        reduxStore.dispatch({
          type: AUTH_TYPES.LOG_OUT_USER,
        });
      } else {
        fetchUserData();
        fetchBookmarks();
      }
    }
  }

  render() {
    const { isAuth, fetchUserLoading } = this.props;

    let route;

    const routes = [
      '/home',
      '/users',
      '/bookmarks',
      '/profile',
      '/follower',
      '/following',
      '/search',
      '/management',
    ];

    if (isAuth) {
      route = (
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/users" component={AllUser} />
          <Route exact path="/bookmarks" component={Bookmark} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/follower/:id" component={Follower} />
          <Route exact path="/following/:id" component={Following} />
          <Route exact path="/search/:text?" component={SearchPage} />
          <Route exact path="/management" component={Management} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route
            path="/"
            render={() => {
              for (let i = 0; i < routes.length; i++) {
                if (this.state.firstUrl.startsWith(routes[i])) {
                  
                  return <Redirect to={this.state.firstUrl} />;
                }
              }

              
              return <Redirect to="/home" />;
            }}
          />
        </Switch>
      );
    } else if (!fetchUserLoading) {
      route = (
        <Switch>
          <Route exact path="/register" component={AuthRegister} />
          <Route exact path="/login" component={AuthLogin} />
          <Route path="/" render={() => <Redirect to="/login" />} />
        </Switch>
      );
    } else {
      route = <Spinner />;
    }

    return (
      <div className="app">
        {isAuth ? <SideMenu /> : null}
        {isAuth ? <Chat /> : null}
        {route}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuth: state.auth.isAuth,
  fetchUserLoading: state.auth.fetchUserLoading,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { fetchUserData, fetchBookmarks })
)(App);
