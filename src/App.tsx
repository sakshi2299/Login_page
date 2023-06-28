import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import the Routes component

import ButtonAppBar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';

const App = () => {
  return (
    <Router>
      <ButtonAppBar />
      <Routes> {/* Wrap your Route components within the Routes component */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
