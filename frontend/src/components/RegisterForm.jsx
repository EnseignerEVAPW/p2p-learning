import React, { useState } from 'react';
import axios from 'axios';
const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username + password + confirmPassword);
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        username: username,
        password: password,
        passwordConfirmation: confirmPassword,
      });

      alert(response.data.message);
    } catch (error) {
      alert('Error al registrar usuario');
      console.error('Error:', error);
    }
  };

  useState(() => {
    console.log('RegisterForffffdddm mounted');
  }, []);
  

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
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}
        />
      </div>
      <button type="submit" style={{ backgroundColor: '#309eff', color: '#fff', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>Registrarse</button>
    </form>
  );
};

export default RegisterForm;
