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

import { Tldraw, track, useEditor } from 'tldraw';
import 'tldraw/tldraw.css'
import { usePartyStore } from '../../services/usePartyStore';
import NameEditor from '../common/NameEditor';
import '../../../public/styles/Board.css';
import { useCallback, useEffect, useState } from 'react';

const HOST_URL = 'localhost:1999'  //QUIZA DIRECTAMENTE

function Board({codeRoom}) {
    const [app, setApp] = useState(null);
    console.log('my code room is', codeRoom);
    const store = usePartyStore({
        roomId: `example1${codeRoom}`,
        hostUrl: HOST_URL,
    });

    const handleMount = useCallback((instance) => {
        setApp(instance);
    },[]);

    useEffect(()=> {
        const interval = setInterval(()=> {
            exportAndSave();
        }, 900000);

        return () => clearInterval(interval);
    }, [app]);

    const exportAndSave = async () => {
        if(!app) return;
        const dataURL = await app.export({type:'png'});
        await saveInDataBase(dataURL);
    }

    const saveInDataBase =  async(data) => {
        try{
            const response = await fetch('/api/save-drawing',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({image: data}),
            });
            if(response.ok){
                alert('Saved succesfully');
            }else{
                alert('Sad')
            }
        }catch(e){
            console.error('fallo', e);
        }
    }
    return (
        <div className="board-container">
            <Tldraw 
                store={store}
                onMount={handleMount}
                components={{ SharePanel: NameEditor }}
            />
            <button onClick={exportAndSave}>EXPORTAR</button>
        </div>
    );
}

export default Board;