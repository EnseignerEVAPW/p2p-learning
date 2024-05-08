import React, { useState } from 'react';
import { navigate } from 'astro/virtual-modules/transitions-router.js';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username: username,
        password: password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/profile');
    } catch(error){
      alert('Error al hacer login');
      console.error('El error:', error);
    }
    console.log('Form submitted:', { username, password });
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', width: '300px' }} onSubmit={handleSubmit}>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}
        />
      </div>
      <button type="submit" style={{ backgroundColor: '#309eff', color: '#fff', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
