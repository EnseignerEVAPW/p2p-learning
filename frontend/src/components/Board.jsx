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
      authorization: 'Bearer eyJtaXJvLm9yaWdpbiI6ImV1MDEifQ_Rrf51xGWBJTDSbhJrnODh6qNmB4'
    }
  };

  const saveInCache = useMemo(() => {
    if (!data) {
      fetch("https://api.miro.com/v2/boards", optionsCreateBoard)
        .then(response => response.json())
        .then(response => {
          setData(response);
          setBoardId(response.id);
        })
        .catch(err => console.error(err));
    }
  }, []);
  useEffect(() => { saveInCache; getBoard(boardId) }, []);
  // const { createBoard } = useFetch("https://api.miro.com/v2/boards", optionsCreateBoard); solo se carga, #raro

  const optionsGetBoard = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer eyJtaXJvLm9yaWdpbiI6ImV1MDEifQ_Rrf51xGWBJTDSbhJrnODh6qNmB4'
    }
  };

  const getBoard = (boardId) => {
    const idWithoutLastChar = boardId.slice(0, -1);
    console.log(idWithoutLastChar);
    fetch(`https://api.miro.com/v2/boards/${idWithoutLastChar}%3D`, optionsGetBoard)
      .then(response => response.json())
      .then(response => {console.log(response);
        setLinkBoard(response.viewLink);
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <h1>Board</h1>
      <div>
        {linkBoard ?
          (
            <iframe src={linkBoard} width="800" height="600" allowFullScreen></iframe>
          ) :
          (
            <p>loading...</p>
          )}
      </div>

    </div>
  );
}

export default Board;