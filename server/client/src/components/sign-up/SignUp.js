import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div>
      <h3>Sign Up</h3>
      <form action="">
        <div>
          <label htmlFor="email">E-mail</label>
          <input type="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" required/>
        </div>
        <div>
          <label htmlFor="password-confirm">Confirm Password;</label>
          <input type="password" required/>
        </div>
      </form>
      <div>
        Already have an account? <Link>Log In</Link>
      </div>
    </div>
  );
};

export default SignUp;
