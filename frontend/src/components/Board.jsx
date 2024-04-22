import { Tldraw, track, useEditor } from 'tldraw';
import 'tldraw/tldraw.css'
//import { usePartyStore } from '../services/usePartyStore';

const HOST_URL = 'localhost:1999'  //QUIZA DIRECTAMENTE

function Board() {
  /*const store = usePartyStore({
    roomId: 'example1',
    hostUrl: HOST_URL,
  })*/
  return (
    <div style={{width:'100%', height: '700px'}}>
      <Tldraw 
        //store={store}
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