import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Cookies from 'universal-cookie';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    if (email && password) {
      const storedData = getStoredRegistrationData();
      if (storedData && storedData.password === password) {
        console.log('Login successful!');
        // Perform additional actions for successful login
        // For example, you can redirect the user to the home page
      } else {
        console.log('Invalid email or password');
        // Perform actions for invalid login attempt
      }
    }
  };

  const getStoredRegistrationData = (): { email: string; password: string } | null => {
    const storageMethod = localStorage.getItem('storageMethod');
    let storedDataString = '{}';

    if (storageMethod == 'localStorage') {
      storedDataString = localStorage.getItem('registrationData') || '{}';
    } else if (storageMethod == 'sessionStorage') {
      storedDataString = sessionStorage.getItem('registrationData') || '{}';
    } else if (storageMethod == 'cookies') {
      const cookies = new Cookies();
      storedDataString = cookies.get('registrationData') || '{}';
    }

    try {
      const storedData = JSON.parse(storedDataString);
      const storedEmail = storedData?.email?.toLowerCase();

      return storedEmail === email.toLowerCase() ? storedData : null;
    } catch (error) {
      console.log('Error parsing stored data:', error);
      return null;
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
