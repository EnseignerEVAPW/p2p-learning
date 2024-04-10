import React, { useState, useEffect, useMemo } from 'react'
import { useFetch } from '../services/useFetch';

function Board() {
  const optionsCreateBoard = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer eyJtaXJvLm9yaWdpbiI6ImV1MDEifQ_Rrf51xGWBJTDSbhJrnODh6qNmB4'
    }
  };

  const [data, setData] = useState(null);

  const saveInCache = useMemo(() => {
    if(!data){
      fetch("https://api.miro.com/v2/boards", optionsCreateBoard)
        .then(response => response.json())
        .then(response => { 
          setData(response); }) 
        .catch(err => console.error(err));
    }
  }, []);
  useEffect(() => {saveInCache}, []);

  // const { createBoard } = useFetch("https://api.miro.com/v2/boards", optionsCreateBoard); solo se carga, #raro

  return (
    <div>
      <h1>Board</h1>
      <div>
        {data ? (
          <iframe src={data.viewLink} width="800" height="600" allowFullScreen></iframe>
        )
          : (
            <p>loading...</p>
          )}
      </div>
      
    </div>
  );
}

export default Board;