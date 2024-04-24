import React, { useState } from 'react';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Implementa la lógica de envío del formulario aquí (por ejemplo, llamada a la API)
    console.log('Formulario enviado:', { username, password });
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
