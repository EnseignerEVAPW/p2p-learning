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
import { usePartyStore } from '../services/usePartyStore';

const HOST_URL = 'localhost:1999'  //QUIZA DIRECTAMENTE

function Board() {
  const store = usePartyStore({
    roomId: 'example1',
    hostUrl: HOST_URL,
  })
  return (
    <div style={{width:'100%', height: '700px'}}>
      <Tldraw 
        store={store}
        components={{
          SharePanel : NameEditor,
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
export default Board;