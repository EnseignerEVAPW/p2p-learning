import { Tldraw, track, useEditor } from 'tldraw';
import 'tldraw/tldraw.css'
import { useYjsStore } from '../services/useYjsStore';

const HOST_URL =
	import.meta.env.MODE === 'development'
		? 'ws://localhost:1234'
		: 'wss://demos.yjs.dev'

function Board() {
  const store = useYjsStore({
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