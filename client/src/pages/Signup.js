import React from 'react';

const Signup = () => {
  return (
    <div className="page">
      <h2>Sign Up</h2>
      {/* Add your sign up form here */}
      <form>
        <div>
          <label>Email Address:</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Create a password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
