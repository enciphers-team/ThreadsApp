import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logoname.png';
import FormInput from '../../../components/FormInput/FormInput';
import { singInUser } from '../../../redux/auth/auth.actions';
import '../Auth.scss';

class AuthLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async () => {
    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.singInUser(newUser);
  };

  render() {
    return (
      <div className="auth">
        <div className="auth__container">
          <div className="auth__login">
            <img src={logo} alt="" className="auth__logo" />
            <h2 className="auth__header">login</h2>
            <FormInput
              onChange={this.onChangeHandler}
              placeholder="Enter Email"
              type="email"
              name="email"
              value={this.state.email}
            />
            <FormInput
              onChange={this.onChangeHandler}
              placeholder="Enter Password"
              type="password"
              name="password"
              value={this.state.password}
            />
            <button onClick={this.onSubmit} className="auth__button">
              Login
            </button>
            <Link to="/register">Create Account</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { singInUser })(AuthLogin);
