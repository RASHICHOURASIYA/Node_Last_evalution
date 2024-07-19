import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{margin:"100px", backgroundColor:"#4399e1", padding:"100px"}}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
         style={{padding:"10px", margin:"20px", border:"1px solid black", width:"250px", borderRadius:"5px"}}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br></br>
        <input
         style={{padding:"10px", margin:"20px", border:"1px solid black", width:"250px", borderRadius:"5px"}}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br></br>
        <button style={{padding:"10px", margin:"20px", border:"1px solid black", backgroundColor:"#00e700",width:"150px", borderRadius:"5px"}}
         type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
