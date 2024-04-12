import React, { useState } from 'react';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Implement form submission logic here (e.g., API call)
    console.log('Form submitted:', { username, password });
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', width: '300px' }} onSubmit={handleSubmit}>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="username">Username:</label>
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

export default RegisterForm;
