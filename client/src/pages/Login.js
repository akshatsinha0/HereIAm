import React from 'react';

const Login = () => {
  return (
    <div className="page">
      <h2>Login</h2>
      {/* Add your login form here */}
      <form>
        <div>
          <label>Email Address:</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
