import React, { useState } from 'react';
import { navigate } from 'astro/virtual-modules/transitions-router.js';

function GeneradorCodigo() {
  const [codeInvite, setCodeInvite] = useState('');  //algo hara con el token

  const styles = {
    button: {
      background: '#d95786',
      padding: '10px',
      color: 'white',
      borderRadius: '10px',
      borderColor: 'aliceblue',
      textDecoration: 'none',
      margin: '10px',
      boxShadow:
       ` 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19)`,
    },
    enlace:{
      minWidth: '300px',
      backgroundColor: 'white',
      border: '1px solid black',
      borderRadius: '15px',
      padding:'15px'
    }
  };

  return (
    <div style={{ border: '3px dashed #ffc6ff', padding: '15px', borderRadius: '15px' }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>INVITAR USUARIO</div>
      <div>
        <button style={styles.button}> Generar enlace </button>
        <id id="enlace">
          <div style={{ display: 'flex' }}>
            <div style={styles.enlace}>
              {codeInvite}
            </div>
            <a href="/entrenar" style={styles.button}> Unirse </a>
          </div>
        </id>
      </div>
    </div>
  );

}

export default GeneradorCodigo;