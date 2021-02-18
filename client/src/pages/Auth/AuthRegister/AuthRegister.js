import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logoname.png';
import FormInput from '../../../components/FormInput/FormInput';
import { signUpUser } from '../../../redux/auth/auth.actions';
import '../Auth.scss';

class AuthRegister extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };
    const { signUpUser } = this.props;
    signUpUser(newUser);
  };

  render() {
    return (
      <div className="auth">
        <div className="auth__container">
          <div className="auth__register">
            <img src={logo} alt="" className="auth__logo" />

            <h2 className="auth__header">Register</h2>
            <FormInput
              onChange={this.onChangeHandler}
              placeholder="Enter Name"
              type="text"
              name="name"
              value={this.state.name}
            />
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
            <FormInput
              onChange={this.onChangeHandler}
              placeholder="Confirm Password"
              name="passwordConfirm"
              type="password"
              value={this.state.passwordConfirm}
            />
            <button onClick={this.onSubmit} className="auth__button">
              Register
            </button>
            <Link to="/login">Already Have account ?</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { signUpUser })(AuthRegister);
