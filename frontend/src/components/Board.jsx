import React, { useState, useEffect, useMemo } from 'react'
import { useFetch } from '../services/useFetch';

function Board() {
  const [data, setData] = useState(null);
  const [boardId, setBoardId] = useState(null);
  const [linkBoard, setLinkBoard] = useState(null);

  const optionsCreateBoard = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer eyJtaXJvLm9yaWdpbiI6ImV1MDEifQ_GIFtxnu-o9eQ77RXF9BViNKYtqw'
    },
    body: JSON.stringify({ name: 'P2PLearning', description: 'Pizarra de ayuda' })
  };

  
  useEffect(() => { 
    if (!data) {
      fetch("https://api.miro.com/v2/boards", optionsCreateBoard)
        .then(response => response.json())
        .then(response => {
          setData(response);
          console.log(data);
          setBoardId(response.id);
          setLinkBoard(response.viewLink);
        })
        .catch(err => console.error(err));
    }
   }, [data]);  // al principio solo es saveInCache; getBoard ya no 
  // const { createBoard } = useFetch("https://api.miro.com/v2/boards", optionsCreateBoard); solo se carga, #raro

  const optionsDeleteBoard = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer eyJtaXJvLm9yaWdpbiI6ImV1MDEifQ_GIFtxnu-o9eQ77RXF9BViNKYtqw'
    }
  };

  function deleteBoard() {
    if(boardId){
      console.log("tristee");
      const idWithoutLastChar = boardId.slice(0, -1);
      fetch(`https://api.miro.com/v2/boards/${idWithoutLastChar}%3D`, optionsDeleteBoard)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    }else{
      console
    }
    
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
      <button onClick={ deleteBoard }>Delete board</button>
      <div>
      </div>
    </div>
  );
}

export default Board;