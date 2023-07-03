import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useAppDispatch } from '../store/store';
import { loginUser } from '../store/userSlice';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const handleLogin = () => {
    if (email && password) {
      dispatch(loginUser({email:"test", password:"test"}));
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
