import React, { useState } from 'react';
import { navigate } from 'astro/virtual-modules/transitions-router.js';

function GeneradorCodigo() {
  const [codeInvite, setCodeInvite] = useState('');  

  const styles = {
    button: {
      background: '#d95786',
      padding: '10px',
      color: 'white',
      borderRadius: '10px',
      borderColor: 'aliceblue',
      textDecoration: 'none',
      margin: '0 10px',
      boxShadow:
       ` 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19)`,
    },
    enlace:{
      minWidth: '200px',
      backgroundColor: 'white',
      border: '1px solid black',
      borderRadius: '15px',
      padding:'0 15px',
      color: 'black',
      display: 'flex',
      alignItems : 'center',
    }
  };

  function generateCode() {
    let result = '';
    for(let i= 0; i < 7; i++){
      let character;
      const random = Math.random();
      if(random < 0.34){
        character = parseInt(Math.random() * 10)+ 48;
      }else if(random < 0.66){
        character = parseInt(Math.random() * 26)+ 65
      }else {
        character = parseInt(Math.random() * 26)+ 97;
      }
      result += String.fromCharCode(character);
    }
    console.log(result);
    setCodeInvite(result);
  }

  const setCode =(event) =>{
    setCodeInvite(event.target.value);
  }

  return (
    <div style={{ border: '3px dashed #ffc6ff', padding: '15px', borderRadius: '15px' }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>INVITAR USUARIO</div>
      <div>
        <button style={styles.button} onClick={generateCode}> Generar enlace </button>
        
          <div style={{ display: 'flex', margin:'10px 0' }}>
          <input type='text'style={styles.enlace} value={codeInvite} onChange={setCode}></input>
           
          <button style={styles.button} onClick={()=>navigate(`/entrenar?codeInvite=${codeInvite}`)}>Unirse</button>
        </div>
      </div>
    </div>
  );

}

export default GeneradorCodigo;