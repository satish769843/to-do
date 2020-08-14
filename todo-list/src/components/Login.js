import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../action/auth';
const Login = ({ login, isAuth }) => {
  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = loginData;
  const onChange = e => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };
  if (isAuth) return <Redirect to='/' />;

  return (
    <Fragment>
      <div className='login-form'>
        <form onSubmit={e => onSubmit(e)}>
          <h2 className='text-center'>Log in</h2>
          <div className='form-group'>
            <input
              type='email'
              value={email}
              onChange={e => onChange(e)}
              name='email'
              className='form-control'
              placeholder='email'
              required='required'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              onChange={e => onChange(e)}
              className='form-control'
              placeholder='Password'
              required='required'
              name='password'
              value={password}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary btn-block'>
              Log in
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
Login.protoType = {
  login: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
