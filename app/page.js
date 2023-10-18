/*import React from 'react'

const reducer = (state, action) => {

}

function Home() {
  return (
    <div id="main">
      <section className='logout-section'>
        <h2>Logged in successfully!</h2>
        <p>Welcome username!</p>
        <button className='logout-btn'>Logout</button>
      </section>
      <form className='login-form'>
        {/* <p className='invalid-error'>Invalid username or password!</p> *}
        <section className='username-input'>
          <label>Username: </label>
          <input type="text" placeholder='Username' className='username' />
        </section>
        <section className='password-input'>
          <label>Password: </label>
          <input type="password" placeholder='Password' className='password' />
        </section>
        <button className='login-btn'>Login</button>
      </form>
    </div>
  )
}

export default Home*/





import { useClient } from 'next/react';

import React, { useReducer } from 'react';

const initialState = {
  username: '',
  password: '',
  error: '',
  isLoggedIn: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_USERNAME':
      return { ...state, username: action.payload, error: '' };
    case 'CHANGE_PASSWORD':
      return { ...state, password: action.payload, error: '' };
    case 'SUBMIT':
      if (state.username.trim() === '' || state.password.trim() === '') {
        return { ...state, error: 'Invalid username or password!' };
      }
      return { ...state, isLoggedIn: true, error: '' };
    default:
      return state;
  }
};

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleUsernameChange = (event) => {
    dispatch({ type: 'CHANGE_USERNAME', payload: event.target.value });
  };

  const handlePasswordChange = (event) => {
    dispatch({ type: 'CHANGE_PASSWORD', payload: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'SUBMIT' });
  };

  return (
    <div id="main">
      {state.isLoggedIn ? (
        <section className="logout-section">
          <h2>Logged in successfully!</h2>
          <p>Welcome {state.username}!</p>
          <button className="logout-btn" onClick={() => dispatch({ type: 'LOGOUT' })}>
            Logout
          </button>
        </section>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          {state.error && <p className="invalid-error">{state.error}</p>}
          <section className="username-input">
            <label>Username: </label>
            <input
              type="text"
              placeholder="Username"
              className="username"
              value={state.username}
              onChange={handleUsernameChange}
            />
          </section>
          <section className="password-input">
            <label>Password: </label>
            <input
              type="password"
              placeholder="Password"
              className="password"
              value={state.password}
              onChange={handlePasswordChange}
            />
          </section>
          <button className="login-btn">Login</button>
        </form>
      )}
    </div>
  );
}

export default Home;
