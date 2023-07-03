// RegistrationPage.tsx
import React, { useState } from 'react';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/userSlice';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storageMethod, setStorageMethod] = useState('localStorage');

  const dispatch = useDispatch();

  const handleRegister = () => {
    if (name && email && password) {
      const user = { name, email, password };
      dispatch(registerUser({ name ,email, password}));
      console.log(user);
    }
  };

  return (
    <div>
      <h2>Registration Page</h2>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <FormControl component="fieldset">
        <FormLabel component="legend">Storage Method</FormLabel>
        <RadioGroup
          aria-label="storage-method"
          name="storage-method"
          value={storageMethod}
          onChange={(e) => setStorageMethod(e.target.value)}
        >
          <FormControlLabel value="localStorage" control={<Radio />} label="Local Storage" />
          <FormControlLabel value="sessionStorage" control={<Radio />} label="Session Storage" />
        </RadioGroup>
      </FormControl>
      <br />
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
    </div>
  );
};

export default RegistrationPage;
