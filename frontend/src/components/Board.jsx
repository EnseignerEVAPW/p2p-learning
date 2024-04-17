import React, { useState, useEffect, useMemo } from 'react'
import { useFetch } from '../services/useFetch';
import { navigate } from 'astro/virtual-modules/transitions-router.js';
const auth = 'Bearer eyJtaXJvLm9yaWdpbiI6ImV1MDEifQ_Z7tiAZpXWoNJw7pPapHx1p37aVE';

function Board() {
  const [data, setData] = useState(null);
  const [boardId, setBoardId] = useState(null);
  const [linkBoard, setLinkBoard] = useState(null);
  const [itemId, setItemId] = useState("");

  const optionsCreateBoard = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer eyJtaXJvLm9yaWdpbiI6ImV1MDEifQ_GIFtxnu-o9eQ77RXF9BViNKYtqw'
    },
    body: JSON.stringify({ name: 'P2PLearning', description: 'Pizarra de ayuda' })
  };

  const styles = {
    myButton: {
      background: '#d95786',
      padding: '10px',
      color: 'white',
      borderRadius: '10px',
      borderColor: 'aliceblue',
      textDecoration: 'none',
      margin: '10px',
      boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19)`,

    },
  };

  useEffect(() => {
    if (!data) {
      fetch("https://api.miro.com/v2/boards", optionsCreateBoard)
        .then(response => response.json())
        .then(response => {
          setData(response);
          setBoardId(response.id);
          setLinkBoard(response.viewLink);
        })
        .catch(err => console.error(err));
    }
  }, [data]);

  // const { createBoard } = useFetch("https://api.miro.com/v2/boards", optionsCreateBoard); solo se carga, #raro

  const optionsDeleteBoard = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer eyJtaXJvLm9yaWdpbiI6ImV1MDEifQ_GIFtxnu-o9eQ77RXF9BViNKYtqw'
    }
  };

  function deleteBoard() {
    if (boardId) {
      const idWithoutLastChar = boardId.slice(0, -1);
      fetch(`https://api.miro.com/v2/boards/${idWithoutLastChar}%3D`, optionsDeleteBoard)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    }
    navigate('/feedback');
  }

  return (
    <div>
      <div>
        {data || linkBoard ?
          (
            <>
              <iframe src={linkBoard || data.viewLink} width="800" height="600" allowFullScreen></iframe>
            </>
          ) :
          (
            <p>loading...</p>
          )}
      </div>
      <button style={styles.myButton} onClick={deleteBoard}>TERMINAR</button>
      <div>
      </div>
    </div>
  );
}

export default Board;