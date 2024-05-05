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

import { Tldraw, track, useEditor, useExportAs } from 'tldraw';
import 'tldraw/tldraw.css'
import { usePartyStore } from '../../services/usePartyStore';
import NameEditor from '../common/NameEditor';
import '../../../public/styles/Board.css';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const HOST_URL = 'localhost:1999'  //QUIZA DIRECTAMENTE

function Board({codeRoom}) {
    const app = useEditor();
    const exportAs = useExportAs();
    
    const store = usePartyStore({
        roomId: `example1${codeRoom}`,
        hostUrl: HOST_URL,
    });

    /*const handleMount = useCallback((instance) => {
        setApp(instance);
    },[]);

    useEffect(()=> {
        const interval = setInterval(()=> {
            exportAndSave();
        }, 300000);

        return () => clearInterval(interval);
    }, [app]);*/

    const exportAndSave = async () => {
        console.log("pase");
        if(!app) return;
        console.log("paseee");
        const blob = await exportAs([], 'png', 'exported_image')
        saveInDataBase(blob);
        //const dataURL = await app.export({type:'png'});
        //const blob = await app.export({type:'png', mimeType:'image/png', returnType:'blob'});

        //await saveInDataBase(blob);
    }

    const saveInDataBase =  async(data) => {
        try{
            const random = parseInt(Math.random()*2000);
            const formData = new FormData();
            formData.append('file', data, `image${random}.png`);

            const response = await axios.post('http://localhost:3000/images/upload', formData,{
                //method:'POST',
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
                //body:JSON.stringify({image: data}),
            });
            console.log('Saved succesfully');
        }catch(e){
            console.error('fallo', e);
        }
    }
    return (
        <div className="board-container">
            <Tldraw 
                store={store}
                onMount={setEditorInstance}
                components={{ SharePanel: NameEditor }}
            />
            <button onClick={exportAndSave}>EXPORTAR</button>
        </div>
    );
}

export default Board;