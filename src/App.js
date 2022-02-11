import React, { useState, useEffect } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import logo from './logo.svg';
import db from './firebase';
import Login from './components/Login';
import Register from './components/Register';
import Contact from './components/Contact';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
