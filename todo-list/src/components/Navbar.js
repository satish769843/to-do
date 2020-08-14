import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// Pages

// Redux
import { connect } from 'react-redux';
// Action
import { logout } from '../action/auth';

const Navbar = ({ logout }) => {
  return (
    <nav className='navbar navbar-dark bg-primary '>
      <h1 style={{ color: 'white' }}>To-do List</h1>
      <form className='form-inline my-2 my-lg-0'>
        <a
          onClick={logout}
          href='#!'
          className='btn btn-success  my-2 my-sm-0'
          type='submit'
        >
          LOGOUT
        </a>
      </form>
    </nav>
  );
};
Navbar.protoType = {
  logout: PropTypes.func.isRequired,
};
export default connect(null, { logout })(Navbar);
