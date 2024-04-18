import { useState, useEffect } from 'react'
import { useFetch } from '../services/useFetch';
import { navigate } from 'astro/virtual-modules/transitions-router.js';
import { Tldraw, track, useEditor } from 'tldraw';
import 'tldraw/tldraw.css';
import { useYjsStore } from '../services/useYjsStore.ts';

const HOST_URL =
	import.meta.env.MODE === 'development'
		? 'ws://localhost:1234'
		: 'wss://demos.yjs.dev'

function Board() {
      const store = useYjsStore({
        roomId: 'example17',
        hostUrl: HOST_URL,
      })
    
      return (
        <div className="tldraw__editor">
          <Tldraw
            autoFocus
            store={store}
            components={{
              SharePanel: NameEditor,
            }}
          />
        </div>
      )
    }
    
    const NameEditor = track(() => {
      const editor = useEditor()
    
      const { color, name } = editor.user.getUserPreferences()
    
      return (
        <div style={{ pointerEvents: 'all', display: 'flex' }}>
          <input
            type="color"
            value={color}
            onChange={(e) => {
              editor.user.updateUserPreferences({
                color: e.currentTarget.value,
              })
            }}
          />
          <input
            value={name}
            onChange={(e) => {
              editor.user.updateUserPreferences({
                name: e.currentTarget.value,
              })
            }}
          />
        </div>
      )
    })
// function Board() {
//   return (
//     <div style={{height: 700, width:'100%'}} >
//       <Tldraw />
//     </div>
//   );
// }

export default Board;