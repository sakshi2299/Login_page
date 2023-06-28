import React, { useState } from 'react';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import Cookies from 'js-cookie';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storageMethod, setStorageMethod] = useState('localStorage');

  const handleRegister = () => {
    if (name && email && password) {
      if (storageMethod === 'localStorage') {
        // Store data in local storage
        const registrationData = { name, email, password };
        localStorage.setItem('registrationData', JSON.stringify(registrationData));
      } else if (storageMethod === 'sessionStorage') {
        // Store data in session storage
        const registrationData = { name, email, password };
        sessionStorage.setItem('registrationData', JSON.stringify(registrationData));
      } else if (storageMethod === 'cookies') {
        // Store data in cookies
        const registrationData = { name, email, password };
        Cookies.set('registrationData', JSON.stringify(registrationData), { expires: 7 });
      }
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
        <FormLabel component="legend">Storage Method:</FormLabel>
        <RadioGroup value={storageMethod} onChange={(e) => setStorageMethod(e.target.value)}>
          <FormControlLabel value="localStorage" control={<Radio />} label="Local Storage" />
          <FormControlLabel value="sessionStorage" control={<Radio />} label="Session Storage" />
          <FormControlLabel value="cookies" control={<Radio />} label="Cookies" />
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
