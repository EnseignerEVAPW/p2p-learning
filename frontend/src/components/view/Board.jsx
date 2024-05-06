// tldraw-sockets-example - Implementa tldraw con partykit-websockets
// Copyright (C) 2024 David Sheldrick y Steve Ruiz

// Este programa es software libre: puedes redistribuirlo y/o modificarlo
// bajo los términos de la GNU General Public License como es publicado por
// la Free Software Foundation, ya sea la versión 3 de la Licencia, o
// (a tu elección) cualquier versión posterior.

// Este programa se distribuye con la esperanza de que sea útil,
// pero SIN NINGUNA GARANTÍA; sin incluso la garantía implícita de
// COMERCIABILIDAD o APTITUD PARA UN PROPÓSITO PARTICULAR. Vea la
// GNU General Public License para más detalles.

import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css'
import { usePartyStore } from '../../services/usePartyStore';
import NameEditor from '../common/NameEditor';
import '../../../public/styles/Board.css';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { navigate } from 'astro/virtual-modules/transitions-router.js';

const HOST_URL = 'localhost:1999'  //QUIZA DIRECTAMENTE

function Board({codeRoom}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const store = usePartyStore({
        roomId: `example1${codeRoom}`,
        hostUrl: HOST_URL,
    });

    const styles ={
        button:{
            margin: 10,
        }
    };
    
    const handleFileUpload =(event) =>{
        const file = event.target.files[0];
        if(file){
            setSelectedFile(file);
        }else{
            console.log("File not found");
        }
    };

    const saveInDataBase =  async() => {
        try{
            const random = parseInt(Math.random()*2000);
            const formData = new FormData();
            formData.append('file', selectedFile, `image${random}.png`);

            const response = await axios.post('http://localhost:3000/images/upload', formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Saved succesfully');
        }catch(e){
            console.error('fallo', e);
        }
    }
    return (
        <div className="board-container" style={{marginBottom:100}}>
            <Tldraw 
                store={store}
                components={{ SharePanel: NameEditor }}
            />
            <div style={styles.button}>
                <input type='file' onChange={handleFileUpload} />
            </div>
            <button className='button' onClick={saveInDataBase} style={{backgroundColor:'violet'}}>GUARDAR</button>
            <button className='button' onClick={()=>{navigate('/imagenes')}} style={{backgroundColor:'violet'}}>VER GUARDADOS</button>
        </div>
    );
}

export default Board;