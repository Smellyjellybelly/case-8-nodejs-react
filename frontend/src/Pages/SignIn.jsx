import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignIn({ onSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // Initialize the history object

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the provided onSignIn function
    const credentials = { username, password };
    const success = await onSignIn(credentials);

    if (success) {
      // Store user information in local storage
      window.localStorage.setItem('username', username);

      // Redirect to a different page after successful sign-in
      history.push('/home');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
}

export default SignIn;
