import React, { useState } from 'react';
import { navigate } from 'astro/virtual-modules/transitions-router.js';

function ActiveUser() {
  const usersRem = [
    { name: 'LanaDR', rating: 755 },
    { name: 'ArtDeco', rating: 500 },
    { name: 'OliviaR', rating: 515 },
    { name: 'FayeWe', rating: 680 },
    { name: 'ZoeHV', rating: 655 },
    { name: 'JennieL', rating: 700 },
    { name: 'Salvatoreeeee', rating: 637 },
    { name: 'NormanR', rating: 620 },
  ];
  const usersInactivos =[
    {name:'Brooklyn', rating:800},
    {name:'WhynGdOC', rating:512},
  ]
  const [usersActive, setUsersActive] = useState(usersRem);
  const [usersOffline, setUsersOffline] = useState(usersInactivos);

  const styles = {
    eachUser:{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#56cfe1',
      borderRadius: '15px',
      margin: '5px'
    },
    noEachUser:{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      border: '2px solid #56cfe1',
      borderRadius: '15px',
      margin: '5px'
    },
    textUser:{
      color: 'black',
      fontWeight: 'bold',
    },
    ratingUser:{
      color: 'black',
      fontWeight: 'semi-bold',
    }
  };

  return (
    <div style={{border: '3px solid #6930c3', padding: '15px', borderRadius:'15px'}}>
      <div style={{fontSize:'1.4rem'}}>USUARIOS ACTIVOS</div>
      {usersActive.map((user, index) => (
        <div style={styles.eachUser} key={user.name}>
          <div style={styles.textUser}>{user.name}</div>
          <div style={styles.ratingUser}>{user.rating}</div>
        </div>
      ))}
      <div style={{fontSize:'1.4rem'}}>USUARIOS INACTIVOS</div>
      {usersOffline.map((user, index) => (
        <div style={styles.noEachUser} key={user.name}>
          <div style={[styles.textUser, {color: 'black'}]}>{user.name}</div>
          <div style={[styles.ratingUser, {color: 'black'}]}>{user.rating}</div>
        </div>
      ))}
    </div>
  );

}

export default ActiveUser;