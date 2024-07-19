// frontend/src/components/Auth/Register.js

import React, { useState } from 'react';
import api from '../../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, password });
      setError('');
      setUsername('');
      setPassword('');
      alert('User registered successfully');
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div style={{margin:"100px", backgroundColor:"#4399e1", padding:"100px"}}>
      <h2 style={{}}>Register</h2>
      <form onSubmit={handleRegister}>
        <input style={{padding:"10px", margin:"20px", border:"1px solid black", width:"250px", borderRadius:"5px"}} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br></br>
        <input style={{padding:"10px", margin:"20px", border:"1px solid black", width:"250px", borderRadius:"5px"}} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <button style={{padding:"10px", margin:"20px", border:"1px solid black", backgroundColor:"#00e700",width:"150px", borderRadius:"5px"}} type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
