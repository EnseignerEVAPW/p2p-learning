import React, { useState, useEffect } from 'react';
import { navigate } from 'astro/virtual-modules/transitions-router.js';
import axios from 'axios';

const Logout = () => {
  const [logout, setLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <div>
        <button onClick={handleLogout}>Cerrar Sesion</button>
    </div>
  )

}

export default Logout;